'use client'

import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/type/product'

interface CartButtonProps {
  product: Product
  handleAddToCart: (e: React.MouseEvent) => void
}

export default function CartButton({ product, handleAddToCart }: CartButtonProps) {
  return (
    <button
      onClick={handleAddToCart}
      disabled={!product.inStock}
      className={`
        relative w-14 h-14 flex items-center justify-center rounded-2xl 
        transition-all duration-300 active:scale-95
        /* Всегда белый фон, меняется на синий только при наведении */
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-white 
        hover:bg-blue-600 hover:text-white 
        shadow-lg border border-gray-100 dark:border-gray-700
        disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed
      `}
    >
      <motion.div
        whileTap={{ scale: 0.6 }} // Глубокое сжатие при клике
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        <ShoppingCart className="h-6 w-6" />
      </motion.div>
    </button>
  )
}