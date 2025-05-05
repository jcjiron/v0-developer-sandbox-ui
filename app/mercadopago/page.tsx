"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MercadoPagoDocumentationPage() {
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
          <h1 className="text-3xl font-bold">MercadoPago Sandbox Documentation</h1>
          <a
            href="https://developers.mercadopago.com/"
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
              <CardTitle>Introduction to MercadoPago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                MercadoPago is one of Latin America's leading payment platforms, owned by MercadoLibre. It's
                particularly dominant in countries like Argentina, Brazil, Mexico, Colombia, Chile, and Peru.
              </p>
              <p>
                The platform offers a comprehensive payment solution with features including multiple payment methods,
                customizable checkout options, subscription management, split payments for marketplaces, regional
                compliance, and anti-fraud protection.
              </p>
            </CardContent>
          </Card>

          {/* MercadoPago Sandbox Environment */}
          <Card>
            <CardHeader>
              <CardTitle>MercadoPago Sandbox Environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                MercadoPago provides a sandbox environment that allows developers to test integrations without
                processing real transactions. The sandbox includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Test accounts</strong>: Create and manage test seller and buyer accounts
                </li>
                <li>
                  <strong>Test credentials</strong>: Access to test API keys and tokens
                </li>
                <li>
                  <strong>Payment simulation</strong>: Test various payment methods and scenarios
                </li>
                <li>
                  <strong>Regional testing</strong>: Simulate payments across different Latin American countries
                </li>
                <li>
                  <strong>Webhook testing</strong>: Test notification events and callbacks
                </li>
                <li>
                  <strong>Error simulation</strong>: Test different error scenarios and edge cases
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Setting Up MercadoPago Sandbox */}
          <Card>
            <CardHeader>
              <CardTitle>Setting Up MercadoPago Sandbox</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ol className="list-decimal pl-5 space-y-4">
                <li>
                  <h3 className="text-lg font-semibold">Create a MercadoPago developer account</h3>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      Visit{" "}
                      <a
                        href="https://developers.mercadopago.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        MercadoPago Developers
                      </a>
                    </li>
                    <li>Sign up for a developer account</li>
                  </ul>
                </li>

                <li>
                  <h3 className="text-lg font-semibold">Access test credentials</h3>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Navigate to the dashboard</li>
                    <li>Go to "Credentials" section</li>
                    <li>Switch to "Test Mode" to get your test API keys</li>
                  </ul>
                </li>

                <li>
                  <h3 className="text-lg font-semibold">Test credit cards</h3>
                  <p className="mt-2 mb-3">MercadoPago provides test card numbers for different scenarios:</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Card Type</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Number</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">CVV</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">
                            Expiration Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-3 px-4 text-sm">Mastercard</td>
                          <td className="py-3 px-4 text-sm font-mono">5031 7557 3453 0604</td>
                          <td className="py-3 px-4 text-sm">123</td>
                          <td className="py-3 px-4 text-sm">11/25</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm">Visa</td>
                          <td className="py-3 px-4 text-sm font-mono">4509 9535 6623 3704</td>
                          <td className="py-3 px-4 text-sm">123</td>
                          <td className="py-3 px-4 text-sm">11/25</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm">American Express</td>
                          <td className="py-3 px-4 text-sm font-mono">3711 8030 3257 522</td>
                          <td className="py-3 px-4 text-sm">1234</td>
                          <td className="py-3 px-4 text-sm">11/25</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3">You can also simulate different payment outcomes:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>For approved payments: Use any card with security code 123</li>
                    <li>For rejected payments: Use security code 126</li>
                  </ul>
                </li>

                <li>
                  <h3 className="text-lg font-semibold">Test users</h3>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Create test users through the API to simulate buyer and seller interactions</li>
                    <li>Test users can only operate in the sandbox environment</li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Basic Integration Example */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Integration Example</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>Here's a simple example of integrating MercadoPago Checkout Pro in JavaScript:</p>

              <h3 className="text-lg font-semibold">Frontend Integration</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<!-- Add MercadoPago SDK -->
<script src="https://sdk.mercadopago.com/js/v2"></script>

<script>
  // Initialize the MercadoPago object with your public key
  const mp = new MercadoPago('TEST-public-key', {
    locale: 'en-US'
  });

  // Initialize checkout
  const checkout = mp.checkout({
    preference: {
      id: 'YOUR_PREFERENCE_ID'  // This comes from your backend
    },
    render: {
      container: '.checkout-button',
      label: 'Pay'
    }
  });
</script>`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<!-- Add MercadoPago SDK -->
<script src="https://sdk.mercadopago.com/js/v2"></script>

<script>
  // Initialize the MercadoPago object with your public key
  const mp = new MercadoPago('TEST-public-key', {
    locale: 'en-US'
  });

  // Initialize checkout
  const checkout = mp.checkout({
    preference: {
      id: 'YOUR_PREFERENCE_ID'  // This comes from your backend
    },
    render: {
      container: '.checkout-button',
      label: 'Pay'
    }
  });
</script>`,
                      "frontend",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "frontend" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <h3 className="text-lg font-semibold">Backend Integration (Node.js)</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`// Import the MercadoPago SDK
const mercadopago = require('mercadopago');

// Configure with your access token
mercadopago.configure({
  access_token: 'TEST-access-token'
});

// Create a preference
const createPreference = async () => {
  const preference = {
    items: [
      {
        title: 'My product',
        unit_price: 100,
        quantity: 1,
      }
    ],
    back_urls: {
      success: "https://www.your-site.com/success",
      failure: "https://www.your-site.com/failure",
      pending: "https://www.your-site.com/pending"
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return response.body.id;
  } catch (error) {
    console.log(error);
  }
};`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `// Import the MercadoPago SDK
const mercadopago = require('mercadopago');

// Configure with your access token
mercadopago.configure({
  access_token: 'TEST-access-token'
});

// Create a preference
const createPreference = async () => {
  const preference = {
    items: [
      {
        title: 'My product',
        unit_price: 100,
        quantity: 1,
      }
    ],
    back_urls: {
      success: "https://www.your-site.com/success",
      failure: "https://www.your-site.com/failure",
      pending: "https://www.your-site.com/pending"
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return response.body.id;
  } catch (error) {
    console.log(error);
  }
};`,
                      "backend",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "backend" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <h3 className="text-lg font-semibold">React Integration Example</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`import { useEffect, useState } from 'react';

function MercadoPagoCheckout({ preferenceId }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    // Load MercadoPago SDK
    const script = document.createElement('script');
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => setIsSDKLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isSDKLoaded && preferenceId) {
      // Initialize MercadoPago
      const mp = new window.MercadoPago('TEST-public-key', {
        locale: 'en-US'
      });

      // Render checkout button
      mp.checkout({
        preference: {
          id: preferenceId
        },
        render: {
          container: '.checkout-button',
          label: 'Pay with MercadoPago',
        }
      });
    }
  }, [isSDKLoaded, preferenceId]);

  return (
    <div>
      <h2>Complete your purchase</h2>
      <div className="checkout-button"></div>
    </div>
  );
}

export default MercadoPagoCheckout;`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `import { useEffect, useState } from 'react';

function MercadoPagoCheckout({ preferenceId }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    // Load MercadoPago SDK
    const script = document.createElement('script');
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => setIsSDKLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isSDKLoaded && preferenceId) {
      // Initialize MercadoPago
      const mp = new window.MercadoPago('TEST-public-key', {
        locale: 'en-US'
      });

      // Render checkout button
      mp.checkout({
        preference: {
          id: preferenceId
        },
        render: {
          container: '.checkout-button',
          label: 'Pay with MercadoPago',
        }
      });
    }
  }, [isSDKLoaded, preferenceId]);

  return (
    <div>
      <h2>Complete your purchase</h2>
      <div className="checkout-button"></div>
    </div>
  );
}

export default MercadoPagoCheckout;`,
                      "react",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "react" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Comparison with PayPal and Stripe */}
          <Card>
            <CardHeader>
              <CardTitle>Comparison with PayPal and Stripe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-lg font-semibold">MercadoPago vs PayPal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">MercadoPago Advantages</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Regional focus</strong>: Better adapted to Latin American markets and payment methods
                    </li>
                    <li>
                      <strong>Local payment methods</strong>: Supports region-specific options like Boleto in Brazil,
                      OXXO in Mexico
                    </li>
                    <li>
                      <strong>Local currencies</strong>: Native support for all Latin American currencies
                    </li>
                    <li>
                      <strong>Installment plans</strong>: Built-in support for installment payments (very common in
                      Latin America)
                    </li>
                    <li>
                      <strong>Cash payments</strong>: Strong support for cash payment options through local convenience
                      stores
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Limitations compared to PayPal</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Global reach</strong>: More limited global presence outside Latin America
                    </li>
                    <li>
                      <strong>Brand recognition</strong>: Less recognized globally than PayPal
                    </li>
                    <li>
                      <strong>Developer resources</strong>: Fewer third-party libraries and community resources
                    </li>
                    <li>
                      <strong>Documentation</strong>: Less comprehensive English documentation
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold">MercadoPago vs Stripe</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3">MercadoPago Advantages</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>
                        <strong>Latin American compliance</strong>: Built-in compliance with complex regional
                        regulations
                      </li>
                      <li>
                        <strong>Local payment methods</strong>: Native support for region-specific payment options
                      </li>
                      <li>
                        <strong>Cash payment integration</strong>: Better support for cash-based payment methods
                      </li>
                      <li>
                        <strong>Installment handling</strong>: Superior handling of installment payments with interest
                        calculations
                      </li>
                      <li>
                        <strong>Regional tax handling</strong>: Built-in support for complex tax scenarios in Latin
                        America
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3">Limitations compared to Stripe</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>
                        <strong>API design</strong>: Less elegant API design compared to Stripe
                      </li>
                      <li>
                        <strong>Developer experience</strong>: More complex integration process
                      </li>
                      <li>
                        <strong>Documentation quality</strong>: Less comprehensive and structured documentation
                      </li>
                      <li>
                        <strong>Testing tools</strong>: Fewer advanced testing and debugging tools
                      </li>
                      <li>
                        <strong>Global payment methods</strong>: Less support for global payment methods outside Latin
                        America
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* When to Choose MercadoPago */}
          <Card>
            <CardHeader>
              <CardTitle>When to Choose MercadoPago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>MercadoPago is the ideal choice when:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Your primary market is Latin America</strong>, especially Argentina, Brazil, Mexico, or
                  Colombia
                </li>
                <li>
                  <strong>You need to support local payment methods</strong> like Boleto Bancário, OXXO, or Rapipago
                </li>
                <li>
                  <strong>Installment payments are crucial</strong> for your business model
                </li>
                <li>
                  <strong>Cash payment options</strong> are important for your customer base
                </li>
                <li>
                  <strong>You need compliance with local regulations</strong> in Latin American countries
                </li>
                <li>
                  <strong>You want to leverage MercadoLibre's ecosystem</strong> for your e-commerce business
                </li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Developer tip:</strong> If you're targeting Latin American markets, consider using
                      MercadoPago alongside a global payment processor like Stripe or PayPal. This approach gives you
                      the best of both worlds: regional expertise for Latin America and global coverage for other
                      markets.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices for MercadoPago Sandbox Testing */}
          <Card>
            <CardHeader>
              <CardTitle>Best Practices for MercadoPago Sandbox Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Test all payment flows</strong>: Test successful payments, rejections, and pending scenarios
                </li>
                <li>
                  <strong>Test with different countries</strong>: Configure tests for each country you plan to operate
                  in
                </li>
                <li>
                  <strong>Test installment plans</strong>: Verify different installment options work correctly
                </li>
                <li>
                  <strong>Verify webhook notifications</strong>: Ensure your system properly handles all notification
                  types
                </li>
                <li>
                  <strong>Test error handling</strong>: Make sure your application gracefully handles payment failures
                </li>
                <li>
                  <strong>Test user experience</strong>: Verify the checkout flow is smooth across different devices
                </li>
              </ol>
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
                    href="https://developers.mercadopago.com/en/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    MercadoPago Developer Documentation
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.mercadopago.com/en/docs/checkout-pro/integrate-checkout-pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Checkout Pro Integration Guide
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.mercadopago.com/en/docs/checkout-api/integration-test/test-cards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Test Cards Documentation
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.mercadopago.com/en/docs/sdks-library/client-side/javascript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    JavaScript SDK Reference
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.mercadopago.com/en/docs/checkout-api/webhooks/webhooks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    Webhooks Documentation
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
