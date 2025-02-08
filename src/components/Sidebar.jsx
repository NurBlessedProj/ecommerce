"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Star, Tag, X } from "lucide-react";
import RangeSlider from "./RangleSlider";

const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
    transition: background-color 0.2s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f1f1;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .mobile-filter-enter {
    animation: slideIn 0.3s ease-out;
  }
  
  .mobile-backdrop-enter {
    animation: fadeIn 0.2s ease-out;
  }
`;

const Sidebar = ({
  filters,
  setFilters,
  priceRange,
  setPriceRange,
  ratingFilter,
  setRatingFilter,
  showFilters,
  onClose,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    rating: true,
  });

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 0);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filterOptions = {
    categories: [
      { name: "Skincare", icon: "✨", count: 120, color: "bg-pink-50" },
      { name: "Haircare", icon: "💇", count: 85, color: "bg-purple-50" },
      { name: "Makeup", icon: "💄", count: 150, color: "bg-red-50" },
      { name: "Tools", icon: "🛠️", count: 45, color: "bg-gray-50" },
      { name: "Fragrance", icon: "🌸", count: 30, color: "bg-rose-50" },
      { name: "Body Care", icon: "🧴", count: 65, color: "bg-blue-50" },
      { name: "Natural", icon: "🌿", count: 55, color: "bg-green-50" },
      { name: "Organic", icon: "🍃", count: 40, color: "bg-emerald-50" },
      { name: "Vegan", icon: "🌱", count: 35, color: "bg-lime-50" },
      { name: "Luxury", icon: "✨", count: 25, color: "bg-yellow-50" },
    ],
    ratings: [5, 4, 3, 2, 1],
  };

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      brand: "all",
      sortBy: "newest",
    });
    setPriceRange([0, 1000]);
    setRatingFilter(0);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-[9999] mobile-backdrop-enter"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 right-0 z-[9999] md:z-[1] w-[85%] max-w-[400px] bg-white md:relative md:w-72 md:flex-shrink-0
          transform transition-all duration-300 ease-in-out shadow-xl md:shadow-none
          ${
            showFilters
              ? "translate-x-0 mobile-filter-enter"
              : "translate-x-full md:translate-x-0"
          }
        `}
      >
        <style jsx>{scrollbarStyles}</style>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <p className="text-sm text-gray-500 mt-1">Refine your search</p>
        </div>

        {/* Scrollable Content */}
        <div
          className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] overflow-y-auto scroll-smooth pb-24 md:pb-0"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f1f1",
          }}
        >
          {/* Filter Sections */}
          <div className="divide-y divide-gray-100">
            {/* Categories Section */}
            <div className="p-6">
              <button
                onClick={() => toggleSection("categories")}
                className="flex items-center justify-between w-full group mb-4"
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  <span className="font-medium text-gray-900 group-hover:text-blue-600">
                    Categories
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.categories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSections.categories && (
                <div className="space-y-2">
                  {filterOptions.categories.map((category) => (
                    <label
                      key={category.name}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}
                        >
                          <span className="text-lg">{category.icon}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                            {category.name}
                          </span>
                          <span className="text-xs text-gray-400 block">
                            {category.count} items
                          </span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={filters.category === category.name}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            category:
                              filters.category === category.name
                                ? "all"
                                : category.name,
                          }))
                        }
                        className="w-4 h-4 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Section */}
            <div className="p-6">
              <button
                onClick={() => toggleSection("priceRange")}
                className="flex items-center justify-between w-full group mb-4"
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  <span className="font-medium text-gray-900 group-hover:text-blue-600">
                    Price Range
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.priceRange ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSections.priceRange && (
                <div className="space-y-6">
                  <RangeSlider
                    min={0}
                    max={1000}
                    value={priceRange}
                    onChange={setPriceRange}
                  />
                </div>
              )}
            </div>

            {/* Rating Section */}
            <div className="p-6">
              <button
                onClick={() => toggleSection("rating")}
                className="flex items-center justify-between w-full group mb-4"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  <span className="font-medium text-gray-900 group-hover:text-blue-600">
                    Rating
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.rating ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSections.rating && (
                <div className="space-y-2">
                  {filterOptions.ratings.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(rating)}
                      className={`w-full p-2 rounded-lg flex items-center justify-between transition-colors ${
                        ratingFilter === rating
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current text-yellow-400"
                          />
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <Star
                            key={i + rating}
                            className="w-4 h-4 text-gray-300"
                          />
                        ))}
                      </div>
                      <span className="text-sm">&amp; Up</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50">
          <div className="flex gap-3">
            <button
              onClick={handleResetFilters}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Desktop Reset Button */}
        <div className="hidden md:block sticky bottom-0 p-6 bg-white border-t border-gray-100">
          <button
            onClick={handleResetFilters}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
