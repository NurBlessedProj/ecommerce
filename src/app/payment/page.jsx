"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  CreditCard,
  Smartphone,
  CheckCircle,
  Phone,
  Wallet,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentError, setPaymentError] = useState("");
  const [processing, setProcessing] = useState(false);

  // Form states for different payment methods
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const [mobileMoneyDetails, setMobileMoneyDetails] = useState({
    phoneNumber: "",
    provider: "mtn", // Default provider
  });

  const [orangeMoneyDetails, setOrangeMoneyDetails] = useState({
    phoneNumber: "",
  });

  useEffect(() => {
    const savedOrder = localStorage.getItem("pendingOrder");
    if (!savedOrder) {
      router.push("/checkout");
      return;
    }

    setOrderDetails(JSON.parse(savedOrder));
    setLoading(false);
  }, [router]);

  const handlePayment = async () => {
    setProcessing(true);
    setPaymentError("");

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear storage
      localStorage.removeItem("pendingOrder");
      localStorage.removeItem("cart");

      router.push("/order-success");
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentError("Payment processing failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay securely with your credit or debit card",
    },
    {
      id: "mobile-money",
      name: "Mobile Money",
      icon: Smartphone,
      description: "Pay using MTN or Airtel Mobile Money",
    },
    {
      id: "orange-money",
      name: "Orange Money",
      icon: Phone,
      description: "Pay using Orange Money",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">
              Please review your order and complete the payment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Payment Section */}
            <div className="md:col-span-7 space-y-6">
              {/* Order Review */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Order Review
                </h2>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 py-2 border-b last:border-b-0"
                    >
                      <div className="relative">
                        <img
                          src={item.images[0]?.url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.size && `Size: ${item.size} •`} Qty:{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-blue-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-blue-600" />
                  Payment Method
                </h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? "bg-blue-50 border-blue-500"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <input
                        type="radio"
                        id={method.id}
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <method.icon
                        className={`w-6 h-6 ${
                          paymentMethod === method.id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={method.id}
                          className="font-medium cursor-pointer"
                        >
                          {method.name}
                        </label>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Payment Method Forms */}
                  <div className="mt-6">
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              number: e.target.value,
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({
                                ...cardDetails,
                                expiry: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={cardDetails.cvc}
                            onChange={(e) =>
                              setCardDetails({
                                ...cardDetails,
                                cvc: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "mobile-money" && (
                      <div className="space-y-4">
                        <select
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={mobileMoneyDetails.provider}
                          onChange={(e) =>
                            setMobileMoneyDetails({
                              ...mobileMoneyDetails,
                              provider: e.target.value,
                            })
                          }
                        >
                          <option value="mtn">MTN Mobile Money</option>
                          <option value="airtel">Airtel Money</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={mobileMoneyDetails.phoneNumber}
                          onChange={(e) =>
                            setMobileMoneyDetails({
                              ...mobileMoneyDetails,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                    {paymentMethod === "orange-money" && (
                      <div className="space-y-4">
                        <input
                          type="tel"
                          placeholder="Orange Money Number"
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={orangeMoneyDetails.phoneNumber}
                          onChange={(e) =>
                            setOrangeMoneyDetails({
                              ...orangeMoneyDetails,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
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
                    {orderDetails.customerInfo.firstName}{" "}
                    {orderDetails.customerInfo.lastName}
                    <br />
                    {orderDetails.customerInfo.address}
                    <br />
                    {orderDetails.customerInfo.city},{" "}
                    {orderDetails.customerInfo.zipCode}
                    <br />
                    {orderDetails.customerInfo.country}
                  </p>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{orderDetails.shipping}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-blue-600">
                    USD ${orderDetails.total.toFixed(2)}
                  </span>
                </div>

                {/* Error Message */}
                {paymentError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {paymentError}
                  </div>
                )}

                {/* Security Note */}
                <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-md">
                  <Lock className="w-4 h-4 mr-2 text-green-500" />
                  <span>Payments are secure and encrypted</span>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className={`w-full py-4 rounded-md flex items-center justify-center space-x-2 ${
                    processing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white transition-colors`}
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Pay ${orderDetails.total.toFixed(2)}</span>
                  )}
                </button>
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
