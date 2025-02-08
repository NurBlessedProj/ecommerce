"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Info,
  PhoneIcon,
  MapPinIcon,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscribe, setSubscribe] = useState("");

  const footerLinks = {
    quickLinks: [
      { name: "Catalog", href: "/catalog" },
      { name: "Contact", href: "/contact" },
    ],
    info: [
      { name: "Refund Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
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
    social: [
      { icon: Facebook, href: "#", color: "hover:bg-[#1877F2]" },
      { icon: Instagram, href: "#", color: "hover:bg-[#E4405F]" },
      { icon: Twitter, href: "#", color: "hover:bg-[#1DA1F2]" },
      { icon: Youtube, href: "#", color: "hover:bg-[#FF0000]" },
    ],
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success(`Thanks for Subscribing ${subscribe}`);
    setSubscribe("");
  };
  return (
    <footer className="relative bg-white">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r " />

      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Join Our Beauty Community
            </h3>
            <p className="text-gray-600 mb-8">
              Subscribe to receive exclusive offers, beauty tips, and
              professional insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                value={subscribe}
                onChange={(e) => setSubscribe(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] flex items-center justify-center gap-2 font-medium"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-6">
              <img
                src="/favicon.ico"
                alt="ITAPELO"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your trusted destination for professional beauty supplies and
              expert solutions. Empowering beauty professionals with premium
              products and exceptional service.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 ${item.color} hover:text-white transition-all duration-300 transform hover:scale-110`}
                  >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

                  {/* Contact */}
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-6">Contact Us</h3>
                    <ul className="space-y-4">
                      {footerLinks.contact.map((item) => (
                        <li key={item.content}>
                          <a
                            href={item.href}
                            className="group flex items-start gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={
                              item.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            <item.icon className="w-5 h-5 mt-1 flex-shrink-0" />
                            <span className="text-sm leading-relaxed group-hover:underline">
                              {item.content}
                            </span>
                            {item.href.startsWith("http") && (
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
          {/* Quick Links & Info Combined */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[...footerLinks.quickLinks].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Information</h3>
            <ul className="space-y-4">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              © {currentYear} ITAPELO
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <Link
                href="/terms"
                className="hover:text-blue-600 transition-colors"
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
