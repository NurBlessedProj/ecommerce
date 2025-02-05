import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Eye,
  ArrowRight,
  Users,
  Package,
  TrendingUp,
  Truck,
} from "lucide-react";

const TrendingSection = ({
  categories,
  trendingItems,
  bottomBanners,
  activeCategory,
  setActiveCategory,
  router,
}) => {
  return (
    <div className="container max-w-[1350px] mx-auto px-4 py-8">
      {/* Main Header */}
      <div className="text-center mb-8">
        <span className="text-blue-600 text-xs md:text-sm font-medium tracking-wider uppercase block mb-2">
          Discover What's Hot
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Get inspired with must-have products and exclusive sales events
          curated just for you
        </p>
      </div>

      {/* Categories Quick Access */}
      <div className="relative mb-6">
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                ${
                  activeCategory === category.id
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {trendingItems.map((item) => (
          <div key={item.id} className="group">
            <div
              onClick={() => router.push("/catalog")}
              className="relative aspect-[3/4] rounded-md overflow-hidden bg-gray-100"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Overlay with Quick Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="p-2 bg-white/95 rounded-md shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white/95 rounded-md shadow-lg hover:bg-white transition-colors">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Badge */}
              {item.badge && (
                <div className="absolute top-2 left-2">
                  <span className="bg-yellow-400/90 text-black text-xs px-2 py-1 rounded-md">
                    {item.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="mt-3">
              <h3 className="font-medium text-sm text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              {item.category && (
                <span className="text-xs text-gray-500 mt-1 block">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Collections */}
      <div className="mt-12">
        <h3 className="text-xl md:text-2xl font-bold mb-6">
          Featured Collections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottomBanners.map((banner) => (
            <div
              key={banner.title}
              className="group relative aspect-video rounded-md overflow-hidden"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    {banner.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="text-white/90 text-sm mt-2 line-clamp-2">
                      {banner.subtitle}
                    </p>
                  )}
                  <button
                    onClick={() => router.push("/catalog")}
                    className="mt-4 px-4 py-2 bg-white/90 rounded-md text-sm font-medium hover:bg-white transition-colors inline-flex items-center gap-2"
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 py-8 border-t border-gray-200">
        {[
          { icon: Users, title: "10K+", subtitle: "Happy Customers" },
          { icon: Package, title: "15K+", subtitle: "Products Available" },
          { icon: TrendingUp, title: "98%", subtitle: "Positive Feedback" },
          { icon: Truck, title: "24/7", subtitle: "Fast Delivery" },
        ].map((stat) => (
          <div key={stat.subtitle} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <stat.icon className="w-6 h-6" />
            </div>
            <h4 className="text-lg md:text-2xl font-bold">{stat.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <Link href="/catalog">
          <button className="group bg-black text-white px-8 py-3 rounded-md transition-all hover:bg-gray-900 inline-flex items-center gap-2">
            <span className="text-base font-medium">View Full Catalog</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingSection;
