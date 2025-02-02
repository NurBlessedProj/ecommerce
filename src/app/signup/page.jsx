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
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 pt-20">
        <Card className="max-w-md w-full backdrop-blur-sm bg-white/80 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-8">
            <div className="flex justify-center mb-8">
              <Link href="/" className="relative">
                <img
                  src="/logo.avif"
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
      <Footer />
    </>
  );
};

export default SignupForm;
