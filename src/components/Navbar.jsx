"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart";
import { useUser } from "@/context/user";
import {
  Search,
  ShoppingBag,
  Grid,
  MessageCircle,
  LogIn,
  Menu,
  X,
  LogOut,
  Home,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  Settings,
  Heart,
  Package,
  HelpCircle,
} from "lucide-react";
import SearchingBar from "./SearchBar";

// Announcement Bar Component
const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex justify-between items-center h-10 text-sm">
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-blue-100 transition-colors"
            >
              <Phone size={14} />
              <span>(123) 456-7890</span>
            </a>
            <a
              href="mailto:info@cosmoprof.com"
              className="flex items-center gap-2 hover:text-blue-100 transition-colors"
            >
              <Mail size={14} />
              <span>info@cosmoprof.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>123 Beauty Street, NY 10001</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <span className="text-center flex-1 md:flex-none">
              Free shipping on orders over $50!
            </span>
            <div className="hidden md:flex items-center gap-4">
              <div className="h-4 w-px bg-blue-400"></div>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="hover:text-blue-100 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={14} />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-100 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={14} />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-100 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={14} />
                </a>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="hover:text-blue-100 transition-colors"
              aria-label="Close announcement"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

const UserAvatar = ({ username, size = "w-8 h-8" }) => (
  <div
    className={`${size} rounded-full bg-gradient-to-r from-blue-600 to-blue-700 
    flex items-center justify-center text-white font-medium shadow-lg 
    transform hover:scale-105 transition-all duration-300`}
  >
    {username ? username[0].toUpperCase() : "U"}
  </div>
);

const NavLink = ({ href, icon: Icon, label, onClick = () => {} }) => (
  <Link
    href={href}
    className="flex items-center text-sm text-gray-700 hover:text-blue-600 
    transition-all duration-300 gap-2 group focus:outline-none focus-visible:ring-2 
    focus-visible:ring-blue-500 p-2 rounded-lg hover:bg-blue-50"
    onClick={onClick}
  >
    <Icon
      size={20}
      className="group-hover:scale-110 transition-transform duration-300"
    />
    <span className="font-medium">{label}</span>
  </Link>
);

// Mobile Menu Item Component
const MobileMenuItem = ({ icon: Icon, label, onClick, href }) => {
  const content = (
    <div
      className="flex items-center justify-between p-4 hover:bg-gray-50 
      active:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/catalog", icon: Grid, label: "Catalog" },
    { href: "/contact", icon: MessageCircle, label: "Contact" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-[99] transition-all duration-300 backdrop-blur-md
        ${
          isScrolled
            ? "bg-white/80 shadow-lg"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative focus:outline-none focus-visible:ring-2 
              focus-visible:ring-blue-500 transform hover:scale-105 
              transition-transform duration-300"
              aria-label="Home"
            >
              <img
                src="/favicon.ico"
                alt="COSMO PROF"
                className="h-10 w-auto object-contain"
                loading="eager"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <SearchingBar />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-blue-50 
                    transition-all duration-300 rounded-lg focus:outline-none 
                    focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <UserAvatar username={user.username} />
                    <span className="font-medium text-gray-700">
                      {user.username}
                    </span>
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg 
                      shadow-xl border border-gray-100 py-1 animate-fadeIn"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>

                      <div className="py-2">
                        {/* <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 
                          hover:bg-blue-50 transition-colors gap-2"
                        >
                          <Settings size={18} />
                          <span>Account Settings</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 
                          hover:bg-blue-50 transition-colors gap-2"
                        >
                          <Heart size={18} />
                          <span>My Wishlist</span>
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 
                          hover:bg-blue-50 transition-colors gap-2"
                        >
                          <Package size={18} />
                          <span>My Orders</span>
                        </Link> */}
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm 
                          text-red-600 hover:bg-red-50 transition-colors gap-2"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center text-sm gap-2 px-6 py-2.5
                  bg-blue-600 text-white hover:bg-blue-700 transition-all 
                  duration-300 rounded-lg focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-blue-500 shadow-md hover:shadow-lg"
                >
                  <LogIn size={20} />
                  <span className="font-medium">Log In</span>
                </Link>
              )}

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative p-2.5 hover:bg-blue-50 rounded-lg 
                transition-all duration-300 focus:outline-none 
                focus-visible:ring-2 focus-visible:ring-blue-500 group"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingBag
                  className="w-6 h-6 group-hover:scale-110 
                  transition-transform duration-300"
                />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-blue-600 text-white 
                    text-xs min-w-[20px] h-5 flex items-center justify-center 
                    rounded-full shadow-md animate-bounce"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                href="/cart"
                className="relative p-2 hover:bg-blue-50 rounded-lg 
                transition-all duration-300"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-blue-600 text-white 
                    text-xs min-w-[20px] h-5 flex items-center justify-center 
                    rounded-full animate-bounce"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                className="p-2 hover:bg-blue-50 rounded-lg transition-all 
                duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden -mt-2 pb-4">
            <SearchingBar />
          </div>
          {/* Enhanced Mobile Menu */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] md:hidden animate-fade-in"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Content */}
              <div
                className="fixed inset-0 w-full h-[100dvh] bg-white z-[999] md:hidden 
      animate-menu-slide overflow-auto"
              >
                <div className="flex flex-col min-h-full">
                  <div
                    className="sticky top-0 flex justify-between items-center p-4 
          border-b bg-white"
                  >
                    <Link
                      href="/"
                      className="relative"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img
                        src="/favicon.ico"
                        alt="COSMO PROF"
                        className="h-8 w-auto object-contain"
                      />
                    </Link>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      aria-label="Close menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {user && (
                      <div className="p-4 bg-gray-50">
                        <div className="flex items-center gap-3">
                          <UserAvatar
                            username={user.username}
                            size="w-12 h-12"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <nav className="py-2">
                      {navLinks.map((link) => (
                        <MobileMenuItem
                          key={link.href}
                          {...link}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        />
                      ))}
                    </nav>

                    {user ? (
                      <>
                        <div className="border-t border-gray-100">
                          {/* <MobileMenuItem
                            icon={Settings}
                            label="Account Settings"
                            href="/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                          />
                          <MobileMenuItem
                            icon={Heart}
                            label="My Wishlist"
                            href="/wishlist"
                            onClick={() => setIsMobileMenuOpen(false)}
                          />
                          <MobileMenuItem
                            icon={Package}
                            label="My Orders"
                            href="/orders"
                            onClick={() => setIsMobileMenuOpen(false)}
                          /> */}
                          {/* <MobileMenuItem
                            icon={HelpCircle}
                            label="Help & Support"
                            href="/support"
                            onClick={() => setIsMobileMenuOpen(false)}
                          /> */}
                        </div>
                        <div className="border-t border-gray-100">
                          <MobileMenuItem
                            icon={LogOut}
                            label="Logout"
                            onClick={() => {
                              logout();
                              setIsMobileMenuOpen(false);
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="p-4 border-t border-gray-100">
                        <Link
                          href="/login"
                          className="flex items-center justify-center gap-2 w-full 
                py-3 bg-blue-600 text-white rounded-lg font-medium 
                hover:bg-blue-700 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <LogIn size={20} />
                          <span>Log In</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default memo(Navbar);
