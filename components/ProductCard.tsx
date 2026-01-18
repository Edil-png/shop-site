"use client";

import Link from "next/link";
import { ShoppingCart, Star, Heart, Eye, Check } from "lucide-react";
import { Product } from "@/type/product";
import { useCart } from "@/context/cartContext";
import { useFavorite } from "@/context/FavoriteContext";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import CartButton from "./cart/CartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cartItems } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();

  const isInCart = cartItems?.some((item) => item.id === product.id);
  const liked = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.inStock) {
      addToCart(product);
      toast.success("Добавлено!", {
        description: `${product.name} теперь в корзине.`,
        duration: 2000,
      });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);

    toast.message(liked ? "Удалено" : "Добавлено", {
      icon: liked ? "🗑️" : "❤️",
    });
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full">
      {/* SECTION: IMAGE/EMOJI */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800/50">
        <Link
          href={`/product/${product.id}`}
          className="flex items-center justify-center h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out"
        >
          <div className="text-7xl filter drop-shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
            {product.category === "electronics" && "📱"}
            {product.category === "clothing" && "👕"}
            {product.category === "home" && "🏠"}
            {product.category === "beauty" && "💄"}
          </div>
        </Link>

        {/* FLOATING ACTIONS */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={handleLike}
            className={`p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all active:scale-90 ${
              liked
                ? "bg-rose-500 text-white"
                : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-rose-500"
            }`}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
          </button>
          <button className="p-3 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-2xl shadow-xl backdrop-blur-md hover:text-blue-500 transition-all active:scale-90">
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg shadow-blue-500/30">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg shadow-rose-500/30">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* SECTION: INFO */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <Star className="h-3 w-3 text-amber-500 fill-current" />
            <span className="text-[11px] font-black text-amber-700 dark:text-amber-500">
              {product.rating}
            </span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 leading-relaxed font-medium">
            {product.description}
          </p>
        </Link>

        {/* SECTION: PRICE & ADD TO CART */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through mb-0.5 font-medium">
                {product.oldPrice.toLocaleString()} ₽
              </span>
            )}
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
              {product.price.toLocaleString()} ₽
            </span>
          </div>

          <CartButton product={product} handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}
