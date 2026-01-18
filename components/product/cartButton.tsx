"use client";

import { Product } from "@/type/product";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  handleAddToCart: (e: React.MouseEvent) => void;
  product: Product;
}

export function CartButton({ handleAddToCart, product }: CartButtonProps) {
  return (
    <button
      onClick={handleAddToCart}
      disabled={!product.inStock}
      className={`
        relative w-14 h-14 flex items-center justify-center rounded-2xl 
        transition-all duration-300 active:scale-95
        /* Белый фон, черный текст, при ховере уходит в голубой */
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-white 
        hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600
        shadow-lg border border-gray-100 dark:border-gray-700
        disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
      `}
    >
      <motion.div
        whileTap={{ 
          scale: 0.7, 
          rotate: -15 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        }}
      >
        <ShoppingCart className="h-6 w-6" />
      </motion.div>
    </button>
  );
}