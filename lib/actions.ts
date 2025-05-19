"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createRoute, updateRoute, deleteRoute, createBooking, updateBooking, updateAvailableSeats } from "./db"

// Route actions
export async function addRouteAction(formData: FormData) {
  const source = formData.get("source") as string
  const destination = formData.get("destination") as string
  const departureTime = formData.get("departureTime") as string
  const arrivalTime = formData.get("arrivalTime") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const totalSeats = Number.parseInt(formData.get("totalSeats") as string)

  const routeData = {
    source,
    destination,
    departureTime,
    arrivalTime,
    price,
    totalSeats,
    availableSeats: totalSeats,
    createdAt: new Date(),
  }

  await createRoute(routeData)
  revalidatePath("/admin/routes")
  redirect("/admin/routes")
}

export async function updateRouteAction(id: string, formData: FormData) {
  const source = formData.get("source") as string
  const destination = formData.get("destination") as string
  const departureTime = formData.get("departureTime") as string
  const arrivalTime = formData.get("arrivalTime") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const totalSeats = Number.parseInt(formData.get("totalSeats") as string)
  const availableSeats = Number.parseInt(formData.get("availableSeats") as string)

  const routeData = {
    source,
    destination,
    departureTime,
    arrivalTime,
    price,
    totalSeats,
    availableSeats,
    updatedAt: new Date(),
  }

  await updateRoute(id, routeData)
  revalidatePath("/admin/routes")
  redirect("/admin/routes")
}

export async function deleteRouteAction(id: string) {
  await deleteRoute(id)
  revalidatePath("/admin/routes")
}

// Booking actions
export async function bookTicketAction(formData: FormData) {
  const routeId = formData.get("routeId") as string
  const passengerName = formData.get("passengerName") as string
  const passengerEmail = formData.get("passengerEmail") as string
  const passengerPhone = formData.get("passengerPhone") as string
  const seatNumber = Number.parseInt(formData.get("seatNumber") as string)

  const bookingData = {
    routeId,
    passengerName,
    passengerEmail,
    passengerPhone,
    seatNumber,
    status: "confirmed",
    bookingDate: new Date(),
  }

  await createBooking(bookingData)
  await updateAvailableSeats(routeId, -1) // Decrease available seats by 1

  revalidatePath("/")
  revalidatePath("/my-bookings")
  redirect("/my-bookings")
}

export async function updateBookingAction(id: string, formData: FormData) {
  const passengerName = formData.get("passengerName") as string
  const passengerPhone = formData.get("passengerPhone") as string

  const bookingData = {
    passengerName,
    passengerPhone,
    updatedAt: new Date(),
  }

  await updateBooking(id, bookingData)
  revalidatePath("/my-bookings")
  redirect("/my-bookings")
}

export async function cancelBookingAction(id: string, routeId: string) {
  const bookingData = {
    status: "cancelled",
    cancelledAt: new Date(),
  }

  await updateBooking(id, bookingData)
  await updateAvailableSeats(routeId, 1) // Increase available seats by 1

  revalidatePath("/my-bookings")
  revalidatePath("/")
}
