"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type SdkMode = "LIVE" | "MOCK"

type SdkKeys = {
  apiKey: string
  publicKey: string
  secretKey: string
  clientId: string
  secretId: string
} | null

type RequestResponse = {
  request: any
  response: any
  isLoading: boolean
  hasError: boolean
}

const emptyRequestResponse = {
  request: null,
  response: null,
  isLoading: false,
  hasError: false,
}

interface SandboxContextType {
  initialized: boolean
  authenticated: boolean
  keys: SdkKeys
  authToken: string | null
  endpointUrl: string | null
  mode: SdkMode
  authRequestResponse: RequestResponse
  userRequestResponse: RequestResponse
  cardsRequestResponse: RequestResponse
  chargeRequestResponse: RequestResponse
  initializeSdk: (mode?: SdkMode) => void
  setMode: (mode: SdkMode) => void
  setAuthToken: (token: string) => void
  setAuthenticated: (value: boolean) => void
  setAuthRequestResponse: (data: Partial<RequestResponse>) => void
  setUserRequestResponse: (data: Partial<RequestResponse>) => void
  setCardsRequestResponse: (data: Partial<RequestResponse>) => void
  setChargeRequestResponse: (data: Partial<RequestResponse>) => void
}

const SandboxContext = createContext<SandboxContextType | undefined>(undefined)

export function SandboxProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [endpointUrl, setEndpointUrl] = useState<string | null>(null)
  const [keys, setKeys] = useState<SdkKeys>(null)
  const [mode, setMode] = useState<SdkMode>("LIVE")
  const [authRequestResponse, setAuthRequestResponse] = useState<RequestResponse>(emptyRequestResponse)
  const [userRequestResponse, setUserRequestResponse] = useState<RequestResponse>(emptyRequestResponse)
  const [cardsRequestResponse, setCardsRequestResponse] = useState<RequestResponse>(emptyRequestResponse)
  const [chargeRequestResponse, setChargeRequestResponse] = useState<RequestResponse>(emptyRequestResponse)

  const generateRandomString = (length = 24) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const initializeSdk = (newMode?: SdkMode) => {
    const currentMode = newMode || mode
    const prefix = currentMode === "LIVE" ? "pb_" : "dev_"

    const newKeys = {
      apiKey: generateRandomString(),
      publicKey: generateRandomString(),
      secretKey: generateRandomString(),
      clientId: `${prefix}${generateRandomString(16)}`,
      secretId: `${prefix}${generateRandomString(16)}`,
    }

    const randomEndpoint = generateRandomString(8).toLowerCase()
    const baseUrl = currentMode === "LIVE" ? "https://api.payment.com" : "https://sandbox.payment.api"
    const newEndpointUrl = `${baseUrl}/${randomEndpoint}`

    setEndpointUrl(newEndpointUrl)
    setKeys(newKeys)
    setInitialized(true)

    if (newMode && newMode !== mode) {
      setMode(newMode)
    }
  }

  const updateMode = (newMode: SdkMode) => {
    if (newMode !== mode) {
      setMode(newMode)

      // Reinicializar el SDK con el nuevo modo si ya estaba inicializado
      if (initialized) {
        initializeSdk(newMode)
      }
    }
  }

  const updateAuthRequestResponse = (data: Partial<RequestResponse>) => {
    setAuthRequestResponse((prev) => ({ ...prev, ...data }))
  }

  const updateUserRequestResponse = (data: Partial<RequestResponse>) => {
    setUserRequestResponse((prev) => ({ ...prev, ...data }))
  }

  const updateCardsRequestResponse = (data: Partial<RequestResponse>) => {
    setCardsRequestResponse((prev) => ({ ...prev, ...data }))
  }

  const updateChargeRequestResponse = (data: Partial<RequestResponse>) => {
    setChargeRequestResponse((prev) => ({ ...prev, ...data }))
  }

  return (
    <SandboxContext.Provider
      value={{
        initialized,
        authenticated,
        keys,
        authToken,
        endpointUrl,
        mode,
        authRequestResponse,
        userRequestResponse,
        cardsRequestResponse,
        chargeRequestResponse,
        initializeSdk,
        setMode: updateMode,
        setAuthToken,
        setAuthenticated,
        setAuthRequestResponse: updateAuthRequestResponse,
        setUserRequestResponse: updateUserRequestResponse,
        setCardsRequestResponse: updateCardsRequestResponse,
        setChargeRequestResponse: updateChargeRequestResponse,
      }}
    >
      {children}
    </SandboxContext.Provider>
  )
}

export function useSandbox() {
  const context = useContext(SandboxContext)
  if (context === undefined) {
    throw new Error("useSandbox must be used within a SandboxProvider")
  }
  return context
}
