"use client";

import React, { useState, useEffect } from "react";
import { Package, Plus, LogOut, Edit, Trash2, Search } from "lucide-react";
import AddProductPage from "../addProduct/page";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([
    {
      id: 1,
      name: "Gaming Laptop",
      category: "Electronics",
      price: 1299,
      stock: 45,
      image: "laptop.jpg",
      description: "High-performance gaming laptop",
    },
    // ... other initial products
  ]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProductsData(
          productsData.filter((product) => product.id !== productId)
        );
        setShowDeleteDialog(false);
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setActiveTab("add-product");
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setProductsData(
          productsData.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        );
        setActiveTab("products");
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filteredProducts = productsData
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    );

  const categories = ["all", ...new Set(productsData.map((p) => p.category))];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                activeTab === "products"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Products</span>
            </button>

            <button
              onClick={() => {
                setEditingProduct(null);
                setActiveTab("add-product");
              }}
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                activeTab === "add-product"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Products
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {productsData.length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Stock
                  </h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {productsData.reduce((acc, curr) => acc + curr.stock, 0)}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Categories
                  </h3>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {categories.length - 1}
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Products
                    </h2>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setActiveTab("add-product");
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-8 text-center">Loading...</div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <Package className="w-6 h-6 text-gray-400" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {product.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${product.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  product.stock > 50
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {product.stock} units
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                                >
                                  <Edit className="w-5 h-5 text-blue-600" />
                                </button>
                                <button
                                  onClick={() => {
                                    setProductToDelete(product);
                                    setShowDeleteDialog(true);
                                  }}
                                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                >
                                  <Trash2 className="w-5 h-5 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "add-product" && (
            <AddProductPage
              editingProduct={editingProduct}
              onSave={handleUpdateProduct}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab("products");
              }}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Are you sure?
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              This action cannot be undone. This will permanently delete the
              product.
            </p>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(productToDelete?.id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
