'use client'

import { useProducts } from "@/context/ProductsContext";
import { notFound, useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function CategoryPage() {
  const { products, categories, loading } = useProducts();
  const params = useParams();
  const [sortBy, setSortBy] = useState("newest");

  // Находим текущую категорию
  const category = categories.find((c) => c.id === params.category);

  // Фильтруем и сортируем продукты
  const categoryProducts = useMemo(() => {
    const filtered = products.filter((p) => p && p.category === params.category);
    
    if (sortBy === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered; // по умолчанию (id или дата добавления)
  }, [products, params.category, sortBy]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!category) notFound();

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-transparent">
      {/* HEADER СЕКЦИЯ */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-10 mb-8">
        <div className="container mx-auto px-4">
          {/* Хлебные крошки */}
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">Главная</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 dark:text-gray-200">{category.name}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                {category.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl">
                {category.about || `Откройте для себя лучшие предложения в категории ${category.name}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-400 whitespace-nowrap">
                Найдено: {categoryProducts.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* БОКОВАЯ ПАНЕЛЬ (ФИЛЬТРЫ) */}
          <aside className="lg:w-64 shrink-0 space-y-8">
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-6 font-black text-sm uppercase tracking-wider">
                <SlidersHorizontal className="h-4 w-4" />
                Фильтры
              </div>
              
              {/* Пример фильтра по цене */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm">Цена, ₽</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="От" className="w-full p-2 text-sm bg-gray-50 dark:bg-gray-800 rounded-xl border border-transparent focus:border-blue-500 outline-none" />
                  <input type="number" placeholder="До" className="w-full p-2 text-sm bg-gray-50 dark:bg-gray-800 rounded-xl border border-transparent focus:border-blue-500 outline-none" />
                </div>
              </div>
            </div>
          </aside>

          {/* ОСНОВНОЙ КОНТЕНТ */}
          <main className="flex-1">
            {/* Тулбар сортировки */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-sm outline-none cursor-pointer text-gray-600 dark:text-gray-300"
                >
                  <option value="newest">Сначала новые</option>
                  <option value="price-low">Дешевле</option>
                  <option value="price-high">Дороже</option>
                </select>
              </div>
            </div>

            {categoryProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/30 rounded-[3rem]">
                <div className="text-6xl mb-6 grayscale">📦</div>
                <h2 className="text-2xl font-black mb-2">Здесь пока пусто</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Мы работаем над наполнением этого раздела.
                </p>
                <Link href="/" className="btn-primary inline-flex">
                  На главную
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}