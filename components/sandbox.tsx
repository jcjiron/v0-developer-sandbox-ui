"use client"

import { useEffect } from "react"
import { InitializeSection } from "./initialize-section"
import { CollapsibleActionSection } from "./collapsible-action-section"
import { useSandbox } from "./sdk-context"
import { useSdk } from "@/hooks/use-sdk"

export default function Sandbox() {
  const {
    initialized,
    authenticated,
    authRequestResponse,
    userRequestResponse,
    cardsRequestResponse,
    chargeRequestResponse,
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
    <div className="flex flex-col gap-6">
      <InitializeSection />

      {initialized && (
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
      )}
    </div>
  )
}
