'use client';

import React from 'react';
import { Home, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8 p-8">
        {/* Large 404 Text */}
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        
        {/* Decorative Elements */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-50 px-4 text-sm text-gray-500">
              page not found
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Oops! Looks like you're lost
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="default"
            className="flex items-center gap-2"
            onClick={() => router.push('/')}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => router.push('/search')}
          >
            <Search className="w-4 h-4" />
            Search Site
          </Button>
        </div>
      </div>
    </div>
      <Footer />
      </>
  );
};

export default NotFoundPage;