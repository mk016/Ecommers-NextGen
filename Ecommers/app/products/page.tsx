// app/products/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";

interface ApiResponse {
  success: boolean;
  count: number;
  products: ProductCardProps[];
  message?: string;
}

// Product Listing Page
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  // ye function API se products fetch karega
  const fetchProducts = async (searchTerm: string = "") => {
    try {
      setLoading(true);
      setError(null);

      // /api/products?search=... call karega
      const response = await axios.get<ApiResponse>("/api/products", {
        params: searchTerm ? { search: searchTerm } : undefined,
      });

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Page load pe ek baar call
  useEffect(() => {
    fetchProducts();
  }, []);

  // Search handle function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page heading */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">All Products</h1>

        {/* Search bar */}
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
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading products...
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center py-10 text-red-500">{error}</div>
      )}

      {/* No products */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products found. Try different search.
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
