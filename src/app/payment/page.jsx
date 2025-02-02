"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  Gift,
  Apple,
  Bitcoin,
  Lock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CreditCardIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const orderItems = [
    {
      name: "Premium Subscription",
      price: 99.99,
      description: "Annual membership",
      image: "/product-image.jpg", // Add your product image path
    },
    {
      name: "Service Fee",
      price: 2.99,
      description: "Processing fee",
    },
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    // Handle success/error state here
  };

  const calculateTotal = () => {
    return orderItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Credit Card",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Pay with Visa, Mastercard, or American Express",
    },
    {
      id: "apple",
      name: "Apple Pay",
      icon: <Apple className="w-6 h-6" />,
      description: "Fast and secure payment with Apple Pay",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M20.067 8.478c.492.315.844.825.983 1.46a6.378 6.378 0 0 1-.545 3.692 5.48 5.48 0 0 1-1.716 2.314c-.68.535-1.48.926-2.34 1.14-.86.215-1.75.322-2.648.322h-.261a.738.738 0 0 0-.728.621l-.524 3.323-.152.964a.397.397 0 0 1-.393.334H8.8a.384.384 0 0 1-.38-.443l2.256-14.3a.64.64 0 0 1 .632-.534h4.558c.898 0 1.67.172 2.301.516z" />
          <path d="M9.425 7.83a.642.642 0 0 0-.633.534L6.536 22.664a.384.384 0 0 0 .38.443h2.944c.217 0 .4-.157.432-.37l.523-3.322a.738.738 0 0 1 .729-.621h.26c.899 0 1.788-.107 2.648-.322.86-.214 1.66-.605 2.34-1.14a5.48 5.48 0 0 0 1.716-2.314 6.378 6.378 0 0 0 .545-3.692 2.38 2.38 0 0 0-.983-1.46c-.63-.344-1.403-.516-2.3-.516H9.425z" />
        </svg>
      ),
      description: "Pay with your PayPal account",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: <Bitcoin className="w-6 h-6" />,
      description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
    },
  ];
  

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
              <p className="text-gray-600 mt-2">
                Complete your purchase securely
              </p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedMethod === method.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {method.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          {method.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Details Form */}
            {selectedMethod === "card" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength="19"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                      />
                      <div className="absolute right-4 top-3">
                        <div className="flex space-x-2">
                          <img
                            src="https://www.svgrepo.com/show/349506/visa.svg"
                            alt="Visa"
                            className="h-6"
                          />
                          <img
                            src="https://www.svgrepo.com/show/349495/mastercard.svg"
                            alt="Mastercard"
                            className="h-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
                        maxLength="5"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, ""))
                        }
                        maxLength="4"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Pay ${calculateTotal()}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Other Payment Methods */}
            {selectedMethod !== "card" && (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Click the button below to continue with {selectedMethod}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue with {selectedMethod}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="lg:max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Mobile Toggle */}
              <button
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="w-full px-6 py-4 flex items-center justify-between lg:hidden bg-gray-50"
              >
                <span className="font-medium text-gray-900">Order Summary</span>
                {showOrderSummary ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              <div
                className={`${
                  showOrderSummary ? "block" : "hidden"
                } lg:block`}
              >
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          {item.image && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Secure Payment
                        </p>
                        <p className="text-xs text-gray-500">
                          Your payment information is encrypted and secure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Have a promo code?
                    </p>
                    <p className="text-sm text-gray-500">
                      Enter it at checkout to get a discount
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Wallet className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Money-back</p>
                    <p className="text-sm text-gray-500">
                      30-day money-back guarantee
                    </p>
                  </div>
                </div>
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
