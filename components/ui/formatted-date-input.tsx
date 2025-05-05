"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

interface FormattedDateInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  format?: string
  className?: string
}

export function FormattedDateInput({
  value,
  onChange,
  label,
  format = "MM/dd/yyyy",
  className,
}: FormattedDateInputProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Format the date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ""

      // Simple formatter - replace with more sophisticated one if needed
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const year = date.getFullYear()

      return format.replace("MM", month).replace("dd", day).replace("yyyy", year.toString())
    } catch (e) {
      return ""
    }
  }

  return (
    <div className={className}>
      {label && <Label className="mb-2 block">{label}</Label>}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? formatDate(value) : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <Input
            type="date"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              setIsOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
