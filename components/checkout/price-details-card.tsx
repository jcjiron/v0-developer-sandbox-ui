"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SimplePayPalButton } from "@/components/simple-paypal-button"
import { Info } from "lucide-react"
import { usePayment } from "./payment-context"
import { Button } from "@/components/ui/button"

interface PriceDetailsCardProps {
  onPaymentSuccess: (details: any) => void
  onPaymentError: (error: any) => void
}

export function PriceDetailsCard({ onPaymentSuccess, onPaymentError }: PriceDetailsCardProps) {
  const totalAmount = 1105 // $1,105.00
  const { selectedMethod } = usePayment()

  const handleNewMethodPayment = () => {
    // Simulación de pago exitoso
    setTimeout(() => {
      onPaymentSuccess({
        id: "payment_" + Math.random().toString(36).substring(2, 10),
        status: "COMPLETED",
        create_time: new Date().toISOString(),
        payer: {
          name: {
            given_name: "John",
            surname: "Doe",
          },
          email_address: "customer@example.com",
        },
      })
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex flex-wrap justify-between">
            <span className="mr-2">$189 x 5 nights</span>
            <span className="font-medium">$945</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="mr-2">Cleaning fee</span>
            <span className="font-medium">$75</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="mr-2">Service fee</span>
            <span className="font-medium">$85</span>
          </div>
        </div>
      </CardContent>
      <div className="px-6 py-2 bg-blue-50 text-xs text-blue-700 border-t border-blue-100">
        <p className="flex items-center">
          <Info className="w-4 h-4 mr-1" />
          {selectedMethod === "paypal"
            ? "Usando credenciales de PayPal configuradas"
            : "Usando método de pago alternativo"}
        </p>
      </div>
      <CardFooter className="flex flex-col border-t pt-4">
        <div className="flex justify-between w-full font-bold mb-4">
          <span>Total</span>
          <span>$1,105</span>
        </div>

        {/* Botones de pago según el método seleccionado */}
        {selectedMethod === "paypal" ? (
          <div className="w-full mb-4 overflow-hidden">
            <SimplePayPalButton amount={totalAmount} onSuccess={onPaymentSuccess} onError={onPaymentError} />
          </div>
        ) : (
          <div className="w-full space-y-3 mb-4">
            <Button
              onClick={handleNewMethodPayment}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              Pay with Credit Card
            </Button>
            <Button onClick={handleNewMethodPayment} className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3">
              Pay with Crypto
            </Button>
            <Button onClick={handleNewMethodPayment} className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
              Pay with Bank Transfer
            </Button>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          Al proceder con el pago, aceptas los términos y condiciones.
        </p>
      </CardFooter>
    </Card>
  )
}
