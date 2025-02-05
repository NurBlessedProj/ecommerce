"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  ShoppingBag,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://itapole-backend.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        router.push("/login");
      } else {
        toast.error("An error occurred");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const SimpleNavbar = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/favicon.ico"
              alt="COSMO PROF"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </nav>
  );

  const SimpleFooter = () => (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} COSMO PROF. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link
              href="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
  return (
    <>
      <SimpleNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 pt-20">
        <Card className="max-w-md w-full backdrop-blur-sm bg-white/80 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-8">
            <div className="flex justify-center mb-8">
              <Link href="/" className="relative">
                <img
                  src="/favicon.ico"
                  alt="COSMO PROF"
                  className="h-10 w-auto object-contain rounded-sm" // added rounded-full for circular shape
                />
              </Link>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 transition-all duration-300">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Get started with your free account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Name
                </Label>
                <div className="relative group">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 bg-transparent border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <User className="w-5 h-5 text-gray-400 group-hover:text-black absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 bg-transparent border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-black absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 bg-transparent border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Lock className="w-5 h-5 text-gray-400 group-hover:text-black absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-black transition-colors duration-300" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-black transition-colors duration-300" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 bg-transparent border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <Lock className="w-5 h-5 text-gray-400 group-hover:text-black absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-gray-800 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                Create account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-black hover:text-gray-600 hover:underline transition-all duration-300"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <SimpleFooter />
    </>
  );
};

export default SignupForm;
