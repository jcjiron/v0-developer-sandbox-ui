"use client"

import { useState } from "react"
import { useForm } from "@/hooks/use-form"
import { FormInput } from "@/components/ui/form-input"
import { FormSelect } from "@/components/ui/form-select"
import { FormCheckbox } from "@/components/ui/form-checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Form values type
interface PaymentFormValues {
  cardNumber: string
  cardName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  saveCard: boolean
}

export function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null)

  // Initialize the form
  const { values, errors, handleChange, handleBlur, handleSubmit, setValue, isSubmitting, isValid } =
    useForm<PaymentFormValues>({
      initialValues: {
        cardNumber: "",
        cardName: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        saveCard: false,
      },
      validationRules: {
        cardNumber: {
          required: "Card number is required",
          pattern: {
            value: /^[0-9]{16}$/,
            message: "Card number must be 16 digits",
          },
        },
        cardName: {
          required: "Cardholder name is required",
        },
        expiryMonth: {
          required: "Expiry month is required",
        },
        expiryYear: {
          required: "Expiry year is required",
        },
        cvv: {
          required: "CVV is required",
          pattern: {
            value: /^[0-9]{3,4}$/,
            message: "CVV must be 3 or 4 digits",
          },
        },
      },
    })

  // Generate month options
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return {
      value: month.toString().padStart(2, "0"),
      label: month.toString().padStart(2, "0"),
    }
  })

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i
    return {
      value: year.toString(),
      label: year.toString(),
    }
  })

  // Handle form submission
  const onSubmit = async (formValues: PaymentFormValues) => {
    setIsProcessing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      console.log("Payment submitted:", formValues)
      setSubmissionResult({
        success: true,
        message: "Payment processed successfully!",
      })
    } catch (error) {
      // Handle error
      console.error("Payment failed:", error)
      setSubmissionResult({
        success: false,
        message: "Payment processing failed. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Card Number"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={values.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cardNumber}
            maxLength={16}
          />

          <FormInput
            label="Cardholder Name"
            name="cardName"
            placeholder="John Doe"
            value={values.cardName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cardName}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormSelect
                label="Expiry Month"
                name="expiryMonth"
                options={monthOptions}
                value={values.expiryMonth}
                onChange={(value) => setValue("expiryMonth", value)}
                error={errors.expiryMonth}
                placeholder="MM"
              />
            </div>

            <div className="space-y-2">
              <FormSelect
                label="Expiry Year"
                name="expiryYear"
                options={yearOptions}
                value={values.expiryYear}
                onChange={(value) => setValue("expiryYear", value)}
                error={errors.expiryYear}
                placeholder="YYYY"
              />
            </div>
          </div>

          <FormInput
            label="CVV"
            name="cvv"
            placeholder="123"
            value={values.cvv}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cvv}
            maxLength={4}
            type="password"
          />

          <FormCheckbox
            name="saveCard"
            label="Save card for future payments"
            checked={values.saveCard}
            onChange={(checked) => setValue("saveCard", checked)}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting || isProcessing || !isValid}>
            {isSubmitting || isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </form>

        {submissionResult && (
          <div
            className={`mt-4 p-3 rounded-md ${
              submissionResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {submissionResult.message}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">Your payment information is secure and encrypted</CardFooter>
    </Card>
  )
}
