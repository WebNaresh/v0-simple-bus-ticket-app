"use client"

import { addRouteAction } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddRoutePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Route</h1>
        <p className="text-muted-foreground">Create a new bus route</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
          <CardDescription>Enter the details for the new bus route</CardDescription>
        </CardHeader>
        <form action={addRouteAction}>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="source">Source</Label>
                <Input id="source" name="source" placeholder="e.g. New York" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" name="destination" placeholder="e.g. Boston" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input id="departureTime" name="departureTime" type="datetime-local" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="arrivalTime">Arrival Time</Label>
                <Input id="arrivalTime" name="arrivalTime" type="datetime-local" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Ticket Price ($)</Label>
                <Input id="price" name="price" type="number" min="0.01" step="0.01" placeholder="e.g. 25.99" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalSeats">Total Seats</Label>
                <Input id="totalSeats" name="totalSeats" type="number" min="1" placeholder="e.g. 40" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit">Add Route</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
