"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const RefundPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Refund Policy</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 space-y-8">
              {/* General Policy */}
              <section>
                <p className="text-gray-600 leading-relaxed">
                  We have a 15-day exchange or return policy, which means you
                  have 15 days after receiving your item to request an exchange
                  or return.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  To be eligible for an exchange or return, your item must be in
                  the same condition that you received it, unused, and in its
                  original packaging.
                </p>
              </section>

              {/* How to Start a Return */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Starting a Return
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To start an exchange or return, you can contact us at{" "}
                  <a
                    href="mailto:itapelogroup@gmail.com"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    itapelogroup@gmail.com
                  </a>
                  . If your exchange or return is accepted, we'll send you a
                  return shipping label, as well as instructions on how and
                  where to send your package.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Items sent back to us without first requesting a return will
                  not be accepted.
                </p>
              </section>

              {/* Damages and Issues */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Damages and Issues
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Please inspect your order upon reception and contact us
                  immediately if the item is defective, damaged or if you
                  receive the wrong item, so that we can evaluate the issue and
                  make it right.
                </p>
              </section>

              {/* Exceptions */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Exceptions / Non-Returnable Items
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Certain types of items cannot be exchanged or returned once
                  opened or used, including:
                </p>
                <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    Custom products (such as special orders or personalized
                    items)
                  </li>
                  <li>
                    Personal care goods (such as used or open beauty products)
                  </li>
                </ul>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Please get in touch if you have questions or concerns about
                  your specific item.
                </p>
              </section>

              {/* Exchanges and Refunds */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Exchanges / Refunds
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The fastest way to ensure you get what you want is to return
                  the item you have, and once the return is accepted, then you
                  can make an exchange. In situations where the item is damaged,
                  we offer exchanges or refunds.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Please remember it can take some time for your bank or credit
                  card company to process and post the refund.
                </p>
              </section>

              {/* Contact Information */}
              <section className="bg-gray-50 rounded-md p-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Need Help?
                </h2>
                <p className="text-gray-600">
                  You can always contact us for any return question at{" "}
                  <a
                    href="mailto:itapelogroup@gmail.com"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    itapelogroup@gmail.com
                  </a>
                </p>
              </section>

              {/* Thank You Note */}
              <section className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-600 italic">
                  Thank you so much for your business.
                </p>
              </section>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RefundPolicy;
