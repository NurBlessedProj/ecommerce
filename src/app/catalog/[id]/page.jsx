"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { productData } from "../../../../products";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ProductDetails({ params }) {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;
  useEffect(() => {
    const product = productData.find((p) => p.id === parseInt(params.id));
    setProductDetails(product);

    if (product) {
      // Log for debugging
      console.log("Current product category:", product.category);

      const related = productData.filter((p) => {
        // Log for debugging
        console.log("Checking product:", p.id, p.category);
        return p.category === product.category && p.id !== product.id;
      });

      // Log for debugging
      console.log("Found related products:", related.length);
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
        <div className="max-w-[1350px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
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
                  Products
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="sticky top-24">
              <div
                className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg"
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
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {productDetails.name}
                </h1>
                <div className="text-3xl font-bold text-blue-600">
                  ${productDetails.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50"
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
                      className="w-16 text-center border-x py-2"
                      min="1"
                      max="10"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50"
                      disabled={quantity >= 10}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                  Add to Cart
                </button>
                <button className="flex-1 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
                  Pay Now
                </button>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {productDetails.description}
                </p>
                {productDetails.details && (
                  <p className="text-gray-600 leading-relaxed mt-4">
                    {productDetails.details}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {displayedProducts.length > 0 && (
            <section className="mt-24">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Related Products</h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={
                      (currentPage + 1) * productsPerPage >=
                      relatedProducts.length
                    }
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <Link
                    href={`/catalog/${product.id}`}
                    key={product.id}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="mt-2">
                          <span className="font-bold text-gray-900">
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
