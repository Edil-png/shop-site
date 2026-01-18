'use client'

import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Добавили анимацию
import ProductCard from "@/components/ProductCard";
import { useFavorite } from "@/context/FavoriteContext";

export default function FavoritePage() {
  const { favorites } = useFavorite();
  const isEmpty = favorites.length === 0;

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      {/* Шапка страницы */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black flex items-center gap-3 tracking-tight">
            <Heart className="text-rose-500 fill-rose-500 h-8 w-8" />
            Избранное 
            <span className="text-gray-300 dark:text-gray-700 font-medium ml-2">
              ({favorites.length})
            </span>
          </h1>
        </div>
        
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-sm font-bold bg-gray-100 dark:bg-gray-800 px-5 py-2.5 rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Вернуться к покупкам
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {isEmpty ? (
          /* Пустое состояние */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-gray-50/50 dark:bg-gray-900/20 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800"
          >
            <div className="relative mb-6">
              <Heart size={80} className="text-gray-200 dark:text-gray-800" />
              <ShoppingBag size={32} className="absolute bottom-0 right-0 text-blue-500 bg-white dark:bg-gray-900 rounded-full p-1" />
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white mb-2">Ваш список желаний пуст</p>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs text-center">
              Сохраняйте товары, которые вам понравились, чтобы вернуться к ним позже.
            </p>
            <Link 
              href="/shop" 
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              Найти что-нибудь интересное
            </Link>
          </motion.div>
        ) : (
          /* Сетка товаров */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {favorites.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} // Эффект "лесенки"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}