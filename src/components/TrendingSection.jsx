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
  Star,
  TrendingDown,
} from "lucide-react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

const bottomBanners = [
  {
    id: 1,
    title: "Premium Skincare",
    subtitle: "Discover Luxury Beauty Solutions",
    image:
      "https://itapelobeautystore.com/cdn/shop/files/IMG_8442.png?v=1717394256&width=360",
    category: "Skincare",
  },
  {
    id: 2,
    title: "Latest Arrivals",
    subtitle: "Be First to Try New Products",
    image:
      "https://itapelobeautystore.com/cdn/shop/files/IMG_8466.png?v=1717487116&width=360",
    category: "New In",
  },
  {
    id: 3,
    title: "Special Offers",
    subtitle: "Limited Time Deals",
    image:
      "https://itapelobeautystore.com/cdn/shop/files/IMG_8471.jpg?v=1717487552&width=360",
    category: "Sale",
  },
];

const TrendingSection = ({ products }) => {
  const router = useRouter();

  // Get top 6 products by rating
  const trendingProducts = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }, [products]);

  return (
    <div className="container max-w-[1350px] mx-auto px-4 py-12">
      {/* Enhanced Header with Trending Icon */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <TrendingDown className="w-6 h-6 text-blue-600 animate-bounce" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Trending Products
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Discover our most-loved beauty essentials with exceptional ratings
          from our community
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {trendingProducts.map((product) => (
          <div key={product._id} className="group">
            <div
              onClick={() => router.push(`/catalog/${product._id}`)}
              className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
            >
              <Image
                src={product.images[0]?.url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay with Quick Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="p-3 bg-white/95 rounded-lg shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-white/95 rounded-lg shadow-lg hover:bg-white transition-colors">
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-black/85 text-white text-xs px-3 py-1.5 rounded-md">
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-md">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Rating Badge */}
              <div className="absolute top-3 right-3">
                <div className="bg-white/95 rounded-lg px-2.5 py-1.5 flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-4 px-1">
              <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="font-medium text-base mt-1 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex flex-col">
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                </div>
                {product.stock < 10 && (
                  <span className="text-xs text-orange-600 font-medium px-2 py-1 bg-orange-50 rounded-md">
                    Only {product.stock} left
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Collections */}
      {/* Featured Collections */}
      <div className="mt-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Featured Collections
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottomBanners.map((banner) => (
            <div
              key={banner.id}
              className="group relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer"
              onClick={() => router.push("/catalog")}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white/90 text-xs font-medium uppercase tracking-wider">
                    {banner.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {banner.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1 mb-3">
                    {banner.subtitle}
                  </p>
                  <button className="px-4 py-2 bg-white text-sm font-medium text-gray-900 rounded inline-flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    Shop Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <Link href="/catalog">
            <button className="group bg-gray-900 text-white px-6 py-3 rounded inline-flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <span className="text-sm font-medium">View Full Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
