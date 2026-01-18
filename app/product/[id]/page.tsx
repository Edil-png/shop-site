"use client";

import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/cartContext";
import { useFavorite } from "@/context/FavoriteContext";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Heart,
  ArrowLeft,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

// Темы иконок для визуализации (соответствуют вашим категориям)
const CATEGORY_ICONS: Record<string, string> = {
  electronics: "📱",
  clothing: "👕",
  home: "🏠",
  beauty: "💄",
  sports: "⚽",
  books: "📚",
};

export default function ProductPage() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();
  const params = useParams();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => {
    const id = params?.id;
    if (!products || !id) return null;
    return products.find((p) => p && String(p.id) === String(id));
  }, [products, params?.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!product) return notFound();

  const liked = isFavorite(product.id);

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    toast(liked ? "Удалено из избранного" : "Добавлено в избранное", {
      icon: liked ? "💔" : "❤️",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Кнопка назад */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Левая колонка: Визуал */}
          <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 rounded-[3rem] flex items-center justify-center text-[10rem] shadow-inner overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
            <span className="relative z-10">
              {CATEGORY_ICONS[product.category] || "📦"}
            </span>
          </div>

          {/* Правая колонка: Инфо */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold text-gray-900 dark:text-white">{product.rating || "5.0"}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 font-medium">{product.reviews || 0} отзывов</span>
            </div>

            <div className="text-5xl font-black mb-10 text-gray-900 dark:text-white">
              {product.price.toLocaleString()} ₽
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              {product.description || "Уникальное сочетание стиля и функциональности. Этот товар станет отличным дополнением к вашему образу жизни."}
            </p>

            {/* Выбор количества */}
            <div className="flex items-center gap-6 mb-10">
              <span className="font-bold uppercase text-xs tracking-widest text-gray-400">Количество</span>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-black text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => {
                  addToCart({ ...product, quantity });
                  toast.success("Товар добавлен в корзину");
                }}
                className="flex-1 bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart className="h-6 w-6" />
                Добавить в корзину
              </button>

              <button
                onClick={handleToggleFavorite}
                className={`p-5 rounded-2xl transition-all border-2 flex items-center justify-center active:scale-95 ${
                  liked
                    ? "bg-rose-50 border-rose-100 text-rose-500 shadow-lg shadow-rose-500/10"
                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 hover:border-blue-500/50"
                }`}
              >
                <Heart className={`h-7 w-7 ${liked ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 dark:border-gray-800 pt-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600">
                  <Truck className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter">Быстрая доставка</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter">Гарантия качества</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter">Легкий возврат</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}