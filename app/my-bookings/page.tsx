import { getBookings, getRouteById } from "@/lib/db"
import { cancelBookingAction } from "@/lib/actions"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDateTime, formatCurrency } from "@/lib/utils"
import { Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react"

export default async function MyBookingsPage() {
  const bookings = await getBookings()

  // Get route details for each booking
  const bookingsWithRoutes = await Promise.all(
    bookings.map(async (booking) => {
      const route = await getRouteById(booking.routeId)
      return { ...booking, route }
    }),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Manage your bus ticket bookings</p>
      </div>

      {bookingsWithRoutes.length > 0 ? (
        <div className="grid gap-4">
          {bookingsWithRoutes.map((booking) => (
            <Card key={booking._id.toString()}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      {booking.route.source} to {booking.route.destination}
                    </CardTitle>
                    <CardDescription>Booking ID: {booking._id.toString()}</CardDescription>
                  </div>
                  <Badge variant={booking.status === "confirmed" ? "default" : "destructive"}>{booking.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Journey Details</div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Departure: {formatDateTime(booking.route.departureTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Arrival: {formatDateTime(booking.route.arrivalTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Seat: {booking.seatNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Passenger Details</div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.passengerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.passengerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.passengerPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Booked on: </span>
                    {formatDateTime(booking.bookingDate)}
                  </div>
                  <div className="font-semibold">{formatCurrency(booking.route.price)}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/my-bookings/edit/${booking._id}`}>
                  <Button variant="outline" disabled={booking.status !== "confirmed"}>
                    Edit Details
                  </Button>
                </Link>

                <form
                  action={async () => {
                    "use server"
                    await cancelBookingAction(booking._id.toString(), booking.routeId)
                  }}
                >
                  <Button variant="destructive" disabled={booking.status !== "confirmed"} type="submit">
                    Cancel Booking
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-medium">No bookings found</h3>
          <p className="text-muted-foreground mb-4">You haven't made any bookings yet</p>
          <Link href="/">
            <Button>Browse Available Routes</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
