import {
  ArrowRight,
  Award,
  CheckCircle,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import React from "react";

const features = [
  {
    id: 1,
    title: "Free US Shipping",
    description:
      "Complimentary shipping on all orders within the United States",
    icon: Truck,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
    points: [
      "Fast delivery nationwide",
      "Order tracking available",
      "Secure packaging",
    ],
  },
  {
    id: 2,
    title: "Authentic Products",
    description: "100% genuine products sourced directly from manufacturers",
    icon: ShieldCheck,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-600",
    points: [
      "Verified suppliers",
      "Quality guaranteed",
      "Original formulations",
    ],
  },
  {
    id: 3,
    title: "Customer Care",
    description: "Dedicated support team for all your beauty needs",
    icon: HeartHandshake,
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    gradientFrom: "from-violet-500",
    gradientTo: "to-violet-600",
    points: ["Expert advice", "Easy returns", "Responsive support"],
  },
  {
    id: 4,
    title: "Premium Selection",
    description: "Wide range of exotic beauty products from around the globe",
    icon: Sparkles,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    gradientFrom: "from-amber-500",
    gradientTo: "to-amber-600",
    points: [
      "International brands",
      "Exclusive products",
      "Regular new arrivals",
    ],
  },
];

function PerfectSection({ mainContentClass }) {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-y-0 left-0 -translate-x-1/2 w-full bg-gradient-to-r from-blue-50/50 to-transparent" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-50 to-transparent rounded-full mix-blend-multiply blur-3xl" />
      </div>

      <div className={`${mainContentClass} relative z-10`}>
        {/* Enhanced Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-violet-50 mb-6">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Why People Trust Us
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            The Perfect Choice for Your Beauty Needs
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Experience excellence in beauty care with our professional solutions
            and dedicated service
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { number: "15K+", label: "Products", color: "blue" },
            { number: "50K+", label: "Happy Clients", color: "emerald" },
            { number: "99%", label: "Satisfaction Rate", color: "violet" },
            { number: "24/7", label: "Support", color: "amber" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              <div className="relative z-10">
                <div
                  className={`text-3xl font-bold text-${stat.color}-600 mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
              <div
                className={`absolute inset-0 bg-${stat.color}-50/0 group-hover:bg-${stat.color}-50/50 rounded-xl transition-colors duration-300`}
              />
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} opacity-5 rounded-xl`}
                />
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div
                  className={`w-14 h-14 ${feature.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Feature Points */}
              <ul className="space-y-3">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <CheckCircle
                      className={`w-5 h-5 mr-3 ${feature.iconColor}`}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 px-8 py-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">
                Trusted by Professional Beauticians
              </span>
            </div>
            <div className="h-6 hidden md:block w-px bg-gray-200" />
            <button className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <span className="text-sm font-medium">Contact Us</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerfectSection;
