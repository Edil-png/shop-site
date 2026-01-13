"use client";

import Link from "next/link";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useState } from "react";

/* ===== TYPE ===== */
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="card overflow-hidden group">
      {/* IMAGE */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
        <Link href={`/product/${product.id}`}>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {product.category === "electronics" && "📱"}
            {product.category === "clothing" && "👕"}
            {product.category === "home" && "🏠"}
            {product.category === "beauty" && "💄"}
          </div>
        </Link>

        {/* LIKE */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isLiked
              ? "bg-red-500 text-white"
              : "bg-white/80 dark:bg-gray-800/80"
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* BADGES */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}

        {product.discount && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <span className="text-xs text-gray-500 uppercase">
            {product.category}
          </span>

          <h3 className="font-semibold text-lg mt-1 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
        </Link>

        {/* RATING */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {product.price} ₽
              </span>

              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.oldPrice} ₽
                </span>
              )}
            </div>

            <span
              className={`text-sm ${
                product.inStock
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.inStock ? "В наличии" : "Нет в наличии"}
            </span>
          </div>

          <button className="btn-primary flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
}
