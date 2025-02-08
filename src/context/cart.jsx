"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "./user";

const CartContext = createContext();
const NEXT_PUBLIC_API_URL = "https://itapole-backend.onrender.com/api";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  // Update cart count whenever cart changes - using cart.length instead
  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/cart?userId=${user.id}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      setCart(data.items || []);
    } catch (error) {
      toast.error("Failed to load cart");
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }

    try {
      // First check if the item already exists in the cart
      const existingItem = cart.find((item) => item.productId === product.id);
      const newQuantity = existingItem
        ? existingItem.quantity + parseInt(quantity)
        : parseInt(quantity);

      // Validate quantity
      if (newQuantity > 10) {
        toast.error("Maximum quantity allowed is 10");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: newQuantity,
            image: product.image,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add item to cart");
      }

      setCart(data.items || []);
      toast.success("Added to cart successfully");
    } catch (error) {
      toast.error("Failed to update cart");
      console.error("Error updating cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId, size) => {
    if (!user) {
      toast.error("Please log in to manage your cart");
      return;
    }

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/cart/remove/${productId}/${size}?userId=${user.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove item from cart");
      }

      setCart(data.items || []);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, size, newQuantity) => {
    if (!user) {
      toast.error("Please log in to manage your cart");
      return;
    }

    if (newQuantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/cart/update/${productId}/${size}?userId=${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity");
      }

      setCart(data.items || []);
      toast.success("Cart updated successfully");
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Error updating quantity:", error);
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart: fetchCart,
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
