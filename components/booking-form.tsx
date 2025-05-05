"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DateRangeInput } from "@/components/ui/date-range-input"
import { ValidatedDateInput } from "@/components/ui/validated-date-input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export function BookingForm() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [paymentDate, setPaymentDate] = useState("")

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  // Calculate a date 1 year from now
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
  const maxDate = oneYearFromNow.toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking details:", { startDate, endDate, paymentDate })
    // Process booking...
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book Your Stay</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <DateRangeInput
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            startLabel="Check-in Date"
            endLabel="Check-out Date"
          />

          <ValidatedDateInput
            label="Payment Date"
            value={paymentDate}
            onChange={setPaymentDate}
            minDate={today}
            maxDate={maxDate}
            required
          />

          <Button type="submit" className="w-full">
            Complete Booking
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-sm text-gray-500">All dates are in your local timezone.</CardFooter>
    </Card>
  )
}
