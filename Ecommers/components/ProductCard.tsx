// components/ProductCard.tsx

"use client";

import React from "react";

// API se jo data aayega uska type
export interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  Displayprice: number;
  discription: string;
  images: string[];
  slug: string;
}

// Simple product card UI
const ProductCard: React.FC<{ product: ProductCardProps }> = ({ product }) => {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition">
      {/* Product image */}
      <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>

      {/* Prices */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">₹{product.price}</span>
        <span className="text-sm line-through text-gray-500">
          ₹{product.Displayprice}
        </span>
      </div>

      {/* Short description */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.discription}
      </p>

      {/* View details button */}
      <a
        href={`/products/${product.slug}`}
        className="mt-auto inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        View Details
      </a>
    </div>
  );
};

export default ProductCard;
