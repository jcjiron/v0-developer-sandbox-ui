import { SandboxProvider } from "@/components/sdk-context"
import Sandbox from "@/components/sandbox"

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">SDK Simulator</h1>
        <SandboxProvider>
          <Sandbox />
        </SandboxProvider>
      </div>
    </main>
  )
}
