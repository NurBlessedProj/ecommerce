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
  Eye,
  EyeOff,
  ArrowLeft,
  Github,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SimpleNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
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
          className="group flex items-center text-sm text-gray-600 hover:text-gray-900 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Link>
      </div>
    </div>
  </nav>
);

const SimpleFooter = () => (
  <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} COSMO PROF. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <Link
            href="/privacy"
            className="hover:text-gray-900 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link
            href="/terms"
            className="hover:text-gray-900 transition-colors duration-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

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

  return (
    <>
      <SimpleNavbar />
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-white to-purple-100 py-12 px-4 pt-20">
        <div className="max-w-md w-full space-y-8">
          <Card className="backdrop-blur-lg bg-white/90 shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 rounded-2xl overflow-hidden">
            <CardContent className="pt-8 px-8">
              <div className="flex justify-center mb-8">
                <Link href="/" className="relative group">
                  <img
                    src="/favicon.ico"
                    alt="COSMO PROF"
                    className="h-12 w-auto object-contain rounded-sm transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  Create an account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Join us and start your journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <User className="w-5 h-5 text-gray-400 group-hover:text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-10 pr-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Lock className="w-5 h-5 text-gray-400 group-hover:text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-10 pr-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <Lock className="w-5 h-5 text-gray-400 group-hover:text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg rounded-xl py-6"
                >
                  Create account
                  <ArrowRight className="ml-2 w-4 h-4 animate-bounce-x" />
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

            
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
                >
                  Already have an account?{" "}
                  <span className="font-semibold text-blue-600 hover:text-blue-800">
                    Sign in
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <SimpleFooter />
    </>
  );
};

export default SignupForm;
