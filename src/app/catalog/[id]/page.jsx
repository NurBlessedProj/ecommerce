"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { productData } from "../../../../products";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useCart } from "@/context/cart";
import { useRouter } from "next/navigation";

export default function ProductDetails({ params }) {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;
  const router = useRouter(); // Add this
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(productDetails, quantity);
  };

  // Add handler for Pay Now
  const handlePayNow = () => {
    addToCart(productDetails, quantity);
    router.push("/checkout");
  };

  useEffect(() => {
    const product = productData.find((p) => p.id === parseInt(params.id));
    setProductDetails(product);

    if (product) {
      const related = productData.filter(
        (p) => p.category === product.category && p.id !== product.id
      );
      setRelatedProducts(related);
    }
  }, [params.id]);

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, Math.min(10, value)));
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

  if (!productDetails)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

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
                  Catalogof
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
            {/* Product Image */}
            <div className="lg:sticky lg:top-24">
              <div
                className="relative aspect-square rounded-lg sm:rounded-2xl overflow-hidden bg-white shadow-lg"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={productDetails.image}
                  alt={productDetails.name}
                  fill
                  className={`object-cover transition-transform duration-200`}
                  style={{
                    transform: isZoomed ? "scale(2)" : "scale(1)",
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                />
                {!isZoomed && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 p-1.5 sm:p-2 rounded-full">
                    <ZoomIn className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                )}
              </div>
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
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
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
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handlePayNow}
                  className="flex-1 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Pay Now
                </button>
              </div>

              {/* Description */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
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
                  <Link
                    href={`/catalog/${product.id}`}
                    key={product.id}
                    className="group"
                  >
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image}
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
                  </Link>
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
