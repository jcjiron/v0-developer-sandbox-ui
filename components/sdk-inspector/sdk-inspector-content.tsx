"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSandbox } from "@/components/sdk-context"
import { useSdk } from "@/hooks/use-sdk"
import { CollapsibleActionSection } from "@/components/collapsible-action-section"

export function SdkInspectorContent() {
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
