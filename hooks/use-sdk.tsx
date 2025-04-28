"use client"

import { useSandbox } from "@/components/sdk-context"
import { useEffect } from "react"

export function useSdk() {
  const {
    keys,
    authToken,
    initialized,
    authenticated,
    authRequestResponse,
    userRequestResponse,
    cardsRequestResponse,
    chargeRequestResponse,
    setAuthToken,
    setAuthenticated,
    setAuthRequestResponse,
    setUserRequestResponse,
    setCardsRequestResponse,
    setChargeRequestResponse,
  } = useSandbox()

  // Initialize default requests
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

  // Initialize request templates without sending them
  const initializeAuthRequest = () => {
    if (!keys) return

    const request = {
      method: "POST",
      endpoint: "/api/auth/token",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        apiKey: keys.apiKey,
        publicKey: keys.publicKey,
        secretKey: keys.secretKey,
      },
    }

    setAuthRequestResponse({
      request,
      response: null,
      isLoading: false,
      hasError: false,
    })
  }

  const initializeUserRequest = () => {
    const request = {
      method: "GET",
      endpoint: "/api/users/current",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }

    setUserRequestResponse({
      request,
      response: null,
      isLoading: false,
      hasError: false,
    })
  }

  const initializeCardsRequest = () => {
    const request = {
      method: "GET",
      endpoint: "/api/payment-methods",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        limit: 10,
        offset: 0,
      },
    }

    setCardsRequestResponse({
      request,
      response: null,
      isLoading: false,
      hasError: false,
    })
  }

  const initializeChargeRequest = () => {
    const request = {
      method: "POST",
      endpoint: "/api/charges",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        amount: 2000, // $20.00
        currency: "usd",
        payment_method: "card_default",
        description: "Payment for order #1234",
        metadata: {
          orderId: "order_1234",
        },
      },
    }

    setChargeRequestResponse({
      request,
      response: null,
      isLoading: false,
      hasError: false,
    })
  }

  // Simulate API call with loading state and success/error
  const simulateApiCall = async (setter: Function, request: any, response: any, shouldFail = false) => {
    // Set loading state
    setter({
      request,
      response: null,
      isLoading: true,
      hasError: false,
    })

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (shouldFail) {
      // Simulate error
      setter({
        request,
        response: {
          status: 400,
          error: "Bad Request",
          message: "The request could not be processed due to validation errors.",
          details: {
            code: "VALIDATION_ERROR",
            fields: ["Invalid parameters"],
          },
        },
        isLoading: false,
        hasError: true,
      })
    } else {
      // Simulate success
      setter({
        request,
        response,
        isLoading: false,
        hasError: false,
      })
    }
  }

  const authenticate = async () => {
    if (!keys) return

    // Use the current request from the context (which might have been edited)
    const request = authRequestResponse.request

    const token = `oauth_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`

    const response = {
      status: 200,
      data: {
        token: token,
        expires_in: 3600,
        token_type: "Bearer",
        scope: "read write",
      },
    }

    await simulateApiCall(setAuthRequestResponse, request, response)

    // Set the auth token and authenticated state
    setAuthToken(token)
    setAuthenticated(true)

    return token
  }

  const getUser = async () => {
    // Use the current request from the context (which might have been edited)
    const request = userRequestResponse.request

    const response = {
      status: 200,
      data: {
        id: "usr_" + Math.random().toString(36).substring(2, 10),
        email: "user@example.com",
        name: "John Doe",
        created: new Date().toISOString(),
        metadata: {
          lastLogin: new Date().toISOString(),
        },
      },
    }

    // Module 2 always fails as requested
    await simulateApiCall(setUserRequestResponse, request, response, true)
  }

  const getCards = async () => {
    // Use the current request from the context (which might have been edited)
    const request = cardsRequestResponse.request

    const response = {
      status: 200,
      data: {
        total: 2,
        data: [
          {
            id: "card_" + Math.random().toString(36).substring(2, 10),
            type: "card",
            brand: "visa",
            last4: "4242",
            expMonth: 12,
            expYear: 2025,
            isDefault: true,
          },
          {
            id: "card_" + Math.random().toString(36).substring(2, 10),
            type: "card",
            brand: "mastercard",
            last4: "8210",
            expMonth: 3,
            expYear: 2024,
            isDefault: false,
          },
        ],
      },
    }

    await simulateApiCall(setCardsRequestResponse, request, response)
  }

  const charge = async () => {
    // Use the current request from the context (which might have been edited)
    const request = chargeRequestResponse.request

    const response = {
      status: 200,
      data: {
        id: "ch_" + Math.random().toString(36).substring(2, 10),
        amount: 2000,
        currency: "usd",
        status: "succeeded",
        payment_method: "card_" + Math.random().toString(36).substring(2, 10),
        created: new Date().toISOString(),
        description: "Payment for order #1234",
        metadata: {
          orderId: "order_1234",
        },
      },
    }

    await simulateApiCall(setChargeRequestResponse, request, response)
  }

  return {
    authenticate,
    getUser,
    getCards,
    charge,
    initializeAuthRequest,
    initializeUserRequest,
    initializeCardsRequest,
    initializeChargeRequest,
  }
}
