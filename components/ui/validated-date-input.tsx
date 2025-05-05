"use client"

import { useState, useEffect } from "react"
import { DateInput } from "@/components/ui/date-input"

interface ValidatedDateInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  minDate?: string
  maxDate?: string
  required?: boolean
  className?: string
}

export function ValidatedDateInput({
  value,
  onChange,
  label = "Date",
  minDate,
  maxDate,
  required = false,
  className,
}: ValidatedDateInputProps) {
  const [error, setError] = useState<string>("")

  // Validate date whenever value, minDate, or maxDate changes
  useEffect(() => {
    if (!value) {
      setError(required ? "Date is required" : "")
      return
    }

    const selectedDate = new Date(value)

    // Check if date is valid
    if (isNaN(selectedDate.getTime())) {
      setError("Invalid date")
      return
    }

    // Check min date
    if (minDate && new Date(value) < new Date(minDate)) {
      setError(`Date cannot be before ${new Date(minDate).toLocaleDateString()}`)
      return
    }

    // Check max date
    if (maxDate && new Date(value) > new Date(maxDate)) {
      setError(`Date cannot be after ${new Date(maxDate).toLocaleDateString()}`)
      return
    }

    // Clear error if validation passes
    setError("")
  }, [value, minDate, maxDate, required])

  return (
    <DateInput
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={minDate}
      max={maxDate}
      required={required}
      error={error}
      className={className}
    />
  )
}
