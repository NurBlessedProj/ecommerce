import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const defaultBanners = [
  {
    id: 1,
    title: "LUXURY BODY CARE",
    subtitle: "SAVE 30% TODAY",
    description: "Premium Body Lotions for Professional Care",
    cta: "Shop Now",
    image:
      "/images/c1.jpg",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "PROFESSIONAL GRADE",
    subtitle: "NEW COLLECTION",
    description: "Discover Our Range of Body Treatment Products",
    cta: "Explore More",
    image:
      "/images/c2.jpg",
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

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentBanner]);

  const handleNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentBanner((current) =>
        current === banners.length - 1 ? 0 : current + 1
      );
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const handlePrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentBanner((current) =>
        current === 0 ? banners.length - 1 : current - 1
      );
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out
              ${
                currentBanner === index
                  ? "opacity-100 translate-x-0"
                  : index < currentBanner
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
                }`}
                aria-hidden={currentBanner !== index}
                >
            {/* Background Image */}
                <div className="absolute h-full w-full top-0 left-0 bg-black/30 z-[99]"></div>
            <img
              src={banner.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"
              style={{ pointerEvents: "none" }}
            />

            {/* Content Layer */}
            <div className="absolute z-[999] inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center px-4 max-w-5xl mx-auto">
                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 
                    ${banner.textColor} tracking-tight leading-tight
                    transform transition-all duration-700 delay-200
                    ${
                      currentBanner === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                >
                  {banner.title}
                </h1>

                <p
                  className={`text-2xl md:text-4xl lg:text-5xl font-light mb-8
                    ${banner.textColor} tracking-wide
                    transform transition-all duration-700 delay-300
                    ${
                      currentBanner === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
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
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                >
                  {banner.description}
                </p>

                <button
                  onClick={() => router.push("/catalog")}
                  className={`pointer-events-auto inline-flex items-center bg-white text-black px-8 py-4 
                    text-lg md:text-xl hover:bg-black hover:text-white 
                    transition-all duration-300 transform
                    ${
                      currentBanner === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                >
                  <span>{banner.cta}</span>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform ml-2" />
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
            transform hover:scale-105 backdrop-blur-sm"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-black transition-colors" />
        </button>
        <button
          onClick={handleNextSlide}
          className="pointer-events-auto group p-3 bg-black/20 hover:bg-white/90 transition-all duration-300
            transform hover:scale-105 backdrop-blur-sm"
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
              onClick={() => !isTransitioning && setCurrentBanner(index)}
              className="pointer-events-auto group relative h-2 w-12 focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className="absolute inset-0 bg-white/40 transform transition-all duration-300
                group-hover:bg-white/60"
              />
              <div
                className={`absolute inset-0 bg-white transition-all duration-[6000ms] ease-linear
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
