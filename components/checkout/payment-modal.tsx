"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentModalProps {
  show: boolean
  onClose: () => void
  paymentDetails: any
  paymentError: string | null
}

export function PaymentModal({ show, onClose, paymentDetails, paymentError }: PaymentModalProps) {
  const [progress, setProgress] = useState(0)
  const [paymentComplete, setPaymentComplete] = useState(false)

  useEffect(() => {
    if (show && !paymentComplete && !paymentError) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setPaymentComplete(true)
            }, 500)
            return 100
          }
          return prev + 10
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [show, paymentComplete, paymentError])

  // Reset state when modal is closed
  useEffect(() => {
    if (!show) {
      setProgress(0)
      setPaymentComplete(false)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
        {!paymentComplete && !paymentError ? (
          <>
            <h3 className="text-xl font-semibold mb-4 text-center">Processing Payment</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-600">Please wait while we process your payment...</p>
          </>
        ) : paymentError ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">{paymentError}</p>
            <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">Your booking has been confirmed.</p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Booking ID</p>
                  <p className="font-medium">
                    {paymentDetails?.id
                      ? paymentDetails.id.substring(0, 8)
                      : "BK" +
                        Math.floor(Math.random() * 1000000)
                          .toString()
                          .padStart(6, "0")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Booking Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
