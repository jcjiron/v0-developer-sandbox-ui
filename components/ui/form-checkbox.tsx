"use client"

import { forwardRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface FormCheckboxProps {
  label: string
  checked?: boolean
  onChange: (checked: boolean) => void
  error?: string
  disabled?: boolean
  name: string
  className?: string
  containerClassName?: string
}

export const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ label, checked, onChange, error, disabled, name, className, containerClassName }, ref) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        <div className="flex items-center space-x-2">
          <Checkbox
            ref={ref}
            id={name}
            checked={checked}
            onCheckedChange={onChange}
            disabled={disabled}
            name={name}
            className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          <Label
            htmlFor={name}
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        </div>
        {error && (
          <p className="text-sm font-medium text-red-500" id={`${name}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormCheckbox.displayName = "FormCheckbox"
