"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Search,
  Book,
  ShoppingBag,
  Info,
  PhoneIcon,
  MapPinIcon,
  // MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: "Search", href: "/search" },
      { name: "Catalog", href: "/catalog" },
      { name: "Contact", href: "/contact" },
    ],
    info: [
      { name: "Refund Policy", href: "/refund" },
      { name: "Terms of Service", href: "/terms" },
    ],
    catalog: [
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Best Sellers", href: "/best-sellers" },
      { name: "Special Offers", href: "/offers" },
      { name: "Product Categories", href: "/categories" },
    ],
    contact: [
      {
        icon: Mail,
        content: "support@itapelo.com",
        href: "mailto:support@itapelo.com",
      },
      {
        icon: PhoneIcon,
        content: "+1 (800) Itapelo",
        href: "tel:+18002676677",
      },
      {
        icon: MapPinIcon,
        content: "123 Beauty Boulevard, Suite 100, New York, NY 10001",
        href: "https://maps.google.com",
      },
    ],
  };

  return (
    <footer className="bg-white text-gray-600">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Join Our Beauty Community
              </h3>
              <p className="text-gray-600">
                Subscribe to receive exclusive offers, beauty tips, and
                professional insights.
              </p>
            </div>
            <div>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-6">
              <img
              src="/favicon.ico"
              alt="COSMO PROF"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 mb-6 pr-4">
              Your trusted destination for professional beauty supplies and
              expert solutions. Empowering beauty professionals with premium
              products and exceptional service.
            </p>
            <div className="flex gap-4">
              {/* Social Media Icons */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Information</h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((item) => (
                <li key={item.content}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.content}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © {currentYear} ITAPELO. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Professional Beauty Supply</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
