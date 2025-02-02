"use client"
import React, { useEffect, useState } from 'react';
import { ChevronDown, Lock, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // First try to get stored checkout data
    const storedCheckoutData = localStorage.getItem('checkoutData');
    
    if (storedCheckoutData) {
      // If we have stored checkout data, use it
      const checkoutData = JSON.parse(storedCheckoutData);
      setCartItems([checkoutData]);
      
      // Calculate initial subtotal
      setSubtotal(checkoutData.totalPrice);
    } else {
      // Fallback to URL parameters if no stored data
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('productId');
      const quantity = parseInt(urlParams.get('quantity') || '1');
      const size = urlParams.get('size') || '';

      // If we have a product ID in the URL
      if (productId) {
        const product = productData.find(p => p.id === parseInt(productId));
        if (product) {
          const cartItem = {
            ...product,
            quantity,
            size,
            totalPrice: product.price * quantity
          };
          setCartItems([cartItem]);
          setSubtotal(cartItem.totalPrice);
        }
      } else {
        // Try to get cart items from localStorage as last resort
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
          // Calculate total from cart items
          const total = parsedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          setSubtotal(total);
        }
      }
    }

    // Clean up stored checkout data
    return () => {
      localStorage.removeItem('checkoutData');
    };
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    phone: '',
    country: 'United States',
    receiveNews: false,
    saveInfo: false
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form Data:', formData);
    console.log('Order Details:', {
      items: cartItems,
      subtotal,
      shipping: 'TBD',
      total: subtotal // Add shipping cost when implemented
    });
  };

  // Handle back navigation
  const handleBack = () => {
    window.history.back();
  };

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
                <p className="text-sm text-gray-600">
                  Have an account? <a href="/login" className="text-blue-600">Log in</a>
                </p>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email or mobile phone number"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="receiveNews"
                    checked={formData.receiveNews}
                    onChange={handleInputChange}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm">Email me with news and offers</span>
                </label>
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
                  <option value="United States">United States</option>
                  {/* Add more countries as needed */}
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
                  required
                />

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, etc."
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
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

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="rounded text-blue-600"
                  />
                  <span className="text-sm">Save this information for next time</span>
                </label>
              </div>
            </div>

            {/* Shipping Method Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Shipping method</h2>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-600">Enter your shipping address to view available shipping methods.</p>
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
                <p className="text-sm text-gray-600">This store can't accept payments right now.</p>
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
            
            {/* Products */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-4">
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
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Cost Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-sm">Enter shipping address</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>USD ${subtotal.toFixed(2)}</span>
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