"use client"

import type React from "react"

import { useState, useCallback } from "react"

export type FieldValues = Record<string, any>
export type ValidationRules<T extends FieldValues> = Partial<{
  [K in keyof T]: {
    required?: boolean | string
    pattern?: { value: RegExp; message: string }
    minLength?: { value: number; message: string }
    maxLength?: { value: number; message: string }
    min?: { value: number; message: string }
    max?: { value: number; message: string }
    validate?: (value: T[K], formValues: T) => string | boolean | Promise<string | boolean>
  }
}>

export type FormErrors<T extends FieldValues> = Partial<Record<keyof T, string>>

export interface UseFormReturn<T extends FieldValues> {
  values: T
  errors: FormErrors<T>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  setValue: (name: keyof T, value: any) => void
  setValues: (values: Partial<T>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>
  reset: () => void
  clearErrors: () => void
  setError: (name: keyof T, error: string) => void
}

export function useForm<T extends FieldValues>({
  initialValues,
  validationRules = {},
  validateOnChange = true,
  validateOnBlur = true,
}: {
  initialValues: T
  validationRules?: ValidationRules<T>
  validateOnChange?: boolean
  validateOnBlur?: boolean
}): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Function to set a single form value
  const setValue = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => {
        const newValues = { ...prev, [name]: value }
        setIsDirty(JSON.stringify(newValues) !== JSON.stringify(initialValues))
        return newValues
      })
    },
    [initialValues],
  )

  // Function to set multiple form values
  const setFormValues = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => {
        const updatedValues = { ...prev, ...newValues }
        setIsDirty(JSON.stringify(updatedValues) !== JSON.stringify(initialValues))
        return updatedValues
      })
    },
    [initialValues],
  )

  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target

      // Handle different input types
      let parsedValue: any = value
      if (type === "number" || type === "range") {
        parsedValue = value === "" ? "" : Number(value)
      } else if (type === "checkbox") {
        parsedValue = (e.target as HTMLInputElement).checked
      }

      setValue(name as keyof T, parsedValue)

      // Validate on change if enabled
      if (validateOnChange && touched[name as keyof T]) {
        validateField(name as keyof T, parsedValue)
      }
    },
    [setValue, validateOnChange, touched],
  )

  // Handle input blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name } = e.target
      setTouched((prev) => ({ ...prev, [name]: true }))

      // Validate on blur if enabled
      if (validateOnBlur) {
        validateField(name as keyof T, values[name as keyof T])
      }
    },
    [validateOnBlur, values],
  )

  // Validate a single field
  const validateField = useCallback(
    async (name: keyof T, value: any): Promise<string | null> => {
      const rules = validationRules[name]
      if (!rules) return null

      // Check required
      if (rules.required) {
        const isEmpty = value === undefined || value === null || value === ""
        if (isEmpty) {
          const message = typeof rules.required === "string" ? rules.required : `${String(name)} is required`
          setErrors((prev) => ({ ...prev, [name]: message }))
          return message
        }
      }

      // Check pattern
      if (rules.pattern && value) {
        if (!rules.pattern.value.test(String(value))) {
          setErrors((prev) => ({ ...prev, [name]: rules.pattern!.message }))
          return rules.pattern.message
        }
      }

      // Check minLength
      if (rules.minLength && typeof value === "string") {
        if (value.length < rules.minLength.value) {
          setErrors((prev) => ({ ...prev, [name]: rules.minLength!.message }))
          return rules.minLength.message
        }
      }

      // Check maxLength
      if (rules.maxLength && typeof value === "string") {
        if (value.length > rules.maxLength.value) {
          setErrors((prev) => ({ ...prev, [name]: rules.maxLength!.message }))
          return rules.maxLength.message
        }
      }

      // Check min
      if (rules.min && typeof value === "number") {
        if (value < rules.min.value) {
          setErrors((prev) => ({ ...prev, [name]: rules.min!.message }))
          return rules.min.message
        }
      }

      // Check max
      if (rules.max && typeof value === "number") {
        if (value > rules.max.value) {
          setErrors((prev) => ({ ...prev, [name]: rules.max!.message }))
          return rules.max.message
        }
      }

      // Custom validation
      if (rules.validate) {
        const result = await rules.validate(value, values)
        if (typeof result === "string") {
          setErrors((prev) => ({ ...prev, [name]: result }))
          return result
        } else if (result === false) {
          const message = `${String(name)} is invalid`
          setErrors((prev) => ({ ...prev, [name]: message }))
          return message
        }
      }

      // Clear error if validation passes
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })

      return null
    },
    [validationRules, values],
  )

  // Validate all fields
  const validateForm = useCallback(async (): Promise<boolean> => {
    const newErrors: FormErrors<T> = {}
    let isValid = true

    // Mark all fields as touched
    const touchedFields: Partial<Record<keyof T, boolean>> = {}
    Object.keys(values).forEach((key) => {
      touchedFields[key as keyof T] = true
    })
    setTouched(touchedFields)

    // Validate each field with rules
    for (const name in validationRules) {
      const error = await validateField(name as keyof T, values[name as keyof T])
      if (error) {
        newErrors[name as keyof T] = error
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }, [validateField, validationRules, values])

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>) => {
      return async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
          const isValid = await validateForm()
          if (isValid) {
            await onSubmit(values)
          }
        } catch (error) {
          console.error("Form submission error:", error)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [validateForm, values],
  )

  // Reset form to initial values
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
    setIsDirty(false)
  }, [initialValues])

  // Clear all form errors
  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  // Set a specific error
  const setError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }))
  }, [])

  // Determine if the form is valid (no errors)
  const isValid = Object.keys(errors).length === 0

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    isValid,
    setValue,
    setValues: setFormValues,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    clearErrors,
    setError,
  }
}
