"use client"

import { CheckoutLayout } from "@/components/checkout/checkout-layout"
import { SplitPanelLayout } from "@/components/checkout/split-panel-layout"
import { CheckoutContent } from "@/components/checkout/checkout-content"
import { SdkInspectorContent } from "@/components/sdk-inspector/sdk-inspector-content"

export default function CheckoutPage() {
  return (
    <CheckoutLayout>
      <SplitPanelLayout leftPanel={<SdkInspectorContent />} rightPanel={<CheckoutContent />} />
    </CheckoutLayout>
  )
}
