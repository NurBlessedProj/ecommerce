"use client";
import { useCart } from "@/context/cart";
import { useUser } from "@/context/user";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function CatalogProducts({
  filters,
  priceRange,
  ratingFilter,
  searchQuery,
  setFilters,
}) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const {addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (productDetails) => {
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
        image: productDetails.images[0]?.url,
      };

      await addToCart(productToAdd, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const router = useRouter();
  const API_URL = "https://itapole-backend.onrender.com/api";

  const getCurrentProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
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

  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];

      if (filters.category !== "all") {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );
      }

      if (filters.brand !== "all") {
        filtered = filtered.filter(
          (product) => product.brand === filters.brand
        );
      }

      if (ratingFilter > 0) {
        filtered = filtered.filter((product) => product.rating >= ratingFilter);
      }

      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      switch (filters.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          filtered.sort(
            (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
          );
      }

      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [filters, priceRange, ratingFilter, searchQuery, products]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (productId) => {
    router.push(`/catalog/${productId}`);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-[3/4] w-full mb-4"></div>
          <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 w-1/2"></div>
        </div>
      ))}
    </div>
  );

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {getCurrentProducts().map((product) => (
            <div
              key={product._id}
              className="group relative bg-white"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  fill
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay Actions */}
                <div
                  className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    hoveredProduct === product._id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button className="w-12 h-12 bg-white flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-12 h-12 bg-white flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleProductClick(product._id)}
                    className="w-12 h-12 bg-white flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium">
                      NEW
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.brand}</span>
                </div>

                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center  py-32">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We couldn't find any products matching your criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setFilters({
                  category: "all",
                  priceRange: "all",
                  brand: "all",
                  sortBy: "newest",
                });
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((pageNum) => {
                  if (totalPages <= 7) return true;
                  if (pageNum === 1 || pageNum === totalPages) return true;
                  if (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                    return true;
                  return false;
                })
                .map((pageNum, index, array) => (
                  <React.Fragment key={pageNum}>
                    {index > 0 && array[index - 1] !== pageNum - 1 && (
                      <span className="px-2">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center border ${
                        currentPage === pageNum
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
              {Math.min(currentPage * productsPerPage, filteredProducts.length)}{" "}
              of {filteredProducts.length} products
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogProducts;
