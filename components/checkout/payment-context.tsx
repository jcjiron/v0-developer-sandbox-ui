"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type PaymentMethod = "paypal" | "new-method"

interface PaymentContextType {
  selectedMethod: PaymentMethod
  setSelectedMethod: (method: PaymentMethod) => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("paypal")

  return <PaymentContext.Provider value={{ selectedMethod, setSelectedMethod }}>{children}</PaymentContext.Provider>
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider")
  }
  return context
}
