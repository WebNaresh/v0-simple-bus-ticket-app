"use client"

import { getRouteById } from "@/lib/db"
import { updateRouteAction } from "@/lib/actions"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function EditRoutePage({ params }: { params: { id: string } }) {
  const route = await getRouteById(params.id)

  if (!route) {
    notFound()
  }

  // Format datetime-local input values
  const formatDateTimeLocal = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Route</h1>
        <p className="text-muted-foreground">Update bus route details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
          <CardDescription>Edit the details for this bus route</CardDescription>
        </CardHeader>
        <form
          action={async (formData) => {
            "use server"
            await updateRouteAction(params.id, formData)
          }}
        >
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="source">Source</Label>
                <Input id="source" name="source" defaultValue={route.source} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" name="destination" defaultValue={route.destination} required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input
                  id="departureTime"
                  name="departureTime"
                  type="datetime-local"
                  defaultValue={formatDateTimeLocal(route.departureTime)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="arrivalTime">Arrival Time</Label>
                <Input
                  id="arrivalTime"
                  name="arrivalTime"
                  type="datetime-local"
                  defaultValue={formatDateTimeLocal(route.arrivalTime)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Ticket Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  defaultValue={route.price}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalSeats">Total Seats</Label>
                <Input
                  id="totalSeats"
                  name="totalSeats"
                  type="number"
                  min="1"
                  defaultValue={route.totalSeats}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="availableSeats">Available Seats</Label>
                <Input
                  id="availableSeats"
                  name="availableSeats"
                  type="number"
                  min="0"
                  max={route.totalSeats}
                  defaultValue={route.availableSeats}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
