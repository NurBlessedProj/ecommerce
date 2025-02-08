"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Lock, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/user";
import { useCart } from "@/context/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { parsePhoneNumberFromString } from "libphonenumber-js"; // [[5]](#__5)

const FormError = ({ error }) => {
  if (!error) return null;
  return (
    <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>{error}</span>
    </div>
  );
};

const CheckoutPage = () => {
  const { user, isLoading: userLoading } = useUser();
  const { cart, cartTotal, loading: cartLoading } = useCart();
  const [countries, setCountries] = useState([]);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    zipCode: "",
    phone: "",
    country: "US", // ISO country code format
    receiveNews: false,
    saveInfo: false,
  });

  const router = useRouter();
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const formattedCountries = data
          .map((country) => {
            // Special handling for countries like US that have multiple suffixes
            let phoneCode = country.idd.root || "";

            // For countries like US, we only want the root code (+1)
            // Don't append suffix for countries that shouldn't have one
            if (country.cca2 === "US" || country.cca2 === "CA") {
              // Just use the root code for US and Canada
              phoneCode = country.idd.root;
            } else if (country.idd.suffixes?.length === 1) {
              // For countries with single suffix, append it
              phoneCode += country.idd.suffixes[0];
            }

            return {
              code: country.cca2,
              name: country.name.common,
              phoneCode: phoneCode,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("Failed to load country list");
      }
    };
    fetchCountries();
  }, []);
  // Phone number validation and formatting
  const validatePhoneNumber = (phoneNumber, countryCode) => {
    try {
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, countryCode);
      if (!parsedNumber) {
        return { isValid: false, formattedNumber: phoneNumber };
      }
      return {
        isValid: parsedNumber.isValid(),
        formattedNumber: parsedNumber.formatInternational(),
      };
    } catch (error) {
      return { isValid: false, formattedNumber: phoneNumber };
    }
  }; // [[3]](#__3)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === "checkbox" ? checked : value;

    // Clear the error for this field as user types
    setValidationErrors((prev) => ({
      ...prev,
      [name]: null,
    }));

    // Special handling for phone numbers
    if (name === "phone") {
      const { isValid, formattedNumber } = validatePhoneNumber(
        value,
        formData.country
      );
      if (!isValid && value.length > 0) {
        setValidationErrors((prev) => ({
          ...prev,
          phone: "Please enter a valid phone number",
        }));
      }
      finalValue = formattedNumber;
    }

    // Real-time email validation
    if (name === "email" && value.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setValidationErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    // ZIP code validation

    // Phone validation
    const { isValid } = validatePhoneNumber(formData.phone, formData.country);
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!isValid) {
      errors.phone =
        "Please enter a valid phone number for the selected country";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowErrorSummary(true);
      toast.error("Please correct the errors in the form");
      // Scroll to top where error summary is displayed
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const orderDetails = {
      items: cart,
      subtotal: cartTotal,
      shipping: "TBD",
      total: cartTotal,
      customerInfo: formData,
      userId: user.id,
      orderDate: new Date().toISOString(),
    };

    try {
      // Here you would typically send the order to your backend
      localStorage.setItem("pendingOrder", JSON.stringify(orderDetails));
      router.push("/payment");
    } catch (error) {
      toast.error("Failed to process order. Please try again.");
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login?redirect=/checkout");
      toast.error("Please login to continue checkout");
    }
  }, [user, userLoading, router]);
  useEffect(() => {
    // Only check after initial loading is complete
    if (!cartLoading && cart) {
      console.log("Cart state:", { cart, cartLoading, length: cart.length }); // Debug log

      // Add a small delay to ensure we have the latest cart data
      const timer = setTimeout(() => {
        if (cart.length === 0) {
          toast.error("Your cart is empty");
          router.push("/catalog");
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [cart, cartLoading, router]);

  const handleBack = () => {
    router.push("/cart");
  };

  console.log("Current cart state:", { cart, cartTotal, cartLoading }); // Add debug logs
  console.log("Debug state:", {
    user,
    userLoading,
    cart,
    cartLoading,
    cartLength: cart?.length,
  });

  // 1. First check loading states
  if (userLoading || cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Then check authentication
  if (!user) {
    router.push("/login?redirect=/checkout");
    return null;
  }

  // 3. Then check cart
  if (!cart || cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push("/catalog")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to details
          </button>

          {showErrorSummary && Object.keys(validationErrors).length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Please correct the following errors:
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {Object.entries(validationErrors).map(
                        ([field, error]) => (
                          <li key={field}>{error}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column - Form */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">itapelogroup</h1>
                <span className="text-sm text-gray-500">Checkout</span>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Contact</h2>
                  {!user && (
                    <p className="text-sm text-gray-600">
                      Have an account?{" "}
                      <a href="/login" className="text-blue-600">
                        Log in
                      </a>
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email || user.email}
                    onChange={handleInputChange}
                    placeholder="Email or mobile phone number"
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
      ${
        validationErrors.email && !user.email
          ? "border-red-500 bg-red-50"
          : "border-gray-300"
      }`}
                    required
                  />
                  {!user.email && <FormError error={validationErrors.email} />}
                </div>
              </div>

              {/* Delivery Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Delivery</h2>

                <div className="space-y-4">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.phoneCode})
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company (optional)"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FormError error={validationErrors.address} />

                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, etc."
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FormError error={validationErrors.apartment} />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FormError error={validationErrors.city} />

                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP code"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <FormError error={validationErrors.zipCode} />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FormError error={validationErrors.phone} />

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">
                      Save this information for next time
                    </span>
                  </label>
                </div>
              </div>

              {/* Shipping Method Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Shipping method</h2>
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-600">
                    Enter your shipping address to view available shipping
                    methods.
                  </p>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Payment</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <Lock className="w-4 h-4 mr-2" />
                    All transactions are secure and encrypted
                  </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-600">
                    This store can't accept payments right now.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700"
              >
                Complete Order
              </button>
            </form>

            {/* Right Column - Order Summary */}
            <div className="md:col-span-5 bg-gray-50 p-6 space-y-6">
              <h2 className="text-lg font-medium">Order summary</h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-start space-x-4"
                  >
                    <div className="relative w-20 h-20 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute -right-2 -top-2 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      {item.size && (
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              {/* Cost Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-sm">Enter shipping address</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>USD ${cartTotal.toFixed(2)}</span>
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

export default CheckoutPage;
