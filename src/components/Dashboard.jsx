"use client";

import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  LogOut,
  Edit,
  Trash2,
  Search,
  Upload,
  Save,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import Link from "next/link";

const Dashboard = () => {
  // State management
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState([]); // Change to array

  const { logout } = useAuth();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreview(previews);
    }
  };

  const API_URL = "https://itapole-backend.onrender.com/api";

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async (formData) => {
    try {
      setLoading(true);

      const url = selectedProduct
        ? `${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/products`;

      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log("FormData entry:", pair[0], pair[1]);
      }

      const response = await fetch(url, {
        method: selectedProduct ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        fetchProducts();
        setShowEditModal(false);
        setSelectedProduct(null);
        setImagePreview([]);
      } else {
        throw new Error(data.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      // You might want to show this error to the user
      alert(`Error saving product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const confirmDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchProducts();
        setShowDeleteModal(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [
    "all",
    "Makeup",
    "Skincare",
    "Haircare",
    "Fragrance",
    "Body Care",
    "Tools",
  ];

  // Handlers
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-lg z-40 flex flex-col`}
        >
          <div className="p-6 border-b flex flex-col gap-3 border-gray-200">
            <Link href="/" className="relative">
              <img
                src="/favicon.ico"
                alt="COSMO PROF"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <h1 className="text-sm font-bold text-gray-800">Admin Dashboard</h1>
          </div>

          <nav className="flex-1 p-4">
            <button
              onClick={() => {
                setShowEditModal(true);
                setSelectedProduct(null);
                setImagePreview(null);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 w-screen">
          <div className="p-4 lg:p-8">
            {/* Search and filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Products table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">
                  Products
                </h2>
              </div>

              <div className="relative overflow-x-auto">
                <div className="max-h-[calc(100vh-190px)] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            Loading...
                          </td>
                        </tr>
                      ) : filteredProducts.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No products found
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product) => (
                          <tr key={product._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex -space-x-2 overflow-hidden">
                                  {product.images ? (
                                    product.images
                                      .slice(0, 1)
                                      .map((image, index) => (
                                        <div
                                          key={index}
                                          className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center border-2 border-white"
                                        >
                                          <Image
                                            src={image.url}
                                            alt={`${product.name} image ${
                                              index + 1
                                            }`}
                                            width={40}
                                            height={40}
                                            className="rounded-md object-cover"
                                          />
                                        </div>
                                      ))
                                  ) : (
                                    <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center">
                                      <Package className="w-6 h-6 text-gray-400" />
                                    </div>
                                  )}
                                  {product.images &&
                                    product.images.length > 3 && (
                                      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center border-2 border-white">
                                        <span className="text-xs text-gray-600">
                                          +{product.images.length - 3}
                                        </span>
                                      </div>
                                    )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                  <div className="hidden sm:block text-sm text-gray-500">
                                    {product.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {product.category}
                              </span>
                            </td>
                            <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${product.price.toLocaleString()}
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
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
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                                >
                                  <Edit className="w-5 h-5 text-blue-600" />
                                </button>
                                <button
                                  onClick={() => handleDelete(product)}
                                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                >
                                  <Trash2 className="w-5 h-5 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {selectedProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedProduct(null);
                  setImagePreview(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form
              encType="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(); // Create FormData here instead

                formData.append("name", e.target.name.value);
                formData.append("category", e.target.category.value);
                formData.append("price", e.target.price.value);
                formData.append("stock", e.target.stock.value);
                formData.append("description", e.target.description.value);

                // Handle multiple files directly
                const files = e.target.productImage.files;
                if (files && files.length > 0) {
                  for (let i = 0; i < files.length; i++) {
                    formData.append("productImage", files[i]);
                  }
                }

                handleSave(formData);
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedProduct?.name}
                    required
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    name="category"
                    defaultValue={selectedProduct?.category}
                    required
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories
                      .filter((c) => c !== "all")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price*
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      defaultValue={selectedProduct?.price}
                      required
                      step="0.01"
                      min="0"
                      className="block w-full rounded-md border border-gray-300 pl-7 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock*
                  </label>
                  <input
                    type="number"
                    name="stock"
                    defaultValue={selectedProduct?.stock}
                    required
                    min="0"
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedProduct?.description}
                    rows={4}
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image
                  </label>
                  <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex flex-wrap gap-2">
                      {imagePreview && imagePreview.length > 0 ? (
                        imagePreview.map((preview, index) => (
                          <div
                            key={index}
                            className="w-32 h-32 border rounded-md overflow-hidden bg-gray-100 flex-shrink-0"
                          >
                            <Image
                              src={preview}
                              alt={`Product preview ${index + 1}`}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : selectedProduct?.images ? (
                        selectedProduct.images.map((image, index) => (
                          <div
                            key={index}
                            className="w-32 h-32 border rounded-md overflow-hidden bg-gray-100 flex-shrink-0"
                          >
                            <Image
                              src={image.url}
                              alt={`Product image ${index + 1}`}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="w-32 h-32 border rounded-md overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <label className="cursor-pointer flex-grow">
                      <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                        <Upload className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Upload Image
                        </span>
                      </div>
                      <input
                        type="file"
                        name="productImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple // Add this
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                    setImagePreview(null);
                  }}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? "Saving..." : "Save Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Product
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
