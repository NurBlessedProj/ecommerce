"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  ArrowRight,
  Heart,
  Award,
  Shield,
  CheckCircle,
  Users,
  Percent,
  Package,
  RefreshCw,
  TrendingUp,
  Truck,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Eye,
  Circle,
  ThumbsUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TrendingSection from "@/components/TrendingSection";
import { useUser } from "@/context/user";
import FeatureSection from "@/components/FeatureSection";
import PerfectSection from "@/components/PerfectSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  // Initialize all state variables first
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(0);

  const mainContentClass = "max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8";
  const { user } = useUser();

  // const API_URL = "https://itapole-backend.onrender.com/api";
  // const API_URL = "http://localhost:4001/api";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add this function for product slides

  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner />
      <FeatureSection products={products} isLoading={loading} />
      <TrendingSection products={products} isLoading={loading} />
      <ReviewsSection mainContentClass={mainContentClass} products={products} />
      <PerfectSection mainContentClass={mainContentClass} />
      <Footer />
    </div>
  );
}
