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
} from "lucide-react";
import Image from "next/image";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    // Add more sample products here
  ]);

  // Product Form Component
  const ProductForm = ({ editingProduct, onSave, onCancel }) => {
    const [productData, setProductData] = useState(
      editingProduct || {
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        images: [],
      }
    );

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const categories = [
      "Electronics",
      "Clothing",
      "Home & Garden",
      "Sports",
      "Books",
      "Toys",
      "Beauty",
      "Automotive",
    ];

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
      }));
      setProductData({
        ...productData,
        images: [...productData.images, ...newImages],
      });
    };

    const removeImage = (index) => {
      const newImages = [...productData.images];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      setProductData({ ...productData, images: newImages });
    };

    const validateForm = () => {
      const newErrors = {};
      if (!productData.name) newErrors.name = "Product name is required";
      if (!productData.price) newErrors.price = "Price is required";
      if (!productData.stock) newErrors.stock = "Stock is required";
      if (!productData.category) newErrors.category = "Category is required";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setLoading(true);
      try {
        await onSave(productData);
      } catch (error) {
        console.error("Error saving product:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  className={`block w-full rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                  className={`block w-full rounded-lg border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 focus:border-blue-500 focus:ring-blue-500`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Price */}
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
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({ ...productData, price: e.target.value })
                    }
                    className={`block w-full rounded-lg border ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } pl-7 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock*
                </label>
                <input
                  type="number"
                  value={productData.stock}
                  onChange={(e) =>
                    setProductData({ ...productData, stock: e.target.value })
                  }
                  className={`block w-full rounded-lg border ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  } px-4 py-3 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder="Enter stock quantity"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                )}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              {/* Images */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productData.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={image.url}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400" />
                      <span className="mt-2 block text-sm text-gray-600">
                        Add Images
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulated API call
      // const response = await fetch("/api/products");
      // const data = await response.json();
      // setProductsData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      // Simulated API call
      // await fetch(`/api/products/${productId}`, {
      //   method: "DELETE",
      // });
      setProductsData(
        productsData.filter((product) => product.id !== productId)
      );
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditDialog(true);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      // Simulated API call
      // await fetch(`/api/products/${updatedProduct.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(updatedProduct),
      // });
      setProductsData(
        productsData.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
      setShowEditDialog(false);
      setEditingProduct(null);
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <Package className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-lg z-40`}
      >
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
                setShowEditDialog(true);
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
      <div className="flex-1 p-4 lg:p-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Products
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {productsData.length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Stock
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {productsData.reduce((acc, curr) => acc + curr.stock, 0)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Categories
              </h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {categories.length - 1}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowEditDialog(true);
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
      </div>

      {/* Edit/Add Product Modal */}
      {showEditDialog && (
        <ProductForm
          editingProduct={editingProduct}
          onSave={handleUpdateProduct}
          onCancel={() => {
            setShowEditDialog(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
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
