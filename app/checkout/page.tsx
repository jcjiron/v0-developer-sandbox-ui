"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [progress, setProgress] = useState(0)

  const handlePayWithPaypal = () => {
    setShowModal(true)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/payment-success")
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/apartment-detail" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Apartment Details
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-md bg-blue-50 border-blue-200">
                    <div className="w-10 h-10 mr-4 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0070ba">
                        <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.026-.03.17a.804.804 0 0 1-.794.679h-2.52a.483.483 0 0 1-.477-.558l.033-.15.212-1.347H8.8l1.386-8.798a.483.483 0 0 1 .477-.41h2.24c2.517 0 4.5-.515 5.163-2.514.257-.767.257-1.415.001-1.952a1.807 1.807 0 0 0-.637-.657c.637.076 1.178.29 1.637.657z" />
                        <path d="M18.428 6.167c-.584-.267-1.308-.4-2.16-.4h-4.165a.804.804 0 0 0-.794.68l-.04.22-1.11 7.027-.03.17a.483.483 0 0 0 .477.558h1.236a.805.805 0 0 0 .794-.68l.04-.22.63-4.026.03-.17a.804.804 0 0 1 .794-.68h.5c3.238 0 5.774-1.313 6.514-5.12.031-.16.058-.316.078-.468-.256-.16-.55-.3-.87-.411a5.905 5.905 0 0 0-.924-.26z" />
                        <path d="M8.079 6.311l.03-.17a.804.804 0 0 1 .794-.68h4.166c.852 0 1.576.133 2.16.4.374.17.683.39.924.259a3.15 3.15 0 0 1 .87.412c.22-.943.01-1.586-.5-2.167-.559-.636-1.576-.909-2.879-.909H8.8c-.326 0-.605.214-.704.515l-1.68 10.677L6.397 15c-.1.636.39 1.213 1.04 1.213h2.504l.633-4.026.505-3.876z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-gray-600">Pay securely using your PayPal account</p>
                    </div>
                    <input type="radio" checked readOnly className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Price Details</CardTitle>
              </CardHeader>
              <CardContent>
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
              <CardFooter className="flex flex-col border-t pt-4">
                <div className="flex justify-between w-full font-bold mb-4">
                  <span>Total</span>
                  <span>$1,105</span>
                </div>
                <Button
                  onClick={handlePayWithPaypal}
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="white"
                    className="mr-2"
                  >
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.026-.03.17a.804.804 0 0 1-.794.679h-2.52a.483.483 0 0 1-.477-.558l.033-.15.212-1.347H8.8l1.386-8.798a.483.483 0 0 1 .477-.41h2.24c2.517 0 4.5-.515 5.163-2.514.257-.767.257-1.415.001-1.952a1.807 1.807 0 0 0-.637-.657c.637.076 1.178.29 1.637.657z" />
                    <path d="M18.428 6.167c-.584-.267-1.308-.4-2.16-.4h-4.165a.804.804 0 0 0-.794.68l-.04.22-1.11 7.027-.03.17a.483.483 0 0 0 .477.558h1.236a.805.805 0 0 0 .794-.68l.04-.22.63-4.026.03-.17a.804.804 0 0 1 .794-.68h.5c3.238 0 5.774-1.313 6.514-5.12.031-.16.058-.316.078-.468-.256-.16-.55-.3-.87-.411a5.905 5.905 0 0 0-.924-.26z" />
                    <path d="M8.079 6.311l.03-.17a.804.804 0 0 1 .794-.68h4.166c.852 0 1.576.133 2.16.4.374.17.683.39.924.259a3.15 3.15 0 0 1 .87.412c.22-.943.01-1.586-.5-2.167-.559-.636-1.576-.909-2.879-.909H8.8c-.326 0-.605.214-.704.515l-1.68 10.677L6.397 15c-.1.636.39 1.213 1.04 1.213h2.504l.633-4.026.505-3.876z" />
                  </svg>
                  Pay with PayPal
                </Button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  By clicking "Pay with PayPal", you agree to the terms and conditions.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Payment Processing Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-center">Processing Payment</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-gray-600">Please wait while we process your payment...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
