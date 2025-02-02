// components/ProductCarousel.jsx
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "BIG BOTTLE SALE",
      subtitle: "SAVE UP TO 40%",
      description: "ALL MONTH LONG",
      products: [
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
      ]
    },
    {
      title: "BIG BOTTLE SALE",
      subtitle: "SAVE UP TO 40%",
      description: "ALL MONTH LONG",
      products: [
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
      ]
    },
    {
      title: "BIG BOTTLE SALE",
      subtitle: "SAVE UP TO 40%",
      description: "ALL MONTH LONG",
      products: [
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
      ]
    },
    {
      title: "BIG BOTTLE SALE",
      subtitle: "SAVE UP TO 40%",
      description: "ALL MONTH LONG",
      products: [
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
      ]
    },
    {
      title: "BIG BOTTLE SALE",
      subtitle: "SAVE UP TO 40%",
      description: "ALL MONTH LONG",
      products: [
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
      ]
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#B2E5E5] overflow-hidden">
      <div className="container mx-auto px-8 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <h2 className="text-6xl font-bold text-black animate-fade-in">
              {slides[currentSlide].title}
            </h2>
            <div className="text-4xl font-bold">
              {slides[currentSlide].subtitle}
            </div>
            <p className="text-2xl">{slides[currentSlide].description}</p>
            <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg">
              Shop Now
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {slides[currentSlide].products.map((product, index) => (
              <div 
                key={index}
                className="aspect-square bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform"
              >
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
        className="absolute left-8 md:left-12 lg:left-24 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        ‹
      </button>
      <button 
        onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
        className="absolute right-8 md:right-12 lg:right-24 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        ›
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;