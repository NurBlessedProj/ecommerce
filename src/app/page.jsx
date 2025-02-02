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
import { productData as products } from "../../products";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TrendingSection from "@/components/TrendingSection";

export default function Home() {
  // Initialize all state variables first
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent layout shift
  const [displayCount, setDisplayCount] = useState({
    products: 1,
    testimonials: 1,
  });
  // Replace the mainContentClass with:
  const mainContentClass = "max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8";
  const handleTestimonialSlide = (direction) => {
    const maxSlides =
      Math.ceil(testimonials.length / displayCount.testimonials) - 1;

    if (direction === "prev") {
      setCurrentTestimonial((prev) => (prev === 0 ? maxSlides : prev - 1));
    } else if (direction === "next") {
      setCurrentTestimonial((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }
  };

  const bottomBanners = [
    {
      id: 1,
      title: "Shop Hair Care",
      subtitle: "Professional Solutions for Healthy Hair",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_8442.png?v=1717394256&width=360",
      link: "/collections/hair-care",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Latest Beauty Innovations",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_8466.png?v=1717487116&width=360",
      link: "/collections/new-arrivals",
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "Limited Time Deals",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_8471.jpg?v=1717487552&width=360",
      link: "/collections/special-offers",
    },
  ];

  const features = [
    {
      id: 1,
      title: "Free US Shipping",
      description:
        "Complimentary shipping on all orders within the United States",
      icon: Truck,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      points: [
        "Fast delivery nationwide",
        "Order tracking available",
        "Secure packaging",
      ],
    },
    {
      id: 2,
      title: "Authentic Products",
      description: "100% genuine products sourced directly from manufacturers",
      icon: ShieldCheck,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      points: [
        "Verified suppliers",
        "Quality guaranteed",
        "Original formulations",
      ],
    },
    {
      id: 3,
      title: "Customer Care",
      description: "Dedicated support team for all your beauty needs",
      icon: HeartHandshake,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      points: ["Expert advice", "Easy returns", "Responsive support"],
    },
    {
      id: 4,
      title: "Premium Selection",
      description: "Wide range of exotic beauty products from around the globe",
      icon: Sparkles,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      points: [
        "International brands",
        "Exclusive products",
        "Regular new arrivals",
      ],
    },
  ];

  const categories = [
    {
      id: "all",
      name: "All Items",
    },
    {
      id: "new",
      name: "New Arrivals",
    },
    {
      id: "bestsellers",
      name: "Best Sellers",
    },
    {
      id: "skincare",
      name: "Skincare",
    },
    {
      id: "makeup",
      name: "Makeup",
    },
    {
      id: "haircare",
      name: "Hair Care",
    },
    {
      id: "fragrance",
      name: "Fragrance",
    },
    {
      id: "tools",
      name: "Tools & Brushes",
    },
    {
      id: "sets",
      name: "Gift Sets",
    },
    {
      id: "sale",
      name: "Sale",
    },
  ];

  // State management (if using React)
  const [activeCategory, setActiveCategory] = useState("all");

  // Products data

  const trendingItems = [
    {
      id: 1,
      title: "Big Bottle Sale",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7902.jpg?v=1716526693&width=360",
    },
    {
      id: 2,
      title: "New & Now",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7899.jpg?v=1716526001&width=360",
    },
    {
      id: 3,
      title: "Last Chance",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7895.png?v=1716525572&width=360",
    },
    {
      id: 4,
      title: "Register Now",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7891.jpg?v=1716525242&width=360",
      badge: "COMING SOON 3/24/25",
    },
    {
      id: 5,
      title: "Styling Tools",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7890.jpg?v=1716525091&width=360",
    },
    {
      id: 6,
      title: "Shopping Guide",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7893.png?v=1716525434&width=360",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Licensed Esthetician",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote:
        "The professional body care products have transformed my spa treatments. My clients love the results!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Spa Owner",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      quote:
        "Superior quality body lotions that meet our high standards. The organic options are particularly popular.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Massage Therapist",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      quote:
        "These professional-grade body lotions provide the perfect consistency for treatments.",
      rating: 5,
    },
    {
      id: 4,
      name: "Lisa Thompson",
      role: "Beauty Influencer",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      quote:
        "I've tried countless body lotions, but these are truly exceptional. My followers love my recommendations!",
      rating: 5,
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Dermatologist",
      location: "Houston, TX",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      quote:
        "I recommend these products to my patients. The results speak for themselves.",
      rating: 5,
    },
    {
      id: 6,
      name: "Jennifer Lee",
      role: "Wellness Coach",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      quote:
        "The perfect blend of luxury and effectiveness. My clients see amazing results.",
      rating: 5,
    },
  ];

  // Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      // Set product display count
      if (width < 640) {
        setDisplayCount((prev) => ({ ...prev, products: 1 })); // Mobile
      } else if (width < 768) {
        setDisplayCount((prev) => ({ ...prev, products: 2 })); // Small tablet
      } else if (width < 1024) {
        setDisplayCount((prev) => ({ ...prev, products: 3 })); // Large tablet
      } else {
        setDisplayCount((prev) => ({ ...prev, products: 4 })); // Desktop
      }

      // Set testimonial display count
      if (width < 768) {
        setDisplayCount((prev) => ({ ...prev, testimonials: 1 })); // Mobile
      } else if (width < 1024) {
        setDisplayCount((prev) => ({ ...prev, testimonials: 2 })); // Tablet
      } else {
        setDisplayCount((prev) => ({ ...prev, testimonials: 3 })); // Desktop
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Add this function for product slides
  const handleSlide = (direction) => {
    if (direction === "prev" && currentProduct > 0) {
      setCurrentProduct(currentProduct - 1);
    } else if (
      direction === "next" &&
      currentProduct < products.length - displayCount.products
    ) {
      setCurrentProduct(currentProduct + 1);
    }
  };

  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner />
      {/* Product Carousel */}

      {/* Product Carousel */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50/30">
        <div className={mainContentClass}>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <span className="text-blue-600 font-medium text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-3 block">
              Our Collection
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Discover our handpicked selection of premium beauty products
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden px-3 sm:px-4">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${
                    currentProduct * (100 / displayCount.products)
                  }%)`,
                }}
              >
                {products.map((product) => {
                  const { addToCart } = useCart();

                  const handleAddToCart = () => {
                    addToCart(product, 1);
                    toast.success(`${product.name} added to cart`);
                  };

                  return (
                    <div
                      key={product.id}
                      style={{
                        minWidth: `${100 / displayCount.products}%`,
                      }}
                      className="px-2 sm:px-3 md:px-4"
                    >
                      <div className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden">
                        <div className="transform-gpu transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
                          {/* Image Section */}
                          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay with Actions - Hidden on mobile */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                <div className="flex justify-center space-x-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                  <button className="p-2 sm:p-3 bg-white/95 rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-colors backdrop-blur-sm">
                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                                  </button>
                                  <button className="p-2 sm:p-3 bg-white/95 rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-colors backdrop-blur-sm">
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                                  </button>
                                  <button
                                    onClick={handleAddToCart}
                                    className="p-2 sm:p-3 bg-white/95 rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-colors backdrop-blur-sm"
                                  >
                                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Badges remain the same */}
                            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-start">
                              {product.badge && (
                                <div className="bg-black/85 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg">
                                  {product.badge}
                                </div>
                              )}
                              {product.discount && (
                                <div className="bg-red-500 text-white text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg">
                                  -{product.discount}%
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="p-3 sm:p-4 lg:p-5">
                            {/* Category & Brand */}
                            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
                                {product.category}
                              </span>
                              {product.brand && (
                                <img
                                  src={product.brand}
                                  alt="Brand"
                                  className="h-3 sm:h-4 object-contain"
                                />
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="font-medium text-sm sm:text-base mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center mb-2 sm:mb-3">
                              <div className="flex items-center">
                                <div className="flex -space-x-0.5 sm:-space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                        i < Math.floor(product.rating)
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium text-gray-600">
                                  {product.rating}
                                </span>
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500 ml-1.5 sm:ml-2 flex items-center">
                                <Circle className="w-1 h-1 mx-1.5 sm:mx-2 fill-current" />
                                {product.reviews} reviews
                              </div>
                            </div>

                            {/* Price & Action */}
                            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
                              <div className="flex flex-col">
                                {product.oldPrice && (
                                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                                    ${product.oldPrice}
                                  </span>
                                )}
                                <div className="flex items-center">
                                  <span className="text-base sm:text-lg font-semibold">
                                    ${product.price}
                                  </span>
                                  {product.discount && (
                                    <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-medium text-green-600">
                                      Save $
                                      {(
                                        product.oldPrice - product.price
                                      ).toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={handleAddToCart}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2"
                              >
                                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Add to Cart
                              </button>
                            </div>

                            {/* Stock Status remains the same */}
                            {product.stock && product.stock < 10 && (
                              <div className="mt-2 sm:mt-3 flex items-center justify-between text-xs sm:text-sm">
                                {/* ... Stock content ... */}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows remain the same */}
            <button
              onClick={() => handleSlide("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentProduct === 0}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleSlide("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                currentProduct >= products.length - displayCount.products
              }
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>
      <TrendingSection
        trendingItems={trendingItems}
        bottomBanners={bottomBanners}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        router={router}
        categories={categories}
      />
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className={mainContentClass}>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* Google Logo SVG */}
              <div className="flex items-center">
                <svg viewBox="0 0 74 24" className="h-7 sm:h-8">
                  <path
                    d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z"
                    fill="#4285F4"
                  />
                  <path
                    d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
                    fill="#EA4335"
                  />
                  <path
                    d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z"
                    fill="#4285F4"
                  />
                  <path
                    d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
                    fill="#FBBC05"
                  />
                  <path d="M58 .24h2.51v17.57H58z" fill="#34A853" />
                  <path
                    d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="ml-1 text-lg sm:text-xl font-medium text-gray-800">
                  Reviews
                </span>
              </div>
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              <div className="flex items-center">
                <span className="font-semibold text-lg sm:text-xl text-gray-800">
                  4.9
                </span>
                <div className="flex text-yellow-400 mx-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm sm:text-base">
                  (2,394)
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Read trusted reviews from our customers
            </p>
          </div>

          <div className="relative px-4 sm:px-6">
            <div className="overflow-hidden -mx-4 sm:mx-0">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] px-2 sm:px-3 md:px-4"
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-4">
                        <div className="relative">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-lg sm:text-xl font-medium uppercase">
                            {testimonial.name[0]}
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            {/* Google 'G' Logo */}
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                            {testimonial.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                              {Array.from({ length: testimonial.rating }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3 sm:w-4 sm:h-4 fill-current"
                                  />
                                )
                              )}
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500">
                              {testimonial.date || "2 weeks ago"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                        <span>Verified Purchase</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => handleTestimonialSlide("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-3 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentTestimonial === 0}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            <button
              onClick={() => handleTestimonialSlide("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                currentTestimonial >=
                testimonials.length - displayCount.testimonials
              }
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>

            {/* Pagination Dots */}
            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2">
              {[
                ...Array(
                  Math.ceil(testimonials.length / displayCount.testimonials)
                ),
              ].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                    currentTestimonial === index
                      ? "bg-blue-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gray-50  py-16 sm:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-50/50 to-transparent" />
          <div className="absolute h-96 w-96 -top-24 -left-24 bg-blue-100/20 rounded-full blur-3xl" />
          <div className="absolute h-96 w-96 -bottom-24 -right-24 bg-purple-100/20 rounded-full blur-3xl" />
        </div>

        <div className={`${mainContentClass} relative z-10`}>
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium tracking-wide mb-4">
              Why People Trust Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              The Perfect Choice for Your Beauty Needs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Experience excellence in beauty care with our professional
              solutions and dedicated service
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { number: "15K+", label: "Products", color: "blue" },
              { number: "50K+", label: "Happy Clients", color: "green" },
              { number: "99%", label: "Satisfaction Rate", color: "purple" },
              { number: "24/7", label: "Support", color: "amber" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600 mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid with Enhanced Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div
                    className={`absolute transform rotate-45 ${feature.bgColor} w-28 h-28 -top-14 -right-14 opacity-20 group-hover:opacity-30 transition-opacity`}
                  />
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 relative`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  <div
                    className={`absolute inset-0 ${feature.bgColor} rounded-2xl opacity-20 blur-xl`}
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Feature Points */}
                  <ul className="space-y-3">
                    {feature.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start text-sm text-gray-600 group-hover:text-gray-700 transition-colors"
                      >
                        <div className="relative flex-shrink-0">
                          <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                          <div className="absolute inset-0 text-green-500 animate-ping opacity-20" />
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-800">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="font-medium">
                  Trusted by Professional Beauticians Worldwide
                </span>
              </div>
              <div className="h-4 w-px bg-gray-300 hidden sm:block" />
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                Join Our Network
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
