"use client"

import { useState } from "react"
import { BookingSummary } from "./booking-summary"
import { PaymentMethodSection } from "./payment-method-section"
import { PriceDetailsCard } from "./price-details-card"
import { PaymentModal } from "./payment-modal"

export function CheckoutContent() {
  const [showModal, setShowModal] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const handlePaymentSuccess = (details: any) => {
    setPaymentDetails(details)
    setPaymentError(null)
    setShowModal(true)
  }

  const handlePaymentError = (error: any) => {
    setPaymentError(error.message || "Hubo un error al procesar su pago")
    setPaymentDetails(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BookingSummary />
          <PaymentMethodSection />
        </div>

        <div className="md:col-span-1">
          <PriceDetailsCard onPaymentSuccess={handlePaymentSuccess} onPaymentError={handlePaymentError} />
        </div>
      </div>

      <PaymentModal
        show={showModal}
        onClose={handleCloseModal}
        paymentDetails={paymentDetails}
        paymentError={paymentError}
      />
    </div>
  )
}
