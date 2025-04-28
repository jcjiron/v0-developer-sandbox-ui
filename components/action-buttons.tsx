"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSdk } from "@/hooks/use-sdk"

export function ActionButtons() {
  const { getUser, getCards, charge } = useSdk()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">SDK Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={getUser} className="bg-blue-600 hover:bg-blue-700">
              Get User
            </Button>
            <Button onClick={getCards} className="bg-blue-600 hover:bg-blue-700">
              Get Cards
            </Button>
            <Button onClick={charge} className="bg-blue-600 hover:bg-blue-700">
              Charge
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
