"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSandbox } from "./sdk-context"

export function RequestResponsePanel() {
  const { requestResponse } = useSandbox()
  const { request, response } = requestResponse

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Request</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-auto max-h-[400px] min-h-[200px]">
            {request ? JSON.stringify(request, null, 2) : "No request data"}
          </pre>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Response</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-auto max-h-[400px] min-h-[200px]">
            {response ? JSON.stringify(response, null, 2) : "No response data"}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
