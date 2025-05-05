"use client"
import { DateInput } from "@/components/ui/date-input"

interface DateRangeInputProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  startLabel?: string
  endLabel?: string
  startError?: string
  endError?: string
  className?: string
}

export function DateRangeInput({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startLabel = "Start Date",
  endLabel = "End Date",
  startError,
  endError,
  className,
}: DateRangeInputProps) {
  // Calculate min date for end date (can't be before start date)
  const minEndDate = startDate || undefined

  // Calculate max date for start date (can't be after end date)
  const maxStartDate = endDate || undefined

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <DateInput
        label={startLabel}
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        max={maxStartDate}
        error={startError}
      />

      <DateInput
        label={endLabel}
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        min={minEndDate}
        error={endError}
      />
    </div>
  )
}
