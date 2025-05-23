import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BookingSummary() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-24 h-40 sm:h-24 bg-gray-200 rounded-md overflow-hidden">
            <img src="/penthouse-cityscape.png" alt="Apartment" className="w-full h-full object-cover" />
          </div>
          <div className="mt-2 sm:mt-0">
            <h3 className="font-semibold">Luxury Ocean View Apartment</h3>
            <p className="text-sm text-gray-600">Miami Beach, Florida</p>
            <p className="text-sm text-gray-600">May 15 - May 20, 2023 (5 nights)</p>
            <p className="text-sm text-gray-600">2 guests</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
