// src/context/cart.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      updateCartCount(parsedCart);
    }
  }, []);

  // Save cart to localStorage and update count whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(cart);
  }, [cart]);

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update cart count
  const updateCartCount = (currentCart) => {
    const count = currentCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // Add to cart - Fixed version
  const addToCart = (product, quantity = 1, size) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        // Update existing item
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity, size }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.size === size)
      )
    );
  };

  // Update quantity
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
