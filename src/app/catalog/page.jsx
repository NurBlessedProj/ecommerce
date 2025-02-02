"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Search,
  Sliders,
  ShoppingBag,
  Heart,
  Tag,
  TrendingUp,
  Award,
  X,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productData } from "../../../products";

const CatalogContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State variables
  const [products, setProducts] = useState(productData);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    brand: "all",
    sortBy: "newest",
  });

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const [activeFilters, setActiveFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Add this function at the beginning of your component, after the state declarations
  const applyFilters = (currentFilters) => {
    let filtered = [...products];

    // Apply category filter
    if (currentFilters.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category === currentFilters.category
      );
    }

    // Apply brand filter
    if (currentFilters.brand !== "all") {
      filtered = filtered.filter(
        (product) => product.brand === currentFilters.brand
      );
    }

    // Apply rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter((product) => product.rating >= ratingFilter);
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply availability filter
    if (availabilityFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.availability === availabilityFilter
      );
    }

    // Apply sorting
    switch (currentFilters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Assuming products have a dateAdded field
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }

    setFilteredProducts(filtered);
  };

  // Enhanced filter options
  const filterOptions = {
    categories: [
      { name: "Skincare", icon: "✨", count: 120 },
      { name: "Haircare", icon: "💇", count: 85 },
      { name: "Makeup", icon: "💄", count: 150 },
      { name: "Tools", icon: "🛠️", count: 45 },
      { name: "Fragrance", icon: "🌸", count: 30 },
      { name: "Body Care", icon: "🧴", count: 65 },
    ],
    brands: [
      { name: "Glow Labs", count: 46 },
      { name: "Pure Beauty", count: 38 },
      { name: "Hair Luxe", count: 52 },
      { name: "Glam Cosmetics", count: 63 },
      { name: "Natural Essence", count: 29 },
    ],
    availability: [
      { name: "In Stock", value: "in-stock" },
      { name: "Pre-order", value: "pre-order" },
    ],
  };

  // Enhanced filter handling
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };

    if (filterType === "price") {
      setPriceRange(value);
    } else if (filterType === "rating") {
      setRatingFilter(value);
    } else {
      newFilters[filterType] = value;
    }

    setFilters(newFilters);
    updateActiveFilters(newFilters);
    applyFilters(newFilters);
    setCurrentPage(1);
  };

  const updateActiveFilters = (currentFilters) => {
    const active = [];

    if (currentFilters.category !== "all") {
      active.push({
        type: "category",
        value: currentFilters.category,
        label: currentFilters.category,
      });
    }

    if (currentFilters.brand !== "all") {
      active.push({
        type: "brand",
        value: currentFilters.brand,
        label: currentFilters.brand,
      });
    }

    if (ratingFilter > 0) {
      active.push({
        type: "rating",
        value: ratingFilter,
        label: `${ratingFilter}+ Stars`,
      });
    }

    setActiveFilters(active);
  };

  const removeFilter = (filter) => {
    const newFilters = { ...filters };

    if (filter.type === "rating") {
      setRatingFilter(0);
    } else {
      newFilters[filter.type] = "all";
    }

    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Enhanced search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      applyFilters(filters);
    }
  }, [searchQuery]);

  // Get current page products
  const getCurrentProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle product click - redirect to product details page
  const handleProductClick = (productId) => {
    router.push(`/catalog/${productId}`);
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="bg-white border-b">
            <div className="max-w-[1350px] mx-auto px-6 md:px-8 lg:px-12 xl:px-24 py-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm text-gray-500">Active Filters:</span>
                {activeFilters.map((filter) => (
                  <button
                    key={`${filter.type}-${filter.value}`}
                    onClick={() => removeFilter(filter)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-blue-600 text-sm hover:bg-purple-100 transition-colors"
                  >
                    {filter.label}
                    <X className="w-4 h-4" />
                  </button>
                ))}
                <button
                  onClick={() => {
                    setFilters({
                      category: "all",
                      priceRange: "all",
                      brand: "all",
                      sortBy: "newest",
                    });
                    setRatingFilter(0);
                    setPriceRange([0, 1000]);
                    setActiveFilters([]);
                  }}
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="max-w-[1350px] mx-auto px-6 md:px-8 lg:px-12 xl:px-24 py-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Sliders className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside
              className={`md:w-72 ${showFilters ? "block" : "hidden md:block"}`}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-[3em]">
                <div className="space-y-8">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {filterOptions.categories.map((category) => (
                        <label
                          key={category.name}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={filters.category === category.name}
                              onChange={() =>
                                handleFilterChange(
                                  "category",
                                  filters.category === category.name
                                    ? "all"
                                    : category.name
                                )
                              }
                              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm group-hover:text-blue-600">
                              {category.icon} {category.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {category.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Slider */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-24 px-3 py-2 border rounded-lg text-sm"
                          placeholder="Min"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-24 px-3 py-2 border rounded-lg text-sm"
                          placeholder="Max"
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Rating
                    </h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label
                          key={`rating-${rating}`}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="rating"
                              checked={ratingFilter === rating}
                              onChange={() =>
                                handleFilterChange("rating", rating)
                              }
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex items-center">
                              {Array.from({ length: rating }).map((_, i) => (
                                <Star
                                  key={`star-${rating}-${i}`}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                />
                              ))}
                              <span className="ml-2 text-sm">& up</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Availability
                    </h3>
                    <div className="space-y-2">
                      {filterOptions.availability.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="availability"
                              value={option.value}
                              checked={availabilityFilter === option.value}
                              onChange={(e) =>
                                setAvailabilityFilter(e.target.value)
                              }
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm group-hover:text-blue-600">
                              {option.name}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentProducts().map((product) => (
                  <div
                    onClick={() => handleProductClick(product.id)}
                    key={product.id}
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors">
                            Quick View
                          </button>
                          <button className="p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-purple-50 text-blue-600 text-xs font-medium rounded-full">
                          {product.category}
                        </span>
                        {product.rating >= 4.5 && (
                          <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Best Seller
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-blue-600">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {product.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="mb-4">
                    <Search className="w-12 h-12 text-gray-300 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filter criteria
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
                    className="text-blue-600 hover:text-purple-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                      if (totalPages <= 7) return true;
                      if (pageNum === 1 || pageNum === totalPages) return true;
                      if (
                        pageNum >= currentPage - 2 &&
                        pageNum <= currentPage + 2
                      )
                        return true;
                      return false;
                    })
                    .map((pageNum, index, array) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg border ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-gray-600">
                  Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * productsPerPage,
                    filteredProducts.length
                  )}{" "}
                  of {filteredProducts.length} products
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

const catalogPage = () => {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  );
};
export default catalogPage;
