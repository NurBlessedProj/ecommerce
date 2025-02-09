import { useCart } from "@/context/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Eye,
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Timer,
} from "lucide-react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useUser } from "@/context/user";

function FeatureSection({ products, mainContentClass, user, isLoading }) {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayCount, setDisplayCount] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Categories for filter tabs
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return ["all", ...uniqueCategories];
  }, [products]);


  // Filter products when tab changes
  useEffect(() => {
    setCurrentProduct(0); // Reset position when filter changes
    if (activeTab === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === activeTab.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [activeTab, products]);

  // Handle responsive display count
  useEffect(() => {
    const updateDisplayCount = () => {
      if (window.innerWidth >= 1536) setDisplayCount(5); // 2xl
      else if (window.innerWidth >= 1280) setDisplayCount(4); // xl
      else if (window.innerWidth >= 1024) setDisplayCount(3); // lg
      else if (window.innerWidth >= 768) setDisplayCount(2); // md
      else setDisplayCount(1); // sm and xs
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
    return () => window.removeEventListener("resize", updateDisplayCount);
  }, []);

  const handleSlide = useCallback(
    (direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentProduct((prev) => {
        if (direction === "next") {
          return Math.min(prev + 1, filteredProducts.length - displayCount);
        }
        return Math.max(prev - 1, 0);
      });
      setTimeout(() => setIsAnimating(false), 500);
    },
    [displayCount, filteredProducts.length, isAnimating]
  );

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSlide("next");
    } else if (isRightSwipe) {
      handleSlide("prev");
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleShare = async (productId) => {
    try {
      const shareUrl = `${window.location.origin}/catalog/${productId}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const ProductCard = ({ product }) => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // In ProductDetails.js
    const handleAddToCart = async () => {
      if (!user) {
        toast.error("Please log in to add items to cart");
        router.push("/login");
        return;
      }

      setIsLoading(true);
      try {
        const productToAdd = {
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          image: product.images[0]?.url,
        };

        await addToCart(productToAdd, quantity);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart");
      } finally {
        setIsLoading(false);
      }
    };

    const handleWishlist = () => {
      setIsWishlisted(!isWishlisted);
      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist"
      );
    };

    return (
      <div
        className="px-2 sm:px-3 md:px-4"
        style={{
          minWidth: `${100 / displayCount}%`,
          height: "450px", // Add fixed height
        }}
      >
        <div
          className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col h-full transform-gpu transition-all duration-500 hover:shadow-xl border border-gray-100">
            {" "}
            {/* Image Section */}
            <div className="relative w-full" style={{ height: "300px" }}>
              <Image
                src={product.images[0]?.url}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                className={`object-cover transition-transform duration-700 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
                priority={currentProduct === 0}
              />
              {/* Quick Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 transform transition-all duration-300 z-10">
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-white/80 hover:bg-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={() => handleShare(product._id)}
                  className="p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              {/* Overlay with Actions */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent 
                  transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className={`flex justify-center space-x-2 transition-transform duration-300
                    ${isHovered ? "translate-y-0" : "translate-y-8"}`}
                  >
                    <button
                      onClick={() => router.push(`/catalog/${product._id}`)}
                      className="p-3 bg-white/95 rounded-xl shadow-lg hover:bg-white 
                        transition-colors backdrop-blur-sm"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="p-3 bg-white/95 rounded-xl shadow-lg hover:bg-white 
                        transition-colors backdrop-blur-sm"
                    >
                      <ShoppingCart className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <div
                    className="bg-black/85 backdrop-blur-sm text-white text-xs 
                    font-medium px-3 py-1.5 rounded-md"
                  >
                    {product.badge}
                  </div>
                )}
                {product.discount && (
                  <div
                    className="bg-red-500 text-white text-xs font-medium 
                    px-3 py-1.5 rounded-md flex items-center gap-1"
                  >
                    <Timer className="w-3 h-3" />-{product.discount}%
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 p-4 lg:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-medium text-base mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                    <span className="text-lg font-semibold">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg
    text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Adding...
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="pt-12 lg:pt-20 bg-gray-50/30">
        <div className={`${mainContentClass} max-w-[1350px] mx-auto px-4`}>
          <div className="text-center mb-12">
            <span className="text-blue-600 font-medium text-sm tracking-wider uppercase mb-3 block">
              Our Collection
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium beauty products
            </p>
          </div>

          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Loading products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="pt-12 lg:pt-20 bg-gray-50/30">
      <div className={`${mainContentClass} max-w-[1350px] mx-auto px-4`}>
        <div className="text-center mb-12">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase mb-3 block">
            Our Collection
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium beauty products
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 px-4 max-w-full scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${
                    activeTab === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Products Slider */}
          <div className="overflow-hidden h-[600px]">
            {" "}
            {/* Add fixed height here */}
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentProduct * (100 / displayCount)
                }%)`,
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {filteredProducts.length > displayCount && (
            <>
              <button
                onClick={() => handleSlide("prev")}
                className={`absolute -left-4 top-1/2 -translate-y-1/2 
                  bg-white shadow-lg p-3 rounded-full hidden sm:block
                  transition-all duration-300 hover:bg-blue-600 hover:text-white
                  ${
                    currentProduct === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={currentProduct === 0 || isAnimating}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleSlide("next")}
                className={`absolute -right-4 top-1/2 -translate-y-1/2
                  bg-white shadow-lg p-3 rounded-full hidden sm:block
                  transition-all duration-300 hover:bg-blue-600 hover:text-white
                  ${
                    currentProduct >= filteredProducts.length - displayCount
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                disabled={
                  currentProduct >= filteredProducts.length - displayCount ||
                  isAnimating
                }
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeatureSection;
