"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

// Definir el tipo para la ventana global con PayPal
declare global {
  interface Window {
    paypal?: any
  }
}

interface SimplePayPalButtonProps {
  amount: number
  onSuccess: (details: any) => void
  onError: (error: any) => void
}

export function SimplePayPalButton({ amount, onSuccess, onError }: SimplePayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scriptLoadedRef = useRef(false)
  const buttonRenderedRef = useRef(false)

  // Cargar el script de PayPal
  useEffect(() => {
    // Si ya existe el script de PayPal, no lo cargamos de nuevo
    if (window.paypal) {
      scriptLoadedRef.current = true
      setLoading(false)
      return
    }

    const loadScript = () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
        if (!clientId) {
          console.error("PayPal Client ID no configurado")
          setError("PayPal Client ID no configurado")
          setLoading(false)
          return
        }

        const script = document.createElement("script")
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
        script.async = true

        script.onload = () => {
          console.log("Script de PayPal cargado correctamente")
          scriptLoadedRef.current = true
          setLoading(false)
        }

        script.onerror = () => {
          console.error("Error al cargar el script de PayPal")
          setError("No se pudo cargar PayPal")
          setLoading(false)
        }

        document.body.appendChild(script)
      } catch (err) {
        console.error("Error al inicializar PayPal:", err)
        setError("Error al inicializar PayPal")
        setLoading(false)
      }
    }

    loadScript()
  }, [])

  // Renderizar el botón de PayPal cuando el script esté cargado
  useEffect(() => {
    if (!scriptLoadedRef.current || !paypalRef.current || !window.paypal || buttonRenderedRef.current) {
      return
    }

    try {
      // Limpiar el contenedor antes de renderizar
      paypalRef.current.innerHTML = ""

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          },
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
          onApprove: async (_data: any, actions: any) => {
            try {
              const details = await actions.order.capture()
              console.log("Pago completado:", details)
              onSuccess(details)
            } catch (err) {
              console.error("Error al capturar el pago:", err)
              onError(err)
            }
          },
          onError: (err: any) => {
            console.error("Error de PayPal:", err)
            onError(err)
          },
        })
        .render(paypalRef.current)
        .then(() => {
          buttonRenderedRef.current = true
          console.log("Botón de PayPal renderizado correctamente")
        })
        .catch((err: any) => {
          console.error("Error al renderizar el botón de PayPal:", err)
          setError("Error al mostrar el botón de PayPal")
        })
    } catch (err) {
      console.error("Error al configurar el botón de PayPal:", err)
      setError("Error al configurar el botón de PayPal")
    }
  }, [amount, onError, onSuccess, loading])

  if (loading) {
    return (
      <div className="w-full py-4 flex items-center justify-center bg-gray-100 rounded">
        <Loader2 className="w-5 h-5 text-blue-600 animate-spin mr-2" />
        <span>Cargando PayPal...</span>
      </div>
    )
  }

  if (error) {
    return <div className="w-full py-4 text-center bg-red-50 text-red-600 rounded border border-red-200">{error}</div>
  }

  return <div ref={paypalRef} className="w-full min-h-[45px]" />
}
