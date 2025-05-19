import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

// Database and collection names
const DB_NAME = "bus_booking"
const ROUTES_COLLECTION = "routes"
const BOOKINGS_COLLECTION = "bookings"

// Get database connection
export async function getDb() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

// Routes CRUD operations
export async function getRoutes() {
  const db = await getDb()
  return db.collection(ROUTES_COLLECTION).find({}).toArray()
}

export async function getRouteById(id: string) {
  const db = await getDb()
  return db.collection(ROUTES_COLLECTION).findOne({ _id: new ObjectId(id) })
}

export async function createRoute(routeData: any) {
  const db = await getDb()
  const result = await db.collection(ROUTES_COLLECTION).insertOne(routeData)
  return result
}

export async function updateRoute(id: string, routeData: any) {
  const db = await getDb()
  const result = await db.collection(ROUTES_COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: routeData })
  return result
}

export async function deleteRoute(id: string) {
  const db = await getDb()
  const result = await db.collection(ROUTES_COLLECTION).deleteOne({ _id: new ObjectId(id) })
  return result
}

// Bookings CRUD operations
export async function getBookings() {
  const db = await getDb()
  return db.collection(BOOKINGS_COLLECTION).find({}).toArray()
}

export async function getBookingsByUser(email: string) {
  const db = await getDb()
  return db.collection(BOOKINGS_COLLECTION).find({ passengerEmail: email }).toArray()
}

export async function getBookingById(id: string) {
  const db = await getDb()
  return db.collection(BOOKINGS_COLLECTION).findOne({ _id: new ObjectId(id) })
}

export async function createBooking(bookingData: any) {
  const db = await getDb()
  const result = await db.collection(BOOKINGS_COLLECTION).insertOne(bookingData)
  return result
}

export async function updateBooking(id: string, bookingData: any) {
  const db = await getDb()
  const result = await db.collection(BOOKINGS_COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: bookingData })
  return result
}

export async function deleteBooking(id: string) {
  const db = await getDb()
  const result = await db.collection(BOOKINGS_COLLECTION).deleteOne({ _id: new ObjectId(id) })
  return result
}

// Update available seats when booking is created or canceled
export async function updateAvailableSeats(routeId: string, increment: number) {
  const db = await getDb()
  const result = await db
    .collection(ROUTES_COLLECTION)
    .updateOne({ _id: new ObjectId(routeId) }, { $inc: { availableSeats: increment } })
  return result
}
