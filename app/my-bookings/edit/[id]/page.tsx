"use client"

import { getBookingById } from "@/lib/db"
import { updateBookingAction } from "@/lib/actions"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function EditBookingPage({ params }: { params: { id: string } }) {
  const booking = await getBookingById(params.id)

  if (!booking) {
    notFound()
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Booking</h1>
        <p className="text-muted-foreground">Update your passenger information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Passenger Details</CardTitle>
          <CardDescription>You can update your name and phone number</CardDescription>
        </CardHeader>
        <form
          action={async (formData) => {
            "use server"
            await updateBookingAction(params.id, formData)
          }}
        >
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="passengerName">Full Name</Label>
              <Input id="passengerName" name="passengerName" defaultValue={booking.passengerName} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="passengerEmail">Email</Label>
              <Input id="passengerEmail" defaultValue={booking.passengerEmail} disabled />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="passengerPhone">Phone Number</Label>
              <Input id="passengerPhone" name="passengerPhone" defaultValue={booking.passengerPhone} required />
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
