'use client'

import Link from "next/link"
import { ShoppingCart, Star, Heart, Eye, Check } from "lucide-react"
import { useState } from "react"
import { Product } from "@/type/product"
import { useCart } from "@/context/cartContext"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const { addToCart, cartItems } = useCart()

  // Проверяем, есть ли уже этот товар в корзине
  const isInCart = cartItems?.some((item: { id: string }) => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Чтобы не переходить на страницу товара
    e.stopPropagation()
    
    if (product.inStock) {
      addToCart(product)
      toast.success('Добавлено!', {
        description: `${product.name} теперь в вашей корзине.`,
        duration: 2000,
      })
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    
    if (!isLiked) {
      toast.message('В избранном', {
        icon: '❤️',
      })
    }
  }

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-none transition-all duration-500 flex flex-col h-full">
      
      {/* СЕКЦИЯ ИЗОБРАЖЕНИЯ */}
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

        {/* ПЛАВАЮЩИЕ КНОПКИ (УПРАВЛЕНИЕ) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={handleLike}
            className={`p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all active:scale-90 ${
              isLiked 
                ? "bg-rose-500 text-white" 
                : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-rose-500"
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button 
            className="p-3 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-2xl shadow-xl backdrop-blur-md hover:text-blue-500 transition-all active:scale-90"
            title="Быстрый просмотр"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* БЕЙДЖИ */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl tracking-tighter shadow-lg shadow-blue-500/30 uppercase">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl tracking-tighter shadow-lg shadow-rose-500/30 uppercase">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* СЕКЦИЯ ИНФОРМАЦИИ */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em]">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <Star className="h-3 w-3 text-amber-500 fill-current" />
            <span className="text-[11px] font-black text-amber-700 dark:text-amber-500">{product.rating}</span>
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

        {/* ЦЕНА И КНОПКА КОРЗИНЫ */}
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

          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`
              relative flex items-center justify-center p-4 rounded-2xl transition-all duration-300 active:scale-95
              ${!product.inStock 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : isInCart 
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/20" 
                  : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white shadow-xl shadow-gray-200 dark:shadow-none"}
            `}
          >
            {isInCart ? <Check className="h-6 w-6 animate-in zoom-in" /> : <ShoppingCart className="h-6 w-6" />}
            
            {/* Тултип при наведении */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              {isInCart ? "В корзине" : "В корзину"}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}