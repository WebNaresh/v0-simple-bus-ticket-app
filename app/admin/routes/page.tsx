import { getRoutes } from "@/lib/db"
import { deleteRouteAction } from "@/lib/actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, formatTime, formatCurrency } from "@/lib/utils"
import { Calendar, Clock, MapPin, Plus, Pencil, Trash2 } from "lucide-react"

export default async function AdminRoutesPage() {
  const routes = await getRoutes()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Routes</h1>
          <p className="text-muted-foreground">Add, edit or delete bus routes</p>
        </div>
        <Link href="/admin/routes/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Route
          </Button>
        </Link>
      </div>

      {routes.length > 0 ? (
        <div className="grid gap-4">
          {routes.map((route) => {
            const departureDate = new Date(route.departureTime)
            const arrivalDate = new Date(route.arrivalTime)

            return (
              <Card key={route._id.toString()}>
                <CardHeader>
                  <CardTitle>
                    {route.source} to {route.destination}
                  </CardTitle>
                  <CardDescription>Bus #{route._id.toString().slice(-4)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
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

                  <div className="font-semibold text-right">{formatCurrency(route.price)}</div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Link href={`/admin/routes/edit/${route._id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>

                  <form
                    action={async () => {
                      "use server"
                      await deleteRouteAction(route._id.toString())
                    }}
                  >
                    <Button variant="destructive" size="sm" className="gap-1" type="submit">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-medium">No routes available</h3>
          <p className="text-muted-foreground mb-4">Add your first bus route to get started</p>
          <Link href="/admin/routes/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Route
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
