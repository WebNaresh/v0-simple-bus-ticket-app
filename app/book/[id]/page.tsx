import { getRouteById } from "@/lib/db"
import { bookTicketAction } from "@/lib/actions"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatDate, formatTime, formatCurrency } from "@/lib/utils"
import { Calendar, Clock, MapPin, CreditCard } from "lucide-react"

export default async function BookingPage({ params }: { params: { id: string } }) {
  const route = await getRouteById(params.id)

  if (!route) {
    notFound()
  }

  const departureDate = new Date(route.departureTime)
  const arrivalDate = new Date(route.arrivalTime)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Book Your Ticket</h1>
        <p className="text-muted-foreground">Fill in your details to complete the booking</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {route.source} to {route.destination}
          </CardTitle>
          <CardDescription>Bus #{route._id.toString().slice(-4)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(departureDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{formatCurrency(route.price)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Departure: {formatTime(departureDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Arrival: {formatTime(arrivalDate)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>
              Available Seats: {route.availableSeats} / {route.totalSeats}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
          <CardDescription>Enter your details to complete the booking</CardDescription>
        </CardHeader>
        <form action={bookTicketAction}>
          <CardContent className="space-y-4">
            <input type="hidden" name="routeId" value={route._id.toString()} />

            <div className="grid gap-2">
              <Label htmlFor="passengerName">Full Name</Label>
              <Input id="passengerName" name="passengerName" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="passengerEmail">Email</Label>
              <Input id="passengerEmail" name="passengerEmail" type="email" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="passengerPhone">Phone Number</Label>
              <Input id="passengerPhone" name="passengerPhone" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="seatNumber">Seat Number</Label>
              <Input id="seatNumber" name="seatNumber" type="number" min="1" max={route.totalSeats} required />
              <p className="text-xs text-muted-foreground">Choose a seat number between 1 and {route.totalSeats}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={route.availableSeats <= 0}>
              {route.availableSeats > 0 ? "Confirm Booking" : "Sold Out"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
