"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSandbox } from "./sdk-context"
import { CopyIcon, CheckIcon } from "lucide-react"

export function InitializeSection() {
  const router = useRouter()
  const { initialized, keys, endpointUrl, initializeSdk } = useSandbox()

  const handlePromote = () => {
    router.push("/validation")
  }

  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-green-600 text-white font-medium">
                <span className="text-lg">⚙️</span>
              </div>
              <h2 className="text-xl font-semibold">SDK Initialization</h2>
            </div>
            <div className="flex gap-2">
              {!initialized ? (
                <Button onClick={initializeSdk} className="bg-green-600 hover:bg-green-700">
                  Get Keys
                </Button>
              ) : (
                <>
                  <Button disabled className="bg-gray-300">
                    Initialized
                  </Button>
                  <Button onClick={handlePromote} className="bg-purple-600 hover:bg-purple-700">
                    Promote
                  </Button>
                </>
              )}
            </div>
          </div>

          {initialized && keys && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KeyDisplay label="API Key" value={keys.apiKey} />
                <KeyDisplay label="Public Key" value={keys.publicKey} />
                <KeyDisplay label="Secret Key" value={keys.secretKey} />
              </div>
              {endpointUrl && (
                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-700">Endpoint URL</label>
                  <CopyableDisplay value={endpointUrl} />
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                These keys have been generated for your testing session. In a real environment, you would use your
                actual API credentials.
              </p>
            </div>
          )}
        </div>

        {/* Nueva sección de Checkout */}
        <div className="mt-8 pt-6 border-t border-gray-200">
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
        </div>
      </CardContent>
    </Card>
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
