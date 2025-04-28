"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const bookingId =
    "BK" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")
  const bookingDate = new Date().toLocaleDateString()

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Simulator
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">Your booking has been confirmed.</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-medium">{bookingId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Date</p>
                  <p className="font-medium">{bookingDate}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                    <img src="/cozy-city-apartment.png" alt="Apartment" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Luxury Ocean View Apartment</h3>
                    <p className="text-sm text-gray-600">Miami Beach, Florida</p>
                    <p className="text-sm text-gray-600">May 15 - May 20, 2023 (5 nights)</p>
                    <p className="text-sm text-gray-600">2 guests</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">PayPal</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="font-medium">$1,105.00</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex items-center justify-center" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
