"use client"

import { forwardRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
}

export interface FormSelectProps {
  label?: string
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  disabled?: boolean
  name: string
  className?: string
  containerClassName?: string
}

export const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      error,
      placeholder = "Select an option",
      disabled,
      name,
      className,
      containerClassName,
    },
    ref,
  ) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Select value={value} onValueChange={onChange} disabled={disabled} name={name}>
          <SelectTrigger
            ref={ref}
            id={name}
            className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm font-medium text-red-500" id={`${name}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormSelect.displayName = "FormSelect"
