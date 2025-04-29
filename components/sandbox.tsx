"use client"

import { useEffect } from "react"
import { CheckoutSection } from "./checkout-section"
import { useSandbox } from "./sdk-context"
import { useSdk } from "@/hooks/use-sdk"

export default function Sandbox() {
  const { initialized } = useSandbox()
  const { initializeAuthRequest } = useSdk()

  // Initialize requests when component mounts
  useEffect(() => {
    if (initialized) {
      initializeAuthRequest()
    }
  }, [initialized])

  return (
    <div className="flex flex-col gap-6">
      <CheckoutSection />
    </div>
  )
}
