"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActionSectionProps {
  title: string
  onAction: () => void
  actionLabel: string
  request: any
  response: any
}

export function ActionSection({ title, onAction, actionLabel, request, response }: ActionSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={onAction} className="bg-blue-600 hover:bg-blue-700">
          {actionLabel}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Request</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-auto max-h-[300px] min-h-[150px]">
              {request ? JSON.stringify(request, null, 2) : "No request data"}
            </pre>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-auto max-h-[300px] min-h-[150px]">
              {response ? JSON.stringify(response, null, 2) : "No response data"}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
