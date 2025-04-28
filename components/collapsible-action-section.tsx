"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, AlertTriangle } from "lucide-react"

interface CollapsibleActionSectionProps {
  moduleNumber: number
  title: string
  onAction: () => void
  actionLabel: string
  request: any
  response: any
  isLoading?: boolean
  hasError?: boolean
}

export function CollapsibleActionSection({
  moduleNumber,
  title,
  onAction,
  actionLabel,
  request,
  response,
  isLoading = false,
  hasError = false,
}: CollapsibleActionSectionProps) {
  const [isOpen, setIsOpen] = useState(true)
  const moduleId = `module-${moduleNumber}`
  const [requestJson, setRequestJson] = useState("")
  const [isValidJson, setIsValidJson] = useState(true)
  const [jsonError, setJsonError] = useState("")

  // Update the textarea when the request prop changes
  useEffect(() => {
    if (request) {
      setRequestJson(JSON.stringify(request, null, 2))
      setIsValidJson(true)
      setJsonError("")
    }
  }, [request])

  // Validate JSON when the user edits the textarea
  const handleRequestChange = (value: string) => {
    setRequestJson(value)
    try {
      if (value.trim()) {
        JSON.parse(value)
        setIsValidJson(true)
        setJsonError("")
      } else {
        setIsValidJson(false)
        setJsonError("Request cannot be empty")
      }
    } catch (error) {
      setIsValidJson(false)
      setJsonError(`Invalid JSON: ${(error as Error).message}`)
    }
  }

  // Determine response panel status class
  const getResponseStatusClass = () => {
    if (isLoading) return "border-blue-400 bg-blue-50"
    if (hasError) return "border-yellow-400 bg-yellow-50"
    if (response) return "border-green-400 bg-green-50"
    return ""
  }

  return (
    <Accordion type="single" collapsible defaultValue={moduleId} className="mb-6 border rounded-lg">
      <AccordionItem value={moduleId} className="border-none">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center text-left">
            <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-blue-600 text-white font-medium">
              {moduleNumber}
            </div>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="flex justify-end mb-4">
            <Button onClick={onAction} className="bg-blue-600 hover:bg-blue-700" disabled={isLoading || !isValidJson}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                actionLabel
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className={`h-full transition-all duration-300 ${!isValidJson ? "border-yellow-400 bg-yellow-50" : isLoading ? "border-blue-400 bg-blue-50" : ""}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Request (Editable)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <textarea
                    value={requestJson}
                    onChange={(e) => handleRequestChange(e.target.value)}
                    className={`w-full h-[300px] p-4 font-mono text-sm resize-none rounded-md focus:outline-none focus:ring-2 ${
                      !isValidJson
                        ? "border-yellow-400 bg-yellow-50 focus:ring-yellow-400"
                        : "border-gray-200 bg-gray-100 focus:ring-blue-400"
                    }`}
                    placeholder="Enter your JSON request here..."
                    disabled={isLoading}
                  />
                  {!isValidJson && (
                    <div className="mt-2 text-yellow-600 text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {jsonError}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className={`h-full transition-all duration-300 ${getResponseStatusClass()}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Response
                  {isLoading && (
                    <span className="text-blue-500 text-sm font-normal flex items-center">
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  )}
                  {hasError && !isLoading && <span className="text-yellow-600 text-sm font-normal">Error</span>}
                  {response && !isLoading && !hasError && (
                    <span className="text-green-600 text-sm font-normal">Success</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-auto h-[300px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  ) : response ? (
                    JSON.stringify(response, null, 2)
                  ) : (
                    "No response data"
                  )}
                </pre>
              </CardContent>
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
