"use client"

import type React from "react"

import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  containerClassName?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, containerClassName, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          id={inputId}
          className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p className="text-sm font-medium text-red-500" id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormInput.displayName = "FormInput"
