'use client'

import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/cartContext"; // Предполагается, что контекст корзины создан
import { notFound, useParams } from "next/navigation";
import { 
  Star, ShoppingCart, ShieldCheck, Truck, 
  RefreshCw, Heart, Share2, ArrowLeft 
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ProductPage() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const params = useParams();
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Поиск товара
  const cleanProducts = (products || []).filter(Boolean);
  const product = cleanProducts.find((p) => p.id === params.id);

  // 2. Стейт загрузки
  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col lg:grid lg:grid-cols-2 gap-12 animate-pulse">
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-[3rem]" />
      <div className="space-y-6">
        <div className="h-12 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        <div className="h-6 w-1/4 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 rounded-[2rem]" />
      </div>
    </div>
  );

  if (!product) notFound();

  // 3. Обработчики действий
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success('Добавлено в корзину', {
      description: `${product.name} — ${quantity} шт.`,
      action: {
        label: 'В корзину',
        onClick: () => console.log('Открыть корзину') // Сюда можно привязать открытие Drawer
      }
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное', {
      icon: isFavorite ? '💔' : '❤️',
    });
  };

  // Рекомендации
  const relatedProducts = cleanProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        
        {/* Кнопка назад и Хлебные крошки */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600 transition-colors">Главная</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 dark:text-gray-100 truncate">{product.name}</span>
          </nav>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Назад
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* ЛЕВАЯ КОЛОНКА: Визуал */}
          <div className="relative">
            <div className="sticky top-28 aspect-square bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[10rem] md:text-[15rem] shadow-inner overflow-hidden group">
              <span className="group-hover:scale-110 transition-transform duration-500">
                {product.category === "electronics" && "📱"}
                {product.category === "clothing" && "👕"}
                {product.category === "home" && "🏠"}
                {product.category === "beauty" && "💄"}
              </span>
              
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                {product.isNew && (
                  <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-xl shadow-blue-500/20 uppercase">Новинка</span>
                )}
                {product.discount && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-xl shadow-rose-500/20 uppercase">-{product.discount}%</span>
                )}
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: Инфо */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-200"}`} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-500">({product.reviews} отзывов)</span>
                </div>
                <div className="hidden sm:block h-4 w-[1px] bg-gray-300 dark:bg-gray-700"></div>
                <span className={`text-sm font-bold ${product.inStock ? "text-green-600" : "text-rose-600"}`}>
                  {product.inStock ? "● В наличии" : "○ Нет в наличии"}
                </span>
              </div>
            </div>

            <div className="mb-8 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-gray-400 line-through font-medium">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 font-medium">Бесплатная доставка при оплате онлайн</p>
            </div>

            <div className="mb-10">
              <h3 className="font-black mb-4 uppercase text-[11px] tracking-[0.2em] text-blue-600 dark:text-blue-400">Описание</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
                {product.description || "Современное решение для вашего комфорта. Высокое качество материалов и внимание к деталям делают этот товар идеальным выбором."}
              </p>
            </div>

            {/* Блок управления */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1.5 shrink-0 border border-transparent focus-within:border-blue-500 transition-all">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all active:scale-90"
                >-</button>
                <span className="w-12 text-center font-black text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all active:scale-90"
                >+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
              >
                <ShoppingCart className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Добавить за {(product.price * quantity).toLocaleString()} ₽
              </button>

              <button 
                onClick={toggleFavorite}
                className={`p-4 rounded-2xl transition-all border ${
                  isFavorite 
                  ? "bg-rose-50 border-rose-200 text-rose-500" 
                  : "bg-gray-100 dark:bg-gray-800 border-transparent text-gray-400 hover:text-rose-500"
                }`}
              >
                <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Сервисные блоки */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 dark:border-gray-800 pt-10">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Доставка</span>
                  <span className="text-xs font-bold">Завтра, 0 ₽</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Гарантия</span>
                  <span className="text-xs font-bold">12 месяцев</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Возврат</span>
                  <span className="text-xs font-bold">7 дней</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Секция рекомендаций */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black tracking-tight italic">С этим покупают</h2>
              <div className="h-[2px] flex-1 mx-8 bg-gray-100 dark:bg-gray-800 hidden md:block" />
              <Link href="/shop" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Весь каталог →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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