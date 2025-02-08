"use client";
import { useUser } from "@/context/user";
import { Search, X, Loader2, History, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState, useRef } from "react";
import { useDebounce } from "@/components/useDebounce"; // You'll need to create this hook

// Recent Searches Component
const RecentSearches = ({ searches, onSelect, onClear }) => (
  <div className="p-3 border-b border-gray-100">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
      <button
        onClick={onClear}
        className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
      >
        Clear All
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {searches.map((search, index) => (
        <button
          key={index}
          onClick={() => onSelect(search)}
          className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 
          rounded-full text-gray-700 transition-colors flex items-center gap-2"
        >
          <History size={14} />
          {search}
        </button>
      ))}
    </div>
  </div>
);

// Trending Searches Component
const TrendingSearches = ({ trends, onSelect }) => (
  <div className="p-3 border-b border-gray-100">
    <h3 className="text-sm font-medium text-gray-700 mb-2">Trending</h3>
    <div className="space-y-2">
      {trends.map((trend, index) => (
        <button
          key={index}
          onClick={() => onSelect(trend)}
          className="flex items-center gap-3 w-full px-2 py-1.5 hover:bg-gray-50 
          rounded-lg transition-colors"
        >
          <TrendingUp size={16} className="text-blue-600" />
          <span className="text-sm text-gray-700">{trend}</span>
        </button>
      ))}
    </div>
  </div>
);

// Product Card Component
const ProductCard = ({ product, onClick }) => (
  <Link
    href={`/catalog/${product._id}`}
    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-all 
    duration-300 group"
    onClick={onClick}
  >
    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
      <Image
        src={product.images[0]?.url}
        alt={product.name}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="ml-4 flex-1">
      <h4
        className="text-sm font-medium text-gray-900 group-hover:text-blue-600 
      transition-colors"
      >
        {product.name}
      </h4>
      <p className="text-xs text-gray-500">{product.brand}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-medium text-blue-600">
          ${product.price}
        </span>
        {product.oldPrice && (
          <span className="text-xs text-gray-400 line-through">
            ${product.oldPrice}
          </span>
        )}
      </div>
    </div>
  </Link>
);

const SearchBar = memo(
  ({
    isMobile = false,
    searchQuery,
    setSearchQuery,
    showSuggestions,
    setShowSuggestions,
    filteredProducts,
    setIsMobileMenuOpen,
    isSearchFocused,
    setIsSearchFocused,
    productData,
    loading,
  }) => {
    const inputRef = useRef(null);
    const [recentSearches, setRecentSearches] = useState(() => {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("recentSearches") || "[]");
      }
      return [];
    });

    // Simulated trending searches
    const trendingSearches = ["Makeup", "Skincare", "Haircare", "Body Care"];

    const handleSearchSelect = (search) => {
      setSearchQuery(search);
      // Add to recent searches
      const newSearches = [
        search,
        ...recentSearches.filter((s) => s !== search),
      ].slice(0, 5);
      setRecentSearches(newSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
    };

    const clearRecentSearches = () => {
      setRecentSearches([]);
      localStorage.removeItem("recentSearches");
    };

    return (
      <div
        className={`relative z-[999999] ${
          isMobile ? "w-full" : "hidden md:block flex-1 max-w-2xl mx-8"
        }`}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsSearchFocused(true);
              setShowSuggestions(true);
            }}
            placeholder="Search products, brands, and categories..."
            className={`w-full px-4 ${
              isMobile ? "py-3" : "py-2.5"
            } pl-11 text-sm bg-gray-50 
            border border-gray-200 rounded-lg transition-all duration-300 
            placeholder-gray-400 outline-none
            ${
              isSearchFocused
                ? "ring-2 ring-blue-500 border-transparent bg-white"
                : "hover:border-gray-300"
            }`}
          />
          <div
            className={`absolute left-3 ${
              isMobile ? "top-3.5" : "top-3"
            } transition-colors duration-300
            ${isSearchFocused ? "text-blue-500" : "text-gray-400"}`}
          >
            <Search size={18} />
          </div>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                inputRef.current?.focus();
              }}
              className={`absolute right-3 ${
                isMobile ? "top-3.5" : "top-3"
              } text-gray-400 
              hover:text-gray-600 transition-colors duration-300`}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {showSuggestions && (
          <div
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl 
          border border-gray-100 max-h-[70vh] overflow-y-auto"
          >
            {!searchQuery && (
              <>
                <RecentSearches
                  searches={recentSearches}
                  onSelect={handleSearchSelect}
                  onClear={clearRecentSearches}
                />
                <TrendingSearches
                  trends={trendingSearches}
                  onSelect={handleSearchSelect}
                />
              </>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              </div>
            ) : searchQuery ? (
              filteredProducts.length > 0 ? (
                <div className="py-2">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery("");
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <Search size={40} className="mx-auto mb-2" />
                  </div>
                  <p className="text-gray-600">No products found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try different keywords or browse categories
                  </p>
                </div>
              )
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

function SearchingBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const API_URL = "https://itapole-backend.onrender.com/api";

  useEffect(() => {
    const fetchProducts = async () => {
      if (!debouncedSearch.trim()) {
        setFilteredProducts([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        if (data.success) {
          const filtered = data.data
            .filter(
              (product) =>
                product.name
                  .toLowerCase()
                  .includes(debouncedSearch.toLowerCase()) ||
                product.brand
                  .toLowerCase()
                  .includes(debouncedSearch.toLowerCase()) ||
                product.category
                  .toLowerCase()
                  .includes(debouncedSearch.toLowerCase())
            )
            .slice(0, 5);
          setFilteredProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowSuggestions(false);
        setIsSearchFocused(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="search-container">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        filteredProducts={filteredProducts}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        productData={productData}
        loading={loading}
      />
    </div>
  );
}

export default SearchingBar;
