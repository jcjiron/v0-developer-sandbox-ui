"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Users, Star, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ApartmentDetailPage() {
  const router = useRouter()
  const [isBooking, setIsBooking] = useState(false)

  const handleBookNow = () => {
    setIsBooking(true)
    // Simulate booking process
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Simulator
          </Link>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-6">
          <div className="h-80 bg-gray-300 relative">
            <img src="/coastal-living.png" alt="Apartment" className="w-full h-full object-cover" />
            <Badge className="absolute top-4 right-4 bg-blue-600">Featured</Badge>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">Luxury Ocean View Apartment</h1>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                    4.92 (128 reviews)
                  </span>
                  <span>Miami Beach, Florida</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$189</div>
                <div className="text-gray-600">per night</div>
              </div>
            </div>

            <div className="flex items-center gap-4 my-4 text-sm">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>4 guests</span>
              </div>
              <div className="flex items-center">
                <span>2 bedrooms</span>
              </div>
              <div className="flex items-center">
                <span>2 bathrooms</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Enjoy this stunning oceanfront apartment with panoramic views of the Atlantic. This recently renovated
              space features modern amenities, a fully equipped kitchen, and is just steps away from the beach.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">May 15 - May 20, 2023</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Guests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">2 adults, 0 children</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-semibold">Price Details</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>$189 x 5 nights</span>
                      <span>$945</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$85</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full font-bold">
                    <span>Total</span>
                    <span>$1,105</span>
                  </div>
                </CardFooter>
              </Card>

              <Button
                onClick={() => router.push("/checkout")}
                className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet. This is a demo for the SDK Simulator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
