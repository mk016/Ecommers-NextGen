// app/admin/products/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// product ka basic type
interface AdminProduct {
  _id: string;
  title: string;
  price: number;
  Displayprice: number;
  slug: string;
  stock: number;
}

interface ApiResponse {
  success: boolean;
  products: AdminProduct[];
  count: number;
  message?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  // Products load karne ka function
  const fetchProducts = async (searchTerm: string = "") => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<ApiResponse>("/api/admin/products", {
        params: searchTerm ? { search: searchTerm } : undefined,
      });

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError(response.data.message || "Failed to load products");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  // delete handler
  const handleDelete = async (id: string) => {
    const sure = confirm("Are you sure you want to delete this product?");
    if (!sure) return;

    try {
      await axios.delete(`/api/admin/products/${id}`);
      // local state se bhi remove kar dete hain
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Admin – Products</h1>

        <div className="flex gap-2">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 w-full md:w-72"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/70"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Search
            </button>
          </form>

          {/* Add new product button */}
          <a
            href="/admin/products/new"
            className="rounded-lg bg-black text-white px-3 py-2 text-sm font-medium hover:bg-black/80"
          >
            + Add Product
          </a>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading products...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-10 text-red-500">{error}</div>
      )}

      {/* Table */}
      {!loading && !error && products.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Title</th>
                <th className="px-4 py-2 text-left font-medium">Price</th>
                <th className="px-4 py-2 text-left font-medium">
                  Display Price
                </th>
                <th className="px-4 py-2 text-left font-medium">Stock</th>
                <th className="px-4 py-2 text-left font-medium">Slug</th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">₹{p.price}</td>
                  <td className="px-4 py-2">₹{p.Displayprice}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">{p.slug}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <a
                      href={`/admin/products/new/${p._id}`}
                      className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-100"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="rounded-lg border px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No data */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products found. Create your first one!
        </div>
      )}
    </div>
  );
}
