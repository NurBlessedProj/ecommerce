import { ChevronLeft, ChevronRight, Star, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Licensed Esthetician",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    quote:
      "The professional body care products have transformed my spa treatments. My clients love the results!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Spa Owner",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    quote:
      "Superior quality body lotions that meet our high standards. The organic options are particularly popular.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Massage Therapist",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    quote:
      "These professional-grade body lotions provide the perfect consistency for treatments.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lisa Thompson",
    role: "Beauty Influencer",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    quote:
      "I've tried countless body lotions, but these are truly exceptional. My followers love my recommendations!",
    rating: 5,
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Dermatologist",
    location: "Houston, TX",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    quote:
      "I recommend these products to my patients. The results speak for themselves.",
    rating: 5,
  },
  {
    id: 6,
    name: "Jennifer Lee",
    role: "Wellness Coach",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    quote:
      "The perfect blend of luxury and effectiveness. My clients see amazing results.",
    rating: 5,
  },
];
function ReviewsSection({ products, mainContentClass }) {
  const [displayCount, setDisplayCount] = useState({
    products: 1,
    testimonials: 1,
  });
  const [isMobile, setIsMobile] = useState(true); 
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleTestimonialSlide = (direction) => {
    const maxSlides =
      Math.ceil(testimonials.length / displayCount.testimonials) - 1;

    if (direction === "prev") {
      setCurrentTestimonial((prev) => (prev === 0 ? maxSlides : prev - 1));
    } else if (direction === "next") {
      setCurrentTestimonial((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }
  };
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      // Set product display count
      if (width < 640) {
        setDisplayCount((prev) => ({ ...prev, products: 1 })); // Mobile
      } else if (width < 768) {
        setDisplayCount((prev) => ({ ...prev, products: 2 })); // Small tablet
      } else if (width < 1024) {
        setDisplayCount((prev) => ({ ...prev, products: 3 })); // Large tablet
      } else {
        setDisplayCount((prev) => ({ ...prev, products: 4 })); // Desktop
      }

      // Set testimonial display count
      if (width < 768) {
        setDisplayCount((prev) => ({ ...prev, testimonials: 1 })); // Mobile
      } else if (width < 1024) {
        setDisplayCount((prev) => ({ ...prev, testimonials: 2 })); // Tablet
      } else {
        setDisplayCount((prev) => ({ ...prev, testimonials: 3 })); // Desktop
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleSlide = (direction) => {
    if (direction === "prev" && currentProduct > 0) {
      setCurrentProduct(currentProduct - 1);
    } else if (
      direction === "next" &&
      currentProduct < products.length - displayCount.products
    ) {
      setCurrentProduct(currentProduct + 1);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className={mainContentClass}>
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* Google Logo SVG */}
            <div className="flex items-center">
              <svg viewBox="0 0 74 24" className="h-7 sm:h-8">
                <path
                  d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z"
                  fill="#4285F4"
                />
                <path
                  d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
                  fill="#EA4335"
                />
                <path
                  d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z"
                  fill="#4285F4"
                />
                <path
                  d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
                  fill="#FBBC05"
                />
                <path d="M58 .24h2.51v17.57H58z" fill="#34A853" />
                <path
                  d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z"
                  fill="#EA4335"
                />
              </svg>
              <span className="ml-1 text-lg sm:text-xl font-medium text-gray-800">
                Reviews
              </span>
            </div>
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <div className="flex items-center">
              <span className="font-semibold text-lg sm:text-xl text-gray-800">
                4.9
              </span>
              <div className="flex text-yellow-400 mx-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm sm:text-base">
                (2,394)
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Read trusted reviews from our customers
          </p>
        </div>

        <div className="relative px-4 sm:px-6">
          <div className="overflow-hidden -mx-4 sm:mx-0">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentTestimonial * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] px-2 sm:px-3 md:px-4"
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start mb-4">
                      <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-lg sm:text-xl font-medium uppercase">
                          {testimonial.name[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                          {/* Google 'G' Logo */}
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            {Array.from({ length: testimonial.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-3 h-3 sm:w-4 sm:h-4 fill-current"
                                />
                              )
                            )}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {testimonial.date || "2 weeks ago"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                      <span>Verified Purchase</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => handleTestimonialSlide("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-3 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-md sm:rounded-xl shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentTestimonial === 0}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
          <button
            onClick={() => handleTestimonialSlide("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-md sm:rounded-xl shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              currentTestimonial >=
              testimonials.length - displayCount.testimonials
            }
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>

          {/* Pagination Dots */}
          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2">
            {[
              ...Array(
                Math.ceil(testimonials.length / displayCount.testimonials)
              ),
            ].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                  currentTestimonial === index
                    ? "bg-blue-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
