"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

// Definir el tipo para la ventana global con PayPal
declare global {
  interface Window {
    paypal?: any
  }
}

interface PayPalCheckoutButtonProps {
  amount: number
  onSuccess: (details: any) => void
  onError: (error: any) => void
  onCancel: () => void
}

export function PayPalCheckoutButton({ amount, onSuccess, onError, onCancel }: PayPalCheckoutButtonProps) {
  const paypalButtonRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si el script ya está cargado
    if (window.paypal) {
      setScriptLoaded(true)
      setLoading(false)
      return
    }

    // Función para cargar el script de PayPal
    const loadPayPalScript = () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

        if (!clientId) {
          console.error("PayPal Client ID is not defined")
          setScriptError("PayPal configuration is missing")
          setLoading(false)
          return
        }

        const script = document.createElement("script")
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
        script.async = true

        script.onload = () => {
          console.log("PayPal script loaded successfully")
          setScriptLoaded(true)
          setLoading(false)
        }

        script.onerror = () => {
          console.error("Failed to load PayPal script")
          setScriptError("Failed to load PayPal SDK")
          setLoading(false)
        }

        document.body.appendChild(script)
      } catch (error) {
        console.error("Error loading PayPal script:", error)
        setScriptError("Error initializing PayPal")
        setLoading(false)
      }
    }

    loadPayPalScript()

    // Limpieza
    return () => {
      // No es necesario eliminar el script al desmontar el componente
      // ya que puede ser utilizado por otras partes de la aplicación
    }
  }, [])

  // Renderizar el botón de PayPal una vez que el script esté cargado
  useEffect(() => {
    if (scriptLoaded && paypalButtonRef.current && window.paypal) {
      // Limpiar el contenedor antes de renderizar
      paypalButtonRef.current.innerHTML = ""

      try {
        window.paypal
          .Buttons({
            createOrder: (_data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toString(),
                      currency_code: "USD",
                    },
                    description: "Luxury Ocean View Apartment Booking",
                  },
                ],
              })
            },
            onApprove: async (data: any, actions: any) => {
              try {
                const orderDetails = await actions.order.capture()
                console.log("Payment successful:", orderDetails)
                onSuccess(orderDetails)
              } catch (error) {
                console.error("Error capturing order:", error)
                onError(error)
              }
            },
            onCancel: () => {
              console.log("Payment cancelled")
              onCancel()
            },
            onError: (err: any) => {
              console.error("PayPal error:", err)
              onError(err)
            },
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },
          })
          .render(paypalButtonRef.current)
      } catch (error) {
        console.error("Error rendering PayPal buttons:", error)
        setScriptError("Error rendering PayPal buttons")
      }
    }
  }, [scriptLoaded, amount, onSuccess, onError, onCancel])

  if (loading) {
    return (
      <div className="w-full py-3 flex items-center justify-center bg-gray-100 rounded">
        <Loader2 className="w-5 h-5 text-blue-600 animate-spin mr-2" />
        <span>Cargando PayPal...</span>
      </div>
    )
  }

  if (scriptError) {
    return (
      <div className="w-full py-3 text-center bg-red-50 text-red-600 rounded border border-red-200">
        {scriptError}. Por favor, intente de nuevo más tarde.
      </div>
    )
  }

  return <div ref={paypalButtonRef} className="w-full min-h-[40px]" />
}
