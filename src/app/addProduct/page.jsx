"use client";

import React, { useState } from "react";
import { Upload, Trash2, Save } from "lucide-react";
import Image from "next/image";

const AddProductPage = ({ editingProduct, onSave, onCancel }) => {
  const [productData, setProductData] = useState(
    editingProduct || {
      name: "",
      category: "",
      description: "",
      price: "",
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
    if (!productData.category) newErrors.category = "Category is required";
    if (productData.images.length === 0)
      newErrors.images = "At least one image is required";
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
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

        {/* Description */}
        <div>
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

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images*
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
          {errors.images && (
            <p className="mt-2 text-sm text-red-500">{errors.images}</p>
          )}
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
  );
};

export default AddProductPage;
