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
import { useCart } from "@/context/cart";
import CatalogProducts from "@/components/CatalogProducts";
import Sidebar from "@/components/Sidebar";

const CatalogContent = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    brands: true,
    rating: true,
    availability: true,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  // State variables
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
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
      <main className="min-h-screen  max-w-[1350px] mx-auto">
        {/* Hero Section */}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="bg-white border-b">
            <div className="  p-8 mx-auto px-6  py-4">
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
        <div className="mx-auto px-6 py-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(true)}
            className="md:hidden fixed top-[8em] z-50 bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
          >
            <Sliders className="w-4 h-4" />
            Filters
          </button>

          {/* Content Grid */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <Sidebar
              filters={filters}
              setFilters={setFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              expandedSections={expandedSections}
              showFilters={showFilters} // Add this
              onClose={() => setShowFilters(false)} // Add this
              setExpandedSections={setExpandedSections}
            />
            <CatalogProducts
              filters={filters}
              priceRange={priceRange}
              ratingFilter={ratingFilter}
              setFilters={setFilters}
              searchQuery={searchQuery}
              applyFilters={applyFilters}
            />
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
