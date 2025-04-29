"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

declare global {
  interface Window {
    paypal: any
  }
}

interface PayPalButtonProps {
  amount: number
  currency: string
  onSuccess: (details: any) => void
  onError: (error: any) => void
}

export function PayPalButton({ amount, currency, onSuccess, onError }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    // Add PayPal Script
    const addPayPalScript = () => {
      setIsLoading(true)
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=sb&currency=${currency}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
        setIsLoading(false)
      }
      script.onerror = () => {
        console.error("PayPal SDK could not be loaded")
        setIsLoading(false)
        onError(new Error("PayPal SDK could not be loaded"))
      }
      document.body.appendChild(script)
    }

    if (window.paypal) {
      setSdkReady(true)
      setIsLoading(false)
    } else {
      addPayPalScript()
    }
  }, [currency, onError])

  useEffect(() => {
    if (sdkReady && paypalRef.current) {
      // Clear any existing buttons
      paypalRef.current.innerHTML = ""

      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount.toString(),
                  },
                  description: "Luxury Ocean View Apartment Booking",
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            })
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture()
              onSuccess(details)
            } catch (error) {
              console.error("Error capturing PayPal order:", error)
              onError(error)
            }
          },
          onError: (err: any) => {
            console.error("PayPal Checkout Error:", err)
            onError(err)
          },
          style: {
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 40,
          },
        })
        .render(paypalRef.current)
    }
  }, [sdkReady, amount, currency, onSuccess, onError])

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full h-12 bg-gray-100 rounded flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="ml-2 text-sm text-gray-600">Loading PayPal...</span>
        </div>
      )}
      <div ref={paypalRef} className="w-full"></div>
    </div>
  )
}
