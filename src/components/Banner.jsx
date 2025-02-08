"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const defaultBanners = [
  {
    id: 1,
    title: "LUXURY BODY CARE",
    subtitle: "SAVE 30% TODAY",
    description: "Premium Body Lotions for Professional Care",
    cta: "Shop Now",
    image: "/images/c1.jpg",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "PROFESSIONAL GRADE",
    subtitle: "NEW COLLECTION",
    description: "Discover Our Range of Body Treatment Products",
    cta: "Explore More",
    image: "/images/c2.jpg",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "EXCLUSIVE OFFER",
    subtitle: "LIMITED TIME",
    description: "Professional Body Care Solutions",
    cta: "Shop Collection",
    image: "/images/c3.jpg",
    textColor: "text-white",
  },
];

const Banner = ({ banners = defaultBanners }) => {
  const router = useRouter();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideRef = useRef(null);

  useEffect(() => {
    banners.forEach((banner) => {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.href = banner.image;
      document.head.appendChild(preloadLink);
    });
  }, [banners]);
  const handleSlideChange = useCallback(
    (newIndex) => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentBanner(newIndex);
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    },
    [isTransitioning]
  );

  const handleNextSlide = useCallback(() => {
    const nextIndex =
      currentBanner === banners.length - 1 ? 0 : currentBanner + 1;
    handleSlideChange(nextIndex);
  }, [currentBanner, banners.length, handleSlideChange]);

  const handlePrevSlide = useCallback(() => {
    const prevIndex =
      currentBanner === 0 ? banners.length - 1 : currentBanner - 1;
    handleSlideChange(prevIndex);
  }, [currentBanner, banners.length, handleSlideChange]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement?.tagName === "INPUT") return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevSlide();
          break;
        case "ArrowRight":
          handleNextSlide();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevSlide, handleNextSlide]);

  // Auto-play
  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(handleNextSlide, 6000);
    }
    return () => clearInterval(timer);
  }, [handleNextSlide, isPaused]);

  return (
    <section
      className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={slideRef}
      role="region"
      aria-label="Banner Slideshow"
    >
      {/* Slides */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out
            ${
              currentBanner === index
                ? "opacity-100 translate-x-0 scale-100"
                : index < currentBanner
                ? "opacity-0 -translate-x-full scale-95"
                : "opacity-0 translate-x-full scale-95"
            }`}
            aria-hidden={currentBanner !== index}
          >
            {/* Background Image */}
            <div className="absolute h-full w-full top-0 left-0 bg-black/30 z-[99]" />
            <div className="relative w-full h-full">
              <Image
                src={banner.image}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                quality={90}
                className="object-cover object-center"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"
              style={{ pointerEvents: "none" }}
            />

            {/* Content Layer */}
            <div className="absolute z-[999] inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center px-4 max-w-5xl mx-auto">
                <h2
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 
                  ${banner.textColor} tracking-tight leading-tight
                  transform transition-all duration-700 delay-200
                  ${
                    currentBanner === index
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }`}
                >
                  {banner.title}
                </h2>

                <p
                  className={`text-2xl md:text-4xl lg:text-5xl font-light mb-8
                  ${banner.textColor} tracking-wide
                  transform transition-all duration-700 delay-300
                  ${
                    currentBanner === index
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }`}
                >
                  {banner.subtitle}
                </p>

                <p
                  className={`text-lg md:text-xl lg:text-2xl mb-10 
                  ${banner.textColor} max-w-2xl mx-auto
                  transform transition-all duration-700 delay-400
                  ${
                    currentBanner === index
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }`}
                >
                  {banner.description}
                </p>

                <button
                  onClick={() => router.push("/catalog")}
                  className={`pointer-events-auto inline-flex items-center bg-white text-black px-8 py-4 
                  text-lg md:text-xl hover:bg-black hover:text-white 
                  transition-all duration-300 transform group
                  ${
                    currentBanner === index
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }`}
                >
                  <span>{banner.cta}</span>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={handlePrevSlide}
          className="pointer-events-auto group p-3 bg-black/20 hover:bg-white/90 transition-all duration-300
          transform hover:scale-105 backdrop-blur-sm rounded-full"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-black transition-colors" />
        </button>
        <button
          onClick={handleNextSlide}
          className="pointer-events-auto group p-3 bg-black/20 hover:bg-white/90 transition-all duration-300
          transform hover:scale-105 backdrop-blur-sm rounded-full"
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-0 right-0 pointer-events-none">
        <div className="flex justify-center gap-4 px-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => !isTransitioning && handleSlideChange(index)}
              className="pointer-events-auto group relative h-2 w-12 focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentBanner === index}
            >
              <div
                className="absolute inset-0 bg-white/40 transform transition-all duration-300
              group-hover:bg-white/60 rounded-full"
              />
              <div
                className={`absolute inset-0 bg-white transition-all duration-[6000ms] ease-linear rounded-full
                ${currentBanner === index ? "w-full" : "w-0"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
