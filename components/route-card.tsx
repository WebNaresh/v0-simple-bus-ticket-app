import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { formatDate, formatTime, formatCurrency } from "@/lib/utils"

interface RouteCardProps {
  route: any
}

export default function RouteCard({ route }: RouteCardProps) {
  const departureDate = new Date(route.departureTime)
  const arrivalDate = new Date(route.arrivalTime)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-xl">
              {route.source} to {route.destination}
            </span>
            <span className="text-sm text-muted-foreground">Bus #{route._id.toString().slice(-4)}</span>
          </div>
          <span className="text-xl font-bold">{formatCurrency(route.price)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(departureDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Departure: {formatTime(departureDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Arrival: {formatTime(arrivalDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>
              Available Seats: {route.availableSeats} / {route.totalSeats}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/book/${route._id}`} className="w-full">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={route.availableSeats <= 0}>
            {route.availableSeats > 0 ? "Book Now" : "Sold Out"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
