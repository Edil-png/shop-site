"use client";

import { useProducts } from "@/context/ProductsContext";
import { Recommended } from "../components/Recommended";
import { HeroNews } from "../components/News";
import { Stock } from "../components/Stock";
import BestCategories from "../components/BestCategories";
import { ArrowRight, ShoppingBag, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { products, loading } = useProducts();

  // 1. Улучшенная фильтрация и подготовка данных
  const cleanProducts = (products || []).filter(
    (p) => p && typeof p === "object"
  );

  const featuredProducts = cleanProducts.slice(0, 4);
  const newProducts = cleanProducts.filter((p) => p.isNew).slice(0, 8);
  const discountedProducts = cleanProducts.filter((p) => (p.discount ?? 0) > 0);

  // 2. Стейт загрузки (лучше делать внутри компонентов через скелетоны,
  // но оставим системный лоадер, сделав его красивее)
  if (loading) {
    return (
      <main className="min-h-screen animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-800 mb-8" />{" "}
        {/* Категории */}
        <div className="container mx-auto px-4">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 mb-6" />{" "}
          {/* Заголовок */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <BestCategories />
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-16 text-white shadow-2xl shadow-blue-500/30">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-blue-500/30 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6">
            Лимитированное предложение
          </span>
          <h3 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter">
            Твой новый стиль <br /> начинается здесь
          </h3>
          {/* ... остальной контент */}
        </div>

        {/* Более сложный декор */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />
      </div>

      {/* 2. РЕКОМЕНДАЦИИ: Акцент на главные товары */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Zap className="h-5 w-5 text-amber-600" />
            </div>
            <h2 className="text-2xl font-black">Хиты продаж</h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            Смотреть все <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Recommended featuredProducts={featuredProducts} />
      </div>

      {/* 3. БАННЕРНАЯ ПАУЗА (CTA) */}
      <div className="container mx-auto px-4 mb-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 p-8 md:p-12 text-white shadow-2xl shadow-blue-500/20">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Обновите свой стиль с нашей новой коллекцией
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Только до конца недели: бесплатная доставка на все заказы от 5000
              ₽
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 active:scale-95">
              <ShoppingBag className="h-5 w-5" />
              Начать покупки
            </button>
          </div>
          {/* Декоративный элемент */}
          <div className="absolute -right-20 -bottom-20 h-80 w-80 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block text-[12rem] opacity-20 select-none pointer-events-none">
            🛍️
          </div>
        </div>
      </div>

      {/* 4. НОВИНКИ И НОВОСТИ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/20">
        <HeroNews newsProducts={newProducts} />
      </section>

      {/* 5. АКЦИИ (Stock) */}
      <div className="container mx-auto px-4 py-20">
        <Stock />
      </div>
    </main>
  );
}
