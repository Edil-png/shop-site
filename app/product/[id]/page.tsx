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
  Star,
  Plus,
  Minus,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";

// Темы иконок для визуализации (соответствуют вашим категориям)
const CATEGORY_ICONS: Record<string, string> = {
  electronics: "📱",
  clothing: "👕",
  home: "🏠",
  beauty: "💄",
  sports: "⚽",
  books: "📚",
  cat1: "📱", // Добавьте ваши категории
  cat2: "👕",
  cat3: "🏠",
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

  // Добавим хлебные крошки
  const breadcrumbs = useMemo(() => {
    if (!product) return [];
    return [
      { name: "Главная", href: "/" },
      { name: "Категории", href: "/categories" },
      { name: product.category, href: `/category/${product.category}` },
      { name: product.name, href: `#` },
    ];
  }, [product]);

  if (loading)
    return (
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

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success("Товар добавлен в корзину", {
      icon: "🛒",
      action: {
        label: "Перейти в корзину",
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 text-sm mb-8">
          {breadcrumbs.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-300">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 dark:text-white font-medium">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Левая колонка: Визуал */}
          <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 rounded-[3rem] flex items-center justify-center shadow-inner overflow-hidden">
            <div className="absolute inset-0 from-blue-500/5 to-purple-500/5" />

            {/* Отображение иконки категории или изображения */}
            {product.images ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[10rem] relative z-10">
                {CATEGORY_ICONS[product.category] || "📦"}
              </span>
            )}

            {/* Кнопка избранного поверх изображения */}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-6 right-6 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg hover:scale-110 transition-transform z-20"
            >
              <Heart
                className={`h-6 w-6 ${liked ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          {/* Правая колонка: Инфо */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                {product.category}
              </span>
              {product.stock !== undefined && (
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {product.stock > 0
                    ? `В наличии (${product.stock} шт.)`
                    : "Нет в наличии"}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight dark:text-white">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold text-gray-900 dark:text-white">
                  {product.rating || "5.0"}
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 font-medium">
                {product.reviews || 0} отзывов
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 font-medium">#{product.id}</span>
            </div>

            <div className="text-5xl font-black mb-10 text-gray-900 dark:text-white">
              {product.price.toLocaleString()} ₽
              {product.oldPrice && (
                <span className="text-2xl text-gray-400 line-through ml-4">
                  {product.oldPrice.toLocaleString()} ₽
                </span>
              )}
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              {product.description ||
                "Уникальное сочетание стиля и функциональности. Этот товар станет отличным дополнением к вашему образу жизни."}
            </p>

            {/* Характеристики */}
            {product.features && (
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4 dark:text-white">
                  Характеристики
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.features).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"
                    >
                      <span className="text-gray-500 dark:text-gray-400">
                        {key}:
                      </span>
                      <span className="font-medium dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Выбор количества */}
            <div className="flex items-center gap-6 mb-10">
              <span className="font-bold uppercase text-xs tracking-widest text-gray-400">
                Количество
              </span>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-black text-xl dark:text-white">
                  {quantity}
                </span>
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
                onClick={handleAddToCart}
                disabled={product.stock !== undefined && product.stock <= 0}
                className="flex-1 bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <ShoppingCart className="h-6 w-6" />
                {product.stock !== undefined && product.stock <= 0
                  ? "Нет в наличии"
                  : "Добавить в корзину"}
              </button>

              <button
                onClick={handleToggleFavorite}
                className={`p-5 rounded-2xl transition-all border-2 flex items-center justify-center active:scale-95 ${
                  liked
                    ? "bg-rose-50 border-rose-100 text-rose-500 shadow-lg shadow-rose-500/10 dark:bg-rose-900/20 dark:border-rose-800"
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
                <div>
                  <span className="text-xs font-bold uppercase tracking-tighter block">
                    Быстрая доставка
                  </span>
                  <span className="text-xs text-gray-500">1-3 дня</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-tighter block">
                    Гарантия качества
                  </span>
                  <span className="text-xs text-gray-500">1 год</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-tighter block">
                    Легкий возврат
                  </span>
                  <span className="text-xs text-gray-500">30 дней</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
