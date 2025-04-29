"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SimplePayPalButton } from "@/components/simple-paypal-button"
import { Info } from "lucide-react"

interface PriceDetailsCardProps {
  onPaymentSuccess: (details: any) => void
  onPaymentError: (error: any) => void
}

export function PriceDetailsCard({ onPaymentSuccess, onPaymentError }: PriceDetailsCardProps) {
  const totalAmount = 1105 // $1,105.00

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
          Usando credenciales de PayPal configuradas
        </p>
      </div>
      <CardFooter className="flex flex-col border-t pt-4">
        <div className="flex justify-between w-full font-bold mb-4">
          <span>Total</span>
          <span>$1,105</span>
        </div>

        {/* Botón de PayPal */}
        <div className="w-full mb-4 overflow-hidden">
          <SimplePayPalButton amount={totalAmount} onSuccess={onPaymentSuccess} onError={onPaymentError} />
        </div>

        <p className="text-xs text-gray-500 text-center">
          Al proceder con el pago, aceptas los términos y condiciones.
        </p>
      </CardFooter>
    </Card>
  )
}
