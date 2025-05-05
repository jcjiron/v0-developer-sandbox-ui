"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useSandbox, type SdkMode } from "@/components/sdk-context"
import { useSdk } from "@/hooks/use-sdk"
import { CollapsibleActionSection } from "@/components/collapsible-action-section"
import { CopyIcon, CheckIcon } from "lucide-react"

export function SdkInspectorContent() {
  const {
    initialized,
    authenticated,
    keys,
    endpointUrl,
    mode,
    setMode,
    authRequestResponse,
    userRequestResponse,
    cardsRequestResponse,
    chargeRequestResponse,
    initializeSdk,
    setAuthToken,
    setAuthenticated,
    setAuthRequestResponse,
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

  // Inicializar SDK y autenticar automáticamente al cargar la página
  useEffect(() => {
    // Si el SDK no está inicializado, inicializarlo
    if (!initialized) {
      initializeSdk()
    }

    // Una vez inicializado, asegurar que el usuario esté autenticado
    if (!authenticated && initialized) {
      // Simular que el usuario ya está autenticado
      const randomToken = `oauth_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`
      setAuthToken(randomToken)
      setAuthenticated(true)

      // Actualizar el objeto de respuesta de autenticación para mostrar datos coherentes
      const mockAuthResponse = {
        status: 200,
        data: {
          token: randomToken,
          expires_in: 3600,
          token_type: "Bearer",
          scope: "read write",
        },
      }

      setAuthRequestResponse({
        request: authRequestResponse.request,
        response: mockAuthResponse,
        isLoading: false,
        hasError: false,
      })
    }
  }, [
    initialized,
    authenticated,
    initializeSdk,
    setAuthToken,
    setAuthenticated,
    setAuthRequestResponse,
    authRequestResponse.request,
  ])

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

  const handleModeChange = (newMode: SdkMode) => {
    setMode(newMode)
  }

  return (
    <div className="space-y-6">
      {/* SDK Info Card */}
      <Card className="border rounded-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">SDK Information</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                <button
                  onClick={() => handleModeChange("LIVE")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    mode === "LIVE" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Live
                </button>
                <button
                  onClick={() => handleModeChange("MOCK")}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    mode === "MOCK" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Mock
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
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
              <p className="font-medium text-gray-700">Environment:</p>
              <p className={`font-medium ${mode === "LIVE" ? "text-green-600" : "text-amber-600"}`}>
                {mode === "LIVE" ? "Production" : "Sandbox"}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Endpoint:</p>
              <p className="font-mono text-xs truncate">{endpointUrl || "No endpoint available"}</p>
            </div>
          </div>

          {keys && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-medium text-gray-700 mb-3">API Credentials</h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Client ID</p>
                  <CopyableDisplay value={keys.clientId} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Secret ID</p>
                  <CopyableDisplay value={keys.secretId} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Auth Token</p>
                  <CopyableDisplay value={authRequestResponse.response?.data?.token || "No token"} />
                </div>
              </div>
            </div>
          )}
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
