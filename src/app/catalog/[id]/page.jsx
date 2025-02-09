"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useCart } from "@/context/cart";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductDetails({ params }) {
  const { user } = useUser();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [isPayNowLoading, setIsPayNowLoading] = useState(false);

  const productsPerPage = 4;
  const router = useRouter();
  const { addToCart } = useCart();
  // const API_URL = "http://localhost:4001/api";
  const API_URL = "https://itapole-backend.onrender.com/api";

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
        id: productDetails._id.toString(),
        name: productDetails.name,
        price: productDetails.price,
        image: images[0]?.url,
      };

      await addToCart(productToAdd, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePayNow = async () => {
    if (!user) {
      toast.error("Please log in to continue");
      router.push("/login");
      return;
    }

    setIsPayNowLoading(true);
    try {
      await addToCart(
        {
          id: productDetails._id,
          name: productDetails.name,
          price: productDetails.price,
          image: images[0]?.url,
        },
        quantity
      );
      router.push("/checkout");
    } catch (error) {
      toast.error("Failed to process. Please try again.");
      console.error("Error processing payment:", error);
    } finally {
      setIsPayNowLoading(false);
    }
  };

  // Fetch single product and set up related products
  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();

        if (data.success) {
          setProductDetails(data.data);
          const productImages = data.data.images || [];
          setImages(
            productImages.length > 0
              ? productImages
              : [{ url: data.data.image }]
          );

          // Fetch related products
          const allProductsResponse = await fetch(`${API_URL}/products`);
          if (!allProductsResponse.ok) {
            throw new Error("Failed to fetch related products");
          }
          const allProductsData = await allProductsResponse.json();

          if (allProductsData.success) {
            const related = allProductsData.data.filter(
              (p) =>
                p.category === data.data.category && p._id !== data.data._id
            );
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        toast.error("Failed to load product details");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProductAndRelated();
    }
  }, [params.id]);

  const handleQuantityChange = (value) => {
    const newValue = Math.max(1, Math.min(10, value));
    if (value > 10) {
      toast.error("Maximum quantity is 10");
    } else if (value < 1) {
      toast.error("Minimum quantity is 1");
    }
    setQuantity(newValue);
  };
  const handleRelatedProductClick = (productId) => {
    setLoading(true);
    router.push(`/catalog/${productId}`);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const nextPage = () => {
    setCurrentPage((prev) =>
      Math.min(
        prev + 1,
        Math.ceil(relatedProducts.length / productsPerPage) - 1
      )
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  if (loading && !productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/catalog"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }
  const displayedProducts = relatedProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-[1350px] mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {/* Breadcrumb */}
          <nav className="mb-4 sm:mb-6 lg:mb-8 overflow-x-auto whitespace-nowrap">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li className="text-gray-900 font-medium">
                {productDetails.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Product Images Section */}
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Main Image */}
              <div
                className="relative aspect-square rounded-md sm:rounded-2xl overflow-hidden bg-white shadow-lg"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={images[selectedImageIndex].url}
                  alt={productDetails.name}
                  fill
                  className={`object-cover transition-transform duration-200`}
                  style={{
                    transform: isZoomed ? "scale(2)" : "scale(1)",
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                />
                {!isZoomed && (
                  <>
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 p-1.5 sm:p-2 rounded-full">
                      <ZoomIn className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    {images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between p-4">
                        <button
                          onClick={handlePrevImage}
                          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-5  px-2 pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                        selectedImageIndex === index
                          ? "ring-2 ring-blue-600"
                          : "ring-1 ring-gray-200"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Product thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Product Info */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {productDetails.name}
                </h1>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  ${productDetails.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-white p-4 sm:p-6 rounded-md shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 sm:p-3 hover:bg-gray-50 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                      className="w-12 sm:w-16 text-center border-x py-2"
                      min="1"
                      max="10"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 sm:p-3 hover:bg-gray-50 disabled:opacity-50"
                      disabled={quantity >= 10}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className={`flex-1 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                <button
                  onClick={handlePayNow}
                  disabled={isPayNowLoading}
                  className={`flex-1 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {isPayNowLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="bg-white p-4 sm:p-6 rounded-md shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Description
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {productDetails.description}
                </p>
                {productDetails.details && (
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
                    {productDetails.details}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {displayedProducts.length > 0 && (
            <section className="mt-12 sm:mt-16 lg:mt-24">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Related Products
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={
                      (currentPage + 1) * productsPerPage >=
                      relatedProducts.length
                    }
                    className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {displayedProducts.map((product) => (
                  <div
                    onClick={() => handleRelatedProductClick(product)}
                    key={product._id}
                    className="group"
                  >
                    <div className="bg-white rounded-md sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={product.images[0]?.url}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="mt-2">
                          <span className="font-bold text-gray-900 text-sm sm:text-base">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
