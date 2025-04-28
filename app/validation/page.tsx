"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ValidationPage() {
  const [projectName, setProjectName] = useState("Payment SDK Project")
  const [validationSteps, setValidationSteps] = useState([
    { name: "API Documentation", status: "completed" },
    { name: "Security Review", status: "in-progress" },
    { name: "Performance Testing", status: "pending" },
    { name: "Compliance Check", status: "pending" },
    { name: "Final Approval", status: "pending" },
  ])

  // Simulate progress in validation steps
  useEffect(() => {
    const timer = setTimeout(() => {
      setValidationSteps((prev) => {
        const inProgressIndex = prev.findIndex((step) => step.status === "in-progress")
        if (inProgressIndex !== -1 && inProgressIndex < prev.length - 1) {
          const newSteps = [...prev]
          newSteps[inProgressIndex] = { ...newSteps[inProgressIndex], status: "completed" }
          newSteps[inProgressIndex + 1] = { ...newSteps[inProgressIndex + 1], status: "in-progress" }
          return newSteps
        }
        return prev
      })
    }, 3000)

    return () => clearTimeout(timer)
  }, [validationSteps])

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sandbox
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Production Certification</h1>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{projectName}</h3>
                <p className="text-sm text-gray-500">
                  Submitted for certification on {new Date().toLocaleDateString()}
                </p>
              </div>
              <Badge className="bg-amber-500">Certification in Progress</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Certification Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {validationSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  {step.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  ) : step.status === "in-progress" ? (
                    <Clock className="w-5 h-5 text-amber-500 mr-3" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{step.name}</p>
                  </div>
                  <Badge
                    className={
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "in-progress"
                          ? "bg-amber-500"
                          : "bg-gray-300"
                    }
                  >
                    {step.status === "completed"
                      ? "Completed"
                      : step.status === "in-progress"
                        ? "In Progress"
                        : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                The certification process typically takes 3-5 business days. You will be notified via email once your
                API is approved for production use.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
