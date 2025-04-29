"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSandbox } from "./sdk-context"
import { CopyIcon, CheckIcon } from "lucide-react"

export function CheckoutSection() {
  const router = useRouter()
  const { initialized, keys, endpointUrl, initializeSdk } = useSandbox()

  const handlePromote = () => {
    router.push("/validation")
  }

  const handleInitialize = () => {
    initializeSdk()
    router.push("/sdk-inspector")
  }

  return (
    <div className="space-y-6">
      {/* Checkout Card */}
      <Card className="border rounded-lg">
        <CardContent className="p-8 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-blue-600 text-white font-medium">
                <span className="text-lg">🏠</span>
              </div>
              <h2 className="text-xl font-semibold">Checkout</h2>
            </div>
            <Button onClick={() => router.push("/apartment-detail")} className="bg-blue-600 hover:bg-blue-700">
              View Apartment
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Test the payment flow with a sample apartment booking. Click the button to view details and proceed to
            checkout.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function KeyDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <CopyableDisplay value={value} />
    </div>
  )
}

function CopyableDisplay({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-100 p-2 rounded font-mono text-sm overflow-x-auto whitespace-nowrap flex justify-between items-center">
      <span className="truncate">{value}</span>
      <button
        onClick={copyToClipboard}
        className="ml-2 p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Copy to clipboard"
      >
        {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4 text-gray-500" />}
      </button>
    </div>
  )
}
