"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const payment_intent = searchParams.get("payment_intent");
    if (payment_intent) {
      localStorage.removeItem("pendingOrder");
      localStorage.removeItem("cart");
    }
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100/50 text-center transform hover:scale-[1.01] transition-all duration-300">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="absolute -inset-1 bg-green-500/20 blur-2xl rounded-full opacity-50" />
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Payment Successful!
            </h1>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 leading-relaxed">
                Thank you for your purchase! Your order has been confirmed and
                will be shipped soon.
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  Order confirmation has been sent to your email.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push("/catalog")}
                className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Continue Shopping</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full bg-transparent text-gray-600 hover:text-gray-900 px-6 py-3 rounded-xl font-medium transition-colors duration-300 border border-gray-200 hover:border-gray-300"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const OrderSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
};

export default OrderSuccessPage;
