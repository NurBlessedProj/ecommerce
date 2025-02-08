"use client";
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const payment_intent = searchParams.get('payment_intent');
    if (payment_intent) {
      localStorage.removeItem('pendingOrder');
      localStorage.removeItem('cart');
    }
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors w-full"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
