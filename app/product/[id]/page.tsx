'use client'

import { useProducts } from "@/context/ProductsContext";
import { notFound, useParams } from "next/navigation";
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Heart, Share2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState } from "react";

export default function ProductPage() {
  const { products, loading } = useProducts();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 animate-pulse">
      <div className="w-full md:w-1/2 aspect-square bg-gray-100 dark:bg-gray-800 rounded-[3rem]" />
      <div className="w-full md:w-1/2 space-y-6">
        <div className="h-10 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        <div className="h-6 w-1/4 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        <div className="h-32 w-full bg-gray-100 dark:bg-gray-800 rounded-xl" />
      </div>
    </div>
  );

  const cleanProducts = (products || []).filter(Boolean);
  const product = cleanProducts.find((p) => p.id === params.id);

  if (!product) notFound();

  // Рекомендации: товары той же категории, исключая текущий
  const relatedProducts = cleanProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-blue-600">Главная</Link>
          <span className="text-gray-300">/</span>
          <Link href={`/categories/${product.category}`} className="hover:text-blue-600">{product.category}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 dark:text-gray-100 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* ЛЕВАЯ КОЛОНКА: Изображение */}
          <div className="relative group">
            <div className="sticky top-28 aspect-square bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[10rem] md:text-[15rem] shadow-inner overflow-hidden">
              {product.category === "electronics" && "📱"}
              {product.category === "clothing" && "👕"}
              {product.category === "home" && "🏠"}
              {product.category === "beauty" && "💄"}
              
              {/* Бейджи */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                {product.isNew && (
                  <span className="bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">NEW</span>
                )}
                {product.discount && (
                  <span className="bg-rose-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-rose-500/30">-{product.discount}%</span>
                )}
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: Информация */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-200"}`} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-500">({product.reviews} отзывов)</span>
                </div>
                <div className="h-4 w-[1px] bg-gray-300"></div>
                <span className={`text-sm font-bold ${product.inStock ? "text-green-600" : "text-rose-600"}`}>
                  {product.inStock ? "● В наличии" : "○ Под заказ"}
                </span>
              </div>
            </div>

            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-black text-gray-900 dark:text-white">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">Возможна оплата частями (Долями или Сплит)</p>
            </div>

            <div className="mb-10">
              <h3 className="font-bold mb-4 uppercase text-[10px] tracking-widest text-gray-400">Описание</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">
                {product.description}
              </p>
            </div>

            {/* Действия */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all"
                >-</button>
                <span className="w-12 text-center font-black">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all"
                >+</button>
              </div>
              <button className="btn-primary flex-1 py-4 text-lg">
                <ShoppingCart className="h-6 w-6" />
                Добавить в корзину
              </button>
              <button className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:text-rose-500 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            {/* Плюшки сервиса */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-800 pt-8">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-500" />
                <span className="text-xs font-bold text-gray-500">Доставка завтра</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="text-xs font-bold text-gray-500">Гарантия 1 год</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-purple-500" />
                <span className="text-xs font-bold text-gray-500">7 дней на возврат</span>
              </div>
            </div>
          </div>
        </div>

        {/* С этим товаром покупают */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="text-2xl font-black mb-10">С этим товаром покупают</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}