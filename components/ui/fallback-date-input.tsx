"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FallbackDateInput({
  label,
  value,
  onChange,
  ...props
}: {
  label?: string
  value: string
  onChange: (value: string) => void
  [key: string]: any
}) {
  const [isNativeDateSupported, setIsNativeDateSupported] = useState(true)

  // Check if native date input is supported
  useEffect(() => {
    const input = document.createElement("input")
    input.type = "date"
    const notADateValue = "not-a-date"
    input.value = notADateValue

    // If the browser supports date inputs, it will clear invalid values
    setIsNativeDateSupported(input.value !== notADateValue)
  }, [])

  if (isNativeDateSupported) {
    return (
      <div className="space-y-2">
        {label && <Label>{label}</Label>}
        <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} {...props} />
      </div>
    )
  }

  // Fallback to text input with pattern and placeholder
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="YYYY-MM-DD"
        pattern="\d{4}-\d{2}-\d{2}"
        {...props}
      />
    </div>
  )
}
