import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bus } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Bus className="h-6 w-6" />
          <span>BusBooker</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="/my-bookings" className="text-sm font-medium hover:underline">
            My Bookings
          </Link>
          <Link href="/admin/routes">
            <Button variant="outline" size="sm">
              Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
