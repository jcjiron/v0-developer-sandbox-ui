"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePayment } from "./payment-context"

export function PaymentMethodSection() {
  const { selectedMethod, setSelectedMethod } = usePayment()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className={`flex flex-wrap items-center p-4 border rounded-md cursor-pointer transition-colors ${
              selectedMethod === "paypal"
                ? "bg-blue-100 border-blue-300"
                : "bg-blue-50 border-blue-200 hover:bg-blue-100"
            }`}
            onClick={() => setSelectedMethod("paypal")}
          >
            <div className="w-10 h-10 mr-4 flex items-center justify-center">
              <PayPalIcon />
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="font-medium">PayPal</p>
              <p className="text-sm text-gray-600">Pay securely using your PayPal account</p>
            </div>
            <input
              type="radio"
              checked={selectedMethod === "paypal"}
              onChange={() => setSelectedMethod("paypal")}
              className="h-5 w-5 text-blue-600 mt-2 sm:mt-0"
            />
          </div>

          {/* Nuevo método de pago */}
          <div
            className={`flex flex-wrap items-center p-4 border rounded-md cursor-pointer transition-colors ${
              selectedMethod === "new-method"
                ? "bg-purple-100 border-purple-300"
                : "bg-purple-50 border-purple-200 hover:bg-purple-100"
            }`}
            onClick={() => setSelectedMethod("new-method")}
          >
            <div className="w-10 h-10 mr-4 flex items-center justify-center">
              <CreditCardIcon />
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="font-medium">New Payment Method</p>
              <p className="text-sm text-gray-600">Pay with your preferred payment method</p>
            </div>
            <input
              type="radio"
              checked={selectedMethod === "new-method"}
              onChange={() => setSelectedMethod("new-method")}
              className="h-5 w-5 text-purple-600 mt-2 sm:mt-0"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PayPalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0070ba">
      <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.026-.03.17a.804.804 0 0 1-.794.679h-2.52a.483.483 0 0 1-.477-.558l.033-.15.212-1.347H8.8l1.386-8.798a.483.483 0 0 1 .477-.41h2.24c2.517 0 4.5-.515 5.163-2.514.257-.767.257-1.415.001-1.952a1.807 1.807 0 0 0-.637-.657c.637.076 1.178.29 1.637.657z" />
      <path d="M18.428 6.167c-.584-.267-1.308-.4-2.16-.4h-4.165a.804.804 0 0 0-.794.68l-.04.22-1.11 7.027-.03.17a.483.483 0 0 0 .477.558h1.236a.805.805 0 0 0 .794-.68l.04-.22.63-4.026.03-.17a.804.804 0 0 1 .794-.68h.5c3.238 0 5.774-1.313 6.514-5.12.031-.16.058-.316.078-.468-.256-.16-.55-.3-.87-.411a5.905 5.905 0 0 0-.924-.26z" />
      <path d="M8.079 6.311l.03-.17a.804.804 0 0 1 .794-.68h4.166c.852 0 1.576.133 2.16.4.374.17.683.39.924.259a3.15 3.15 0 0 1 .87.412c.22-.943.01-1.586-.5-2.167-.559-.636-1.576-.909-2.879-.909H8.8c-.326 0-.605.214-.704.515l-1.68 10.677L6.397 15c-.1.636.39 1.213 1.04 1.213h2.504l.633-4.026.505-3.876z" />
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#8b5cf6">
      <path d="M22 10V8h-2v2h2zm0 2v2h-2v-2h2zm0 4v2H2v-2h20zm0-12v2H2V4h20zm0-2H2C.9 2 0 2.9 0 4v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 13h-2v-1h2v1zm-4 0H7v-1h2v1zm-4 0H3v-1h2v1z" />
    </svg>
  )
}
