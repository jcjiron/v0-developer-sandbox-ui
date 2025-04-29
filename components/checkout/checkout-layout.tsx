"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SandboxProvider } from "@/components/sdk-context"

interface CheckoutLayoutProps {
  children: ReactNode
}

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Simulator
          </Link>
          <h1 className="text-xl font-bold">Checkout & SDK Inspector</h1>
          <div></div> {/* Empty div for flex alignment */}
        </div>
      </div>

      <SandboxProvider>{children}</SandboxProvider>
    </div>
  )
}
