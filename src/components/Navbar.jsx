"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart";
import { productData } from "../../products";
import {
  Search,
  ShoppingBag,
  Grid,
  MessageCircle,
  LogIn,
  Menu,
  X,
} from "lucide-react";

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
  }) => (
    <div
      className={`relative ${
        isMobile ? "" : "hidden md:block flex-1 max-w-md mx-8"
      }`}
    >
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);

            if (value.trim()) {
              const filtered = productData
                .filter(
                  (product) =>
                    product.name.toLowerCase().includes(value.toLowerCase()) ||
                    product.brand.toLowerCase().includes(value.toLowerCase()) ||
                    product.category.toLowerCase().includes(value.toLowerCase())
                )
                .slice(0, 5);
              setShowSuggestions(true);
            } else {
              setShowSuggestions(false);
            }
          }}
          onFocus={() => {
            setIsSearchFocused(true);
            if (searchQuery.trim()) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Search products..."
          className={`w-full px-4 ${isMobile ? "py-3" : "py-2"} pr-12 text-sm
          bg-gray-50 border border-gray-200 rounded-md
          transition-all duration-300 outline-none
          ${
            isSearchFocused
              ? "ring-2 ring-blue-500 border-transparent"
              : "hover:border-gray-300"
          }`}
        />
        <button
          type="button"
          className={`absolute right-3 ${isMobile ? "top-3" : "top-2"} 
          transition-colors duration-300
          ${isSearchFocused ? "text-blue-500" : "text-gray-400"}
          hover:text-blue-600`}
        >
          <Search size={20} />
        </button>
      </div>

      {showSuggestions && searchQuery && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-[60vh] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div className="py-2">
              {filteredProducts.map((product) => (
                <Link
                  href={`/catalog/${product.id}`}
                  key={product.id}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowSuggestions(false);
                    setSearchQuery("");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <span className="text-sm font-medium text-blue-600">
                      ${product.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  )
);

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setShowSuggestions(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = productData
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);
  return (
    <header
      className={`sticky top-0 z-[9999] transition-all duration-300 ${
        isScrolled ? "bg-white border-b border-gray-200" : "bg-white"
      }`}
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Home"
          >
            <img
              src="/logo.avif"
              alt="COSMO PROF"
              className="h-8 w-auto object-contain transition-transform hover:scale-105"
              loading="eager"
            />
          </Link>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            filteredProducts={filteredProducts}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
          />
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { href: "/catalog", icon: Grid, label: "Catalog" },
              { href: "/contact", icon: MessageCircle, label: "Contact" },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center text-sm text-gray-700 hover:text-blue-600 
                  transition-colors gap-2 group focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-blue-500 p-2"
              >
                <Icon
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span>{label}</span>
              </Link>
            ))}

            <Link
              href="/login"
              className="flex items-center text-sm gap-2 px-4 py-2
                bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-md
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <LogIn
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
              <span>Log In</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-md transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs 
                  min-w-[20px] h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-md transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs 
                  min-w-[20px] h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-white z-50 md:hidden"
            aria-label="Mobile menu"
          >
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <Link href="/" className="relative">
                  <img
                    src="/logo.avif"
                    alt="COSMO PROF"
                    className="h-8 w-auto object-contain"
                  />
                </Link>

                <div className="flex items-center gap-3">
                  <Link
                    href="/cart"
                    className="relative p-2 hover:bg-gray-100 rounded-md transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label={`Cart with ${cartCount} items`}
                  >
                    <ShoppingBag className="w-6 h-6" />
                    {cartCount > 0 && (
                      <span
                        className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs 
                  min-w-[20px] h-5 flex items-center justify-center rounded-full"
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                filteredProducts={filteredProducts}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isSearchFocused={isSearchFocused}
                setIsSearchFocused={setIsSearchFocused}
                isMobile={true}
              />

              <nav className="flex flex-col">
                {[
                  { href: "/catalog", icon: Grid, label: "Catalog" },
                  { href: "/contact", icon: MessageCircle, label: "Contact" },
                  { href: "/login", icon: LogIn, label: "Log In" },
                ].map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center text-lg text-gray-700 hover:text-blue-600 
                      transition-colors gap-3 p-4 border-b border-gray-100 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={24} />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
