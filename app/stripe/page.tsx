"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StripeDocumentationPage() {
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
          <h1 className="text-3xl font-bold">Stripe Sandbox Documentation</h1>
          <a
            href="https://stripe.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            Official Docs
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Introduction to Stripe Testing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Stripe provides a comprehensive testing environment that allows you to simulate payment flows without
                using real money. You can test your integration thoroughly before going live with real transactions.
              </p>
              <p>
                Stripe's test mode is automatically activated when you use test API keys. All API requests made with
                test keys will only interact with test data and won't affect your live data or incur any charges.
              </p>
            </CardContent>
          </Card>

          {/* Step 1: Get Your API Keys */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Get Your API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  Sign up for a{" "}
                  <a
                    href="https://dashboard.stripe.com/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Stripe account
                  </a>{" "}
                  if you don't have one
                </li>
                <li>
                  Go to the{" "}
                  <a
                    href="https://dashboard.stripe.com/test/apikeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    API keys section
                  </a>{" "}
                  of your Stripe Dashboard
                </li>
                <li>
                  You'll see two types of API keys:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Publishable key</strong>: Starts with <code>pk_test_</code> and can be included in
                      frontend code
                    </li>
                    <li>
                      <strong>Secret key</strong>: Starts with <code>sk_test_</code> and must be kept secure on your
                      server
                    </li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Step 2: Add Stripe.js to Your Website */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Add Stripe.js to Your Website</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Stripe.js is Stripe's JavaScript library that helps you securely collect payment information in the
                browser.
              </p>

              <h3 className="text-lg font-semibold">Add the Stripe.js script to your page</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<script src="https://js.stripe.com/v3/"></script>`}
                </pre>
                <button
                  onClick={() => copyToClipboard(`<script src="https://js.stripe.com/v3/"></script>`, "script")}
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

              <h3 className="text-lg font-semibold">Initialize Stripe with your publishable key</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<script>
  // Initialize Stripe.js with your publishable key
  const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');
</script>`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<script>
  // Initialize Stripe.js with your publishable key
  const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');
</script>`,
                      "init",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "init" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Create a Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Create a Payment Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Stripe Elements is a set of pre-built UI components for building your checkout flow. It helps you create
                a payment form that securely collects card information.
              </p>

              <h3 className="text-lg font-semibold">HTML for your payment form</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<form id="payment-form">
  <div id="card-element">
    <!-- Elements will create input elements here -->
  </div>

  <!-- We'll put the error messages in this element -->
  <div id="card-errors" role="alert"></div>

  <button id="submit-button">Pay</button>
</form>`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<form id="payment-form">
  <div id="card-element">
    <!-- Elements will create input elements here -->
  </div>

  <!-- We'll put the error messages in this element -->
  <div id="card-errors" role="alert"></div>

  <button id="submit-button">Pay</button>
</form>`,
                      "form",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "form" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <h3 className="text-lg font-semibold">JavaScript to create and mount the card element</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`<script>
  // Create an instance of Elements
  const elements = stripe.elements();
  
  // Create and mount the Card Element
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');
  
  // Handle form submission
  const form = document.getElementById('payment-form');
  const submitButton = document.getElementById('submit-button');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Disable the submit button to prevent repeated clicks
    submitButton.disabled = true;
    
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    
    if (error) {
      // Display error message
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = error.message;
      submitButton.disabled = false;
    } else {
      // Send paymentMethod.id to your server
      const result = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: 1000, // $10.00 in cents
        }),
      }).then(r => r.json());
      
      // Handle server response
      handleServerResponse(result);
    }
  });
  
  function handleServerResponse(response) {
    if (response.error) {
      // Show error from server on payment form
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = response.error;
      submitButton.disabled = false;
    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        response.payment_intent_client_secret
      ).then(function(result) {
        if (result.error) {
          // Show error in payment form
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          submitButton.disabled = false;
        } else {
          // The card action has been handled
          // The PaymentIntent can be confirmed again on the server
          fetch('/confirm-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              payment_intent_id: result.paymentIntent.id
            })
          }).then(function(confirmResult) {
            return confirmResult.json();
          }).then(handleServerResponse);
        }
      });
    } else {
      // Show success message
      alert('Payment successful!');
    }
  }
</script>`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<script>
  // Create an instance of Elements
  const elements = stripe.elements();
  
  // Create and mount the Card Element
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');
  
  // Handle form submission
  const form = document.getElementById('payment-form');
  const submitButton = document.getElementById('submit-button');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Disable the submit button to prevent repeated clicks
    submitButton.disabled = true;
    
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    
    if (error) {
      // Display error message
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = error.message;
      submitButton.disabled = false;
    } else {
      // Send paymentMethod.id to your server
      const result = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: 1000, // $10.00 in cents
        }),
      }).then(r => r.json());
      
      // Handle server response
      handleServerResponse(result);
    }
  });
  
  function handleServerResponse(response) {
    if (response.error) {
      // Show error from server on payment form
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = response.error;
      submitButton.disabled = false;
    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        response.payment_intent_client_secret
      ).then(function(result) {
        if (result.error) {
          // Show error in payment form
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          submitButton.disabled = false;
        } else {
          // The card action has been handled
          // The PaymentIntent can be confirmed again on the server
          fetch('/confirm-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              payment_intent_id: result.paymentIntent.id
            })
          }).then(function(confirmResult) {
            return confirmResult.json();
          }).then(handleServerResponse);
        }
      });
    } else {
      // Show success message
      alert('Payment successful!');
    }
  }
</script>`,
                      "js",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "js" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Test Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Test Cards and Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium text-purple-700">
                Stripe provides a set of test card numbers that you can use to simulate different scenarios without
                charging real cards.
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Card Number</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Brand</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">CVC</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 px-4 text-sm font-mono">4242 4242 4242 4242</td>
                      <td className="py-3 px-4 text-sm">Visa</td>
                      <td className="py-3 px-4 text-sm">Any 3 digits</td>
                      <td className="py-3 px-4 text-sm">Any future date</td>
                      <td className="py-3 px-4 text-sm">Successful payment</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-mono">4000 0025 0000 3155</td>
                      <td className="py-3 px-4 text-sm">Visa</td>
                      <td className="py-3 px-4 text-sm">Any 3 digits</td>
                      <td className="py-3 px-4 text-sm">Any future date</td>
                      <td className="py-3 px-4 text-sm">Requires authentication (3D Secure)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-mono">4000 0000 0000 9995</td>
                      <td className="py-3 px-4 text-sm">Visa</td>
                      <td className="py-3 px-4 text-sm">Any 3 digits</td>
                      <td className="py-3 px-4 text-sm">Any future date</td>
                      <td className="py-3 px-4 text-sm">Declined payment (insufficient funds)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-mono">4000 0000 0000 0002</td>
                      <td className="py-3 px-4 text-sm">Visa</td>
                      <td className="py-3 px-4 text-sm">Any 3 digits</td>
                      <td className="py-3 px-4 text-sm">Any future date</td>
                      <td className="py-3 px-4 text-sm">Card declined (generic decline)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-mono">5555 5555 5555 4444</td>
                      <td className="py-3 px-4 text-sm">Mastercard</td>
                      <td className="py-3 px-4 text-sm">Any 3 digits</td>
                      <td className="py-3 px-4 text-sm">Any future date</td>
                      <td className="py-3 px-4 text-sm">Successful payment</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-mono">3782 822463 10005</td>
                      <td className="py-3 px-4 text-sm">American Express</td>
                      <td className="py-3 px-4 text-sm">Any 4 digits</td>
                      <td className="py-3 px-4 text-sm">Any future date</td>
                      <td className="py-3 px-4 text-sm">Successful payment</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      <strong>Tip:</strong> For testing, you can use any future expiration date, any 3-digit CVC (4
                      digits for American Express), and any postal code.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Specific Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle>Testing Specific Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Stripe provides specific test card numbers to simulate various payment scenarios. Here are some common
                ones:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-semibold mb-2">International Cards</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-mono">4000 0000 0000 0127</span> - International card (non-U.S.)
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-mono">4000 0000 0000 0101</span> - International card requiring a zip code
                  </p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-semibold mb-2">Authentication</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-mono">4000 0027 6000 3184</span> - 3D Secure authentication required
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-mono">4000 0082 6000 3178</span> - 3D Secure authentication fails
                  </p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-semibold mb-2">Specific Errors</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-mono">4000 0000 0000 0069</span> - Expired card
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-mono">4000 0000 0000 0127</span> - Incorrect CVC
                  </p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-semibold mb-2">Payment Methods</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-mono">6011 1111 1111 1117</span> - Discover card
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-mono">3056 9309 0259 04</span> - Diners Club
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client-side Implementation with Checkout */}
          <Card>
            <CardHeader>
              <CardTitle>Client-side Implementation with Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Stripe offers Checkout, a pre-built solution that handles payment information collection and validation
                for you.
              </p>

              <h3 className="text-lg font-semibold">Implementation with Stripe Checkout</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`// First, include the Stripe.js script
// <script src="https://js.stripe.com/v3/"></script>

// Then, initialize Stripe with your publishable key
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

// Set up the payment button
document.getElementById('checkout-button').addEventListener('click', function() {
  // Create a Checkout Session
  stripe.redirectToCheckout({
    lineItems: [
      {
        price: 'price_1234', // Price ID defined in your Stripe dashboard
        quantity: 1,
      },
    ],
    mode: 'payment',
    successUrl: 'https://your-website.com/success',
    cancelUrl: 'https://your-website.com/cancel',
  })
  .then(function (result) {
    if (result.error) {
      // If there's an error, display it in the console
      console.error(result.error.message);
    }
  });
});`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `// First, include the Stripe.js script
// <script src="https://js.stripe.com/v3/"></script>

// Then, initialize Stripe with your publishable key
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

// Set up the payment button
document.getElementById('checkout-button').addEventListener('click', function() {
  // Create a Checkout Session
  stripe.redirectToCheckout({
    lineItems: [
      {
        price: 'price_1234', // Price ID defined in your Stripe dashboard
        quantity: 1,
      },
    ],
    mode: 'payment',
    successUrl: 'https://your-website.com/success',
    cancelUrl: 'https://your-website.com/cancel',
  })
  .then(function (result) {
    if (result.error) {
      // If there's an error, display it in the console
      console.error(result.error.message);
    }
  });
});`,
                      "checkout",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "checkout" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <h3 className="text-lg font-semibold">Implementation with Elements and Payment Intents API</h3>
              <p>
                For a more customized payment experience, you can use Stripe Elements together with the Payment Intents
                API:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md relative">
                <pre className="font-mono text-sm overflow-x-auto">
                  {`// Assume you already have Stripe initialized
// const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

// Get the client secret from your backend
// This value would normally be generated on your server
const clientSecret = 'pi_1234_secret_5678';

// Create a card element
const elements = stripe.elements();
const cardElement = elements.create('card', {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
});

// Mount the card element to the DOM
cardElement.mount('#card-element');

// Handle real-time validation
cardElement.on('change', function(event) {
  const displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: document.getElementById('name').value
      }
    }
  });

  if (error) {
    // Show error to the customer
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    // The payment has been processed!
    if (paymentIntent.status === 'succeeded') {
      // Show a success message or redirect the user
      alert('Payment successful!');
    }
  }
});`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `// Assume you already have Stripe initialized
// const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

// Get the client secret from your backend
// This value would normally be generated on your server
const clientSecret = 'pi_1234_secret_5678';

// Create a card element
const elements = stripe.elements();
const cardElement = elements.create('card', {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
});

// Mount the card element to the DOM
cardElement.mount('#card-element');

// Handle real-time validation
cardElement.on('change', function(event) {
  const displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent =  {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: document.getElementById('name').value
      }
    }
  });

  if (error) {
    // Show error to the customer
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    // The payment has been processed!
    if (paymentIntent.status === 'succeeded') {
      // Show a success message or redirect the user
      alert('Payment successful!');
    }
  }
});`,
                      "elements",
                    )
                  }
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-700"
                  aria-label="Copy code"
                >
                  {copied === "elements" ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      <strong>Note:</strong> In a production environment, the client secret should be generated on your
                      server using your Stripe secret key. Never expose your secret key in the frontend.
                    </p>
                  </div>
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
                    href="https://stripe.com/docs/testing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center"
                  >
                    Stripe Testing Documentation
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://stripe.com/docs/js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center"
                  >
                    Stripe.js Reference
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://stripe.com/docs/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center"
                  >
                    Stripe API Reference
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://stripe.com/docs/payments/accept-a-payment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center"
                  >
                    Accept a Payment Guide
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/stripe-samples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline flex items-center"
                  >
                    Stripe Sample Projects
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Comparativa de Sandbox */}
          <Card>
            <CardHeader>
              <CardTitle>Stripe Sandbox vs PayPal Sandbox</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                When choosing a payment gateway, understanding the differences between testing environments is crucial
                for efficient development. Here's a comparison between Stripe and PayPal sandboxes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-700 mb-3">Stripe Sandbox Advantages</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Simple setup</strong>: Immediate activation of test mode by simply switching between
                      production and test keys.
                    </li>
                    <li>
                      <strong>Specific test cards</strong>: Numbers like 4242 4242 4242 4242 to simulate different
                      scenarios.
                    </li>
                    <li>
                      <strong>Advanced debugging tools</strong>: Complete test dashboard with detailed logs.
                    </li>
                    <li>
                      <strong>Stripe CLI</strong>: Allows testing webhooks locally without exposing ports.
                    </li>
                    <li>
                      <strong>Comprehensive documentation</strong>: Clear examples for each test scenario.
                    </li>
                    <li>
                      <strong>Stability</strong>: Test environment always available and reliable.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">Limitations Compared to PayPal</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>Lower brand recognition</strong>: PayPal has greater recognition among consumers.
                    </li>
                    <li>
                      <strong>Different user experience</strong>: Stripe integrates into your site, while PayPal offers
                      a familiar experience for many users.
                    </li>
                    <li>
                      <strong>Geographic coverage</strong>: PayPal is available in more countries than Stripe.
                    </li>
                    <li>
                      <strong>User accounts</strong>: PayPal allows testing with complete user accounts, better
                      simulating the real experience.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      <strong>Developer tip:</strong> Stripe is generally preferred by development teams for its cleaner
                      API, better documentation, and more robust testing tools. If development speed and flexibility are
                      priorities, Stripe offers significant advantages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">When to Choose Stripe?</h3>
                <p>Stripe is ideal for:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Teams with technical capabilities who value a well-designed API</li>
                  <li>Projects that require advanced customization of the payment flow</li>
                  <li>Business models based on subscriptions or recurring payments</li>
                  <li>Startups and companies that need to iterate quickly</li>
                  <li>Applications that require an integrated payment experience without redirects</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
