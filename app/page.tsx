import { getRoutes } from "@/lib/db"
import RouteCard from "@/components/route-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default async function Home() {
  const routes = await getRoutes()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Find Your Bus</h1>
        <p className="text-muted-foreground">Book bus tickets for your next journey</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <form className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input placeholder="From" name="source" />
          </div>
          <div className="flex-1">
            <Input placeholder="To" name="destination" />
          </div>
          <div className="flex-1">
            <Input type="date" name="date" />
          </div>
          <Button type="submit" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Available Routes</h2>
        {routes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <RouteCard key={route._id.toString()} route={route} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-medium">No routes available</h3>
            <p className="text-muted-foreground">Check back later for new routes</p>
          </div>
        )}
      </div>
    </div>
  )
}
