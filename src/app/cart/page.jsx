"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart";
import Navbar from "@/components/Navbar"; // Adjust import path as needed
import Footer from "@/components/Footer"; // Adjust import path as needed
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items yet
          </p>
          <Link
            href="/catalog"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-[1350px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    Size: {item.size}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="p-1 border rounded hover:border-blue-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="p-1 border rounded hover:border-blue-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 p-6 border rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  window.location.href = "/checkout";
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/catalog"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
