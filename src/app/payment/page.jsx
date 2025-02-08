"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://itapole-backend.onrender.com/api';

const CheckoutForm = ({ orderDetails, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        return;
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
        redirect: "if_required",
      });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent.status === "succeeded") {
        localStorage.removeItem("pendingOrder");
        localStorage.removeItem("cart");
        onSuccess();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-4 rounded-md flex items-center justify-center ${
          processing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white transition-colors`}
      >
        {processing ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span>Processing...</span>
          </div>
        ) : (
          `Pay $${orderDetails.total.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const initializePayment = async () => {
      const savedOrder = localStorage.getItem("pendingOrder");
      if (!savedOrder) {
        router.push("/checkout");
        return;
      }

      const order = JSON.parse(savedOrder);
      setOrderDetails(order);

      try {
        const response = await fetch(`${API_URL}/api/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: order.total }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error initializing payment:", error);
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [router]);

  const handlePaymentSuccess = () => {
    router.push("/order-success");
  };

  if (loading || !orderDetails || !clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
      </div>
    );
  }

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#2563eb',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">
              Please review your order and complete the payment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Payment Section */}
            <div className="md:col-span-7">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    orderDetails={orderDetails}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-5">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Customer Info */}
                <div className="mb-6 bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Shipping to:
                  </h3>
                  <p className="text-sm text-gray-600">
                    {orderDetails.customerInfo.firstName} {orderDetails.customerInfo.lastName}
                    <br />
                    {orderDetails.customerInfo.address}
                    <br />
                    {orderDetails.customerInfo.city}, {orderDetails.customerInfo.zipCode}
                    <br />
                    {orderDetails.customerInfo.country}
                  </p>
                </div>

                {/* Order Items */}
                <div className="space-y-3 pb-4 border-b">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 py-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>${orderDetails.shipping}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${orderDetails.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center text-sm text-gray-600 mt-4">
                  <Lock className="w-4 h-4 mr-2 text-green-500" />
                  <span>Payments are secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
