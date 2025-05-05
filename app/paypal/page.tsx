"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PayPalDocumentationPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Simulator
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">PayPal Sandbox Documentation</h1>
          <a
            href="https://developer.paypal.com/docs/checkout/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            Official Docs
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Introduction to PayPal Sandbox</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                PayPal Sandbox is a testing environment that simulates the live PayPal production environment. It allows
                you to test your PayPal integration without using real money or affecting your live PayPal account.
              </p>
              <p>
                The Sandbox provides you with test accounts, both business (merchant) and personal (buyer), that you can
                use to simulate various scenarios and test your integration thoroughly before going live.
              </p>
            </CardContent>
          </Card>

          {/* Step 1: Create Sandbox Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Create Sandbox Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  Go to the{" "}
                  <a
                    href="https://developer.paypal.com/dashboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    PayPal Developer Dashboard
                  </a>
                </li>
                <li>Log in with your PayPal account or create a new one</li>
                <li>
                  Navigate to <strong>Sandbox</strong> &gt; <strong>Accounts</strong>
                </li>
                <li>
                  Create at least one Business account (for receiving payments) and one Personal account (for making
                  payments)
                </li>
                <li>Note down the email addresses and passwords for these accounts as you'll need them for testing</li>
              </ol>
            </CardContent>
          </Card>

          {/* Step 2: Create a PayPal App */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Create a PayPal App</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  In the{" "}
                  <a
                    href="https://developer.paypal.com/dashboard/applications/sandbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    PayPal Developer Dashboard
                  </a>
                  , go to <strong>Apps & Credentials</strong>
                </li>
                <li>
                  Click <strong>Create App</strong> under the Sandbox section
                </li>
                <li>Enter a name for your app and select the Business account you created earlier</li>
                <li>
                  Click <strong>Create App</strong>
                </li>
                <li>
                  Once created, you'll see your app's <strong>Client ID</strong> and <strong>Secret</strong>
                </li>
                <li>
                  The <strong>Client ID</strong> is what you'll need for your frontend integration
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Step 3: Integrate PayPal Checkout */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Integrate PayPal Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-lg font-semibold">Add the PayPal JavaScript SDK to your page</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>`,
                      "script",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "script" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <p>
                Replace <code>YOUR_CLIENT_ID</code> with the Client ID you obtained in Step 2. You can also add
                additional parameters like <code>currency</code>, <code>intent</code>, and <code>components</code>.
              </p>

              <h3 className="text-lg font-semibold">Add the PayPal Buttons to your page</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<div id="paypal-button-container"></div>

<script>
  paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '77.44' // Can reference variables or functions
          }
        }]
      });
    },
    
    // Finalize the transaction after payer approval
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        var transaction = orderData.purchase_units[0].payments.captures[0];
        alert('Transaction '+ transaction.status + ': ' + transaction.id);
      });
    }
  }).render('#paypal-button-container');
</script>`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<div id="paypal-button-container"></div>

<script>
  paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '77.44' // Can reference variables or functions
          }
        }]
      });
    },
    
    // Finalize the transaction after payer approval
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        var transaction = orderData.purchase_units[0].payments.captures[0];
        alert('Transaction '+ transaction.status + ': ' + transaction.id);
      });
    }
  }).render('#paypal-button-container');
</script>`,
                      "buttons",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "buttons" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Test Your Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Test Your Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-5 space-y-3">
                <li>Open your page with the PayPal buttons and click on one to start the checkout process</li>
                <li>You'll be redirected to the PayPal Sandbox login page</li>
                <li>Log in using one of your Sandbox Personal accounts (buyer accounts)</li>
                <li>Complete the payment process</li>
                <li>
                  You'll be redirected back to your site, and the <code>onApprove</code> callback will be triggered
                </li>
                <li>Check your Sandbox Business account to confirm that the payment was received</li>
              </ol>
            </CardContent>
          </Card>

          {/* Common Sandbox Test Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Common Sandbox Test Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                When testing in the Sandbox, you'll need to use test accounts. Here's where you would typically add your
                own Sandbox account credentials:
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> Replace these placeholders with your actual Sandbox account credentials.
                      Never share your real PayPal credentials in your code or documentation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold mb-2">Business Account (Merchant)</h4>
                  <p className="text-sm text-gray-600 mb-1">Email: sb-merchant@business.example.com</p>
                  <p className="text-sm text-gray-600">Password: [Your Sandbox merchant password]</p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-semibold mb-2">Personal Account (Buyer)</h4>
                  <p className="text-sm text-gray-600 mb-1">Email: sb-buyer@personal.example.com</p>
                  <p className="text-sm text-gray-600">Password: [Your Sandbox buyer password]</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://developer.paypal.com/docs/checkout/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    PayPal Checkout Documentation
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.paypal.com/docs/api/orders/v2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Orders API Reference
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.paypal.com/docs/business/checkout/configure-payments/single-page-app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Single-Page App Integration
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.paypal.com/docs/checkout/reference/customize-sdk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Customize the PayPal SDK
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
