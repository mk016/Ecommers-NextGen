// app/admin/products/new/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Dropdown ke liye types
interface Category {
  _id: string;
  title: string;
}

interface SubCategory {
  _id: string;
  title: string;
}

const AdminAddProductPage: React.FC = () => {
  // form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [displayPrice, setDisplayPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isHighlights, setIsHighlights] = useState("");
  const [stock, setStock] = useState<number | string>(0);
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [loading, setLoading] = useState(false);

  // Category & subcategory fetch
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/admin/category");
      setCategories(res.data.categories || res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("/api/admin/subcategories");
      setSubcategories(res.data.subcategories || res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Slug auto-generate (simple)
  const handleTitleChange = (value: string) => {
    setTitle(value);
    const generatedSlug = value.toLowerCase().replace(/\s+/g, "-");
    setSlug(generatedSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || !selectedSubCategory) {
      alert("Please select category and subcategory");
      return;
    }

    if (!imageUrl) {
      alert("Please provide product image URL");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/admin/products/add", {
        title,
        price: Number(price),
        Displayprice: Number(displayPrice),
        discription: description,
        Tgags: tags,
        isHighlights,
        images: [imageUrl],
        slug,
        stock: Number(stock),
        category: selectedCategory,
        subCategory: selectedSubCategory,
      });

      alert("Product created successfully");
      // form reset
      setTitle("");
      setPrice("");
      setDisplayPrice("");
      setDescription("");
      setTags("");
      setIsHighlights("");
      setStock(0);
      setSlug("");
      setImageUrl("");
      setSelectedCategory("");
      setSelectedSubCategory("");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <a
        href="/admin/products"
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back to products
      </a>

      <h1 className="mt-4 text-2xl font-bold">Add New Product</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Display Price (MRP)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={displayPrice}
              onChange={(e) => setDisplayPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Subcategory
            </label>
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              required
            >
              <option value="">Select subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL (abhi simple, baad me Cloudinary upload se integrate kar sakte hai) */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Cloudinary ya kisi bhi image ka direct URL yaha daal sakte ho.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full rounded-lg border px-3 py-2 text-sm"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Tags & Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="e.g. best-seller,new-arrival"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Highlights</label>
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="e.g. Free delivery, 1-year warranty"
              value={isHighlights}
              onChange={(e) => setIsHighlights(e.target.value)}
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/80 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProductPage;
