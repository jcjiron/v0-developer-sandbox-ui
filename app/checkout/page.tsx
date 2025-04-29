"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Maximize2, Minimize2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SandboxProvider } from "@/components/sdk-context"
import { useSandbox } from "@/components/sdk-context"
import { useSdk } from "@/hooks/use-sdk"
import { CollapsibleActionSection } from "@/components/collapsible-action-section"

export default function CheckoutPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [progress, setProgress] = useState(0)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50) // Default 50%
  const [isResizing, setIsResizing] = useState(false)
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const handlePayWithPaypal = () => {
    setShowModal(true)

    // Simulate progress
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
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftPanelWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Limit the minimum width of both panels
      if (newLeftPanelWidth >= 20 && newLeftPanelWidth <= 80) {
        setLeftPanelWidth(newLeftPanelWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const toggleLeftPanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Simulator
          </Link>
          <h1 className="text-xl font-bold">Checkout & SDK Inspector</h1>
          <div></div> {/* Empty div for flex alignment */}
        </div>
      </div>

      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left Panel - SDK Inspector */}
        <div
          className={`bg-white overflow-auto transition-all duration-300 ${isLeftPanelCollapsed ? "w-0" : ""}`}
          style={{ width: isLeftPanelCollapsed ? "0%" : `${leftPanelWidth}%` }}
        >
          <div className="p-4">
            <SandboxProvider>
              <SdkInspectorContent />
            </SandboxProvider>
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          ref={dividerRef}
          className={`w-1 bg-gray-200 relative cursor-col-resize hover:bg-blue-400 active:bg-blue-600 ${isLeftPanelCollapsed ? "hidden" : ""}`}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-10 flex items-center justify-center bg-gray-200 rounded">
            <GripVertical className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-r-md shadow-md border border-l-0"
          onClick={toggleLeftPanel}
        >
          {isLeftPanelCollapsed ? (
            <Maximize2 className="w-4 h-4 text-gray-600" />
          ) : (
            <Minimize2 className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Right Panel - Checkout UI */}
        <div
          className="flex-1 overflow-auto p-6"
          style={{ width: isLeftPanelCollapsed ? "100%" : `${100 - leftPanelWidth}%` }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                        <img src="/penthouse-cityscape.png" alt="Apartment" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Luxury Ocean View Apartment</h3>
                        <p className="text-sm text-gray-600">Miami Beach, Florida</p>
                        <p className="text-sm text-gray-600">May 15 - May 20, 2023 (5 nights)</p>
                        <p className="text-sm text-gray-600">2 guests</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border rounded-md bg-blue-50 border-blue-200">
                        <div className="w-10 h-10 mr-4 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="#0070ba"
                          >
                            <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.026-.03.17a.804.804 0 0 1-.794.679h-2.52a.483.483 0 0 1-.477-.558l.033-.15.212-1.347H8.8l1.386-8.798a.483.483 0 0 1 .477-.41h2.24c2.517 0 4.5-.515 5.163-2.514.257-.767.257-1.415.001-1.952a1.807 1.807 0 0 0-.637-.657c.637.076 1.178.29 1.637.657z" />
                            <path d="M18.428 6.167c-.584-.267-1.308-.4-2.16-.4h-4.165a.804.804 0 0 0-.794.68l-.04.22-1.11 7.027-.03.17a.483.483 0 0 0 .477.558h1.236a.805.805 0 0 0 .794-.68l.04-.22.63-4.026.03-.17a.804.804 0 0 1 .794-.68h.5c3.238 0 5.774-1.313 6.514-5.12.031-.16.058-.316.078-.468-.256-.16-.55-.3-.87-.411a5.905 5.905 0 0 0-.924-.26z" />
                            <path d="M8.079 6.311l.03-.17a.804.804 0 0 1 .794-.68h4.166c.852 0 1.576.133 2.16.4.374.17.683.39.924.259a3.15 3.15 0 0 1 .87.412c.22-.943.01-1.586-.5-2.167-.559-.636-1.576-.909-2.879-.909H8.8c-.326 0-.605.214-.704.515l-1.68 10.677L6.397 15c-.1.636.39 1.213 1.04 1.213h2.504l.633-4.026.505-3.876z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-gray-600">Pay securely using your PayPal account</p>
                        </div>
                        <input type="radio" checked readOnly className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Price Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>$189 x 5 nights</span>
                        <span>$945</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>$75</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>$85</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col border-t pt-4">
                    <div className="flex justify-between w-full font-bold mb-4">
                      <span>Total</span>
                      <span>$1,105</span>
                    </div>
                    <Button
                      onClick={handlePayWithPaypal}
                      className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="white"
                        className="mr-2"
                      >
                        <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.026-.03.17a.804.804 0 0 1-.794.679h-2.52a.483.483 0 0 1-.477-.558l.033-.15.212-1.347H8.8l1.386-8.798a.483.483 0 0 1 .477-.41h2.24c2.517 0 4.5-.515 5.163-2.514.257-.767.257-1.415.001-1.952a1.807 1.807 0 0 0-.637-.657c.637.076 1.178.29 1.637.657z" />
                        <path d="M18.428 6.167c-.584-.267-1.308-.4-2.16-.4h-4.165a.804.804 0 0 0-.794.68l-.04.22-1.11 7.027-.03.17a.483.483 0 0 0 .477.558h1.236a.805.805 0 0 0 .794-.68l.04-.22.63-4.026.03-.17a.804.804 0 0 1 .794-.68h.5c3.238 0 5.774-1.313 6.514-5.12.031-.16.058-.316.078-.468-.256-.16-.55-.3-.87-.411a5.905 5.905 0 0 0-.924-.26z" />
                        <path d="M8.079 6.311l.03-.17a.804.804 0 0 1 .794-.68h4.166c.852 0 1.576.133 2.16.4.374.17.683.39.924.259a3.15 3.15 0 0 1 .87.412c.22-.943.01-1.586-.5-2.167-.559-.636-1.576-.909-2.879-.909H8.8c-.326 0-.605.214-.704.515l-1.68 10.677L6.397 15c-.1.636.39 1.213 1.04 1.213h2.504l.633-4.026.505-3.876z" />
                      </svg>
                      Pay with PayPal
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By clicking "Pay with PayPal", you agree to the terms and conditions.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Processing Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {!paymentComplete ? (
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
                        {"BK" +
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
                <Button onClick={() => setShowModal(false)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// SDK Inspector Content Component
function SdkInspectorContent() {
  const {
    initialized,
    authenticated,
    keys,
    endpointUrl,
    authRequestResponse,
    userRequestResponse,
    cardsRequestResponse,
    chargeRequestResponse,
    initializeSdk,
  } = useSandbox()

  const {
    authenticate,
    getUser,
    getCards,
    charge,
    initializeAuthRequest,
    initializeUserRequest,
    initializeCardsRequest,
    initializeChargeRequest,
  } = useSdk()

  // Initialize requests when component mounts
  useEffect(() => {
    if (initialized) {
      initializeAuthRequest()
    }
  }, [initialized])

  useEffect(() => {
    if (authenticated) {
      initializeUserRequest()
      initializeCardsRequest()
      initializeChargeRequest()
    }
  }, [authenticated])

  return (
    <div className="space-y-6">
      {/* SDK Info Card */}
      <Card className="border rounded-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">SDK Information</h2>
            {!initialized && (
              <Button onClick={initializeSdk} className="bg-green-600 hover:bg-green-700">
                Get Keys
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Status:</p>
              <p className={initialized ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                {initialized ? "Initialized" : "Not Initialized"}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Authentication:</p>
              <p className={authenticated ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                {authenticated ? "Authenticated" : "Not Authenticated"}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Endpoint:</p>
              <p className="font-mono text-xs truncate">{endpointUrl || "No endpoint available"}</p>
            </div>
            {authenticated && (
              <div>
                <p className="font-medium text-gray-700">Token:</p>
                <p className="font-mono text-xs truncate">{authRequestResponse.response?.data?.token || "No token"}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Modules */}
      <div className="space-y-2">
        <CollapsibleActionSection
          moduleNumber={1}
          title="Authentication"
          onAction={authenticate}
          actionLabel="Authenticate"
          request={authRequestResponse.request}
          response={authRequestResponse.response}
          isLoading={authRequestResponse.isLoading}
          hasError={authRequestResponse.hasError}
        />

        {authenticated && (
          <>
            <CollapsibleActionSection
              moduleNumber={2}
              title="User Information"
              onAction={getUser}
              actionLabel="Get User"
              request={userRequestResponse.request}
              response={userRequestResponse.response}
              isLoading={userRequestResponse.isLoading}
              hasError={userRequestResponse.hasError}
            />

            <CollapsibleActionSection
              moduleNumber={3}
              title="Payment Methods"
              onAction={getCards}
              actionLabel="Get Cards"
              request={cardsRequestResponse.request}
              response={cardsRequestResponse.response}
              isLoading={cardsRequestResponse.isLoading}
              hasError={cardsRequestResponse.hasError}
            />

            <CollapsibleActionSection
              moduleNumber={4}
              title="Process Payment"
              onAction={charge}
              actionLabel="Charge"
              request={chargeRequestResponse.request}
              response={chargeRequestResponse.response}
              isLoading={chargeRequestResponse.isLoading}
              hasError={chargeRequestResponse.hasError}
            />
          </>
        )}
      </div>
    </div>
  )
}
