"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Home, Settings } from "lucide-react"; // Using lucide icons

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="relative">
              <img
                src="/favicon.ico"
                alt="COSMO PROF"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(username, password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <div className="text-center">
              <div className="flex justify-center">
                <Link href="/" className="relative">
                  <img
                    src="/favicon.ico"
                    alt="COSMO PROF"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                Admin Login
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
