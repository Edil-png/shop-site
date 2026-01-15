'use client'

import Link from "next/link"
import { ShoppingCart, Star, Heart, Eye } from "lucide-react"
import { useState } from "react"
import { Product } from "@/type/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500">
      
      {/* IMAGE SECTION */}
      <div className="relative aspect-[1/1] overflow-hidden bg-gray-50 dark:bg-gray-800/50">
        <Link href={`/product/${product.id}`} className="flex items-center justify-center h-full w-full group-hover:scale-110 transition-transform duration-500 ease-out">
          <div className="text-6xl filter drop-shadow-xl">
            {product.category === "electronics" && "📱"}
            {product.category === "clothing" && "👕"}
            {product.category === "home" && "🏠"}
            {product.category === "beauty" && "💄"}
          </div>
        </Link>

        {/* FLOATING CONTROLS */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2.5 rounded-xl shadow-lg backdrop-blur-md transition-all active:scale-90 ${
              isLiked 
                ? "bg-red-500 text-white" 
                : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-red-500"
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button className="p-2.5 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-xl shadow-lg backdrop-blur-md hover:text-blue-500 transition-all">
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wider shadow-lg shadow-blue-500/30">
              NEW
            </span>
          )}
          {product.discount && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wider shadow-lg shadow-rose-500/30">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </Link>

        {/* PRICE & ACTION */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through mb-0.5">
                {product.oldPrice.toLocaleString()} ₽
              </span>
            )}
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
              {product.price.toLocaleString()} ₽
            </span>
          </div>

          <button 
            disabled={!product.inStock}
            className={`
              relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 active:scale-95
              ${product.inStock 
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:shadow-xl shadow-gray-400/20" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"}
            `}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              В корзину
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}