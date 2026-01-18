'use client'

import { useProducts } from "@/context/ProductsContext";
import { notFound, useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function CategoryPage() {
  const { products, categories, loading } = useProducts();
  const params = useParams();

  console.log(params)
  
  // Состояния для фильтрации и сортировки
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Находим текущую категорию
  const category = categories.find((c) => c.id === params.category);

  // Фильтрация и сортировка продуктов
  const categoryProducts = useMemo(() => {
    let filtered = products.filter((p) => p && p.category === params.category);
    
    // Фильтр по минимальной цене
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    // Фильтр по максимальной цене
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    // Сортировка
    const sorted = [...filtered];
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
    
    return sorted;
  }, [products, params.category, sortBy, minPrice, maxPrice]);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

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
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-400 whitespace-nowrap">
                Найдено: {categoryProducts.length}
              </span>
              {/* Кнопка фильтров для мобилок */}
              <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 font-bold text-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Фильтры
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* БОКОВАЯ ПАНЕЛЬ (ФИЛЬТРЫ ДЛЯ DESKTOP) */}
          <aside className="hidden lg:block lg:w-64 shrink-0 space-y-8">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
                  <SlidersHorizontal className="h-4 w-4" />
                  Фильтры
                </div>
                {(minPrice || maxPrice) && (
                  <button onClick={clearFilters} className="text-xs text-blue-600 font-bold hover:underline">
                    Сбросить
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-sm">Цена, ₽</h4>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="От" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 rounded-xl border border-transparent focus:border-blue-500 outline-none transition-all" 
                    />
                    <input 
                      type="number" 
                      placeholder="До" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 rounded-xl border border-transparent focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ОСНОВНОЙ КОНТЕНТ */}
          <main className="flex-1">
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
                <h2 className="text-2xl font-black mb-2">Ничего не найдено</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Попробуйте изменить параметры фильтрации.
                </p>
                <button onClick={clearFilters} className="px-8 py-3 bg-black dark:bg-white dark:text-black text-white rounded-full font-bold transition-transform active:scale-95">
                  Сбросить фильтры
                </button>
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

      {/* МОБИЛЬНОЕ МЕНЮ ФИЛЬТРОВ (OVERLAY) */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-900 p-6 shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black">Фильтры</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="font-bold">Цена, ₽</h4>
                <div className="flex flex-col gap-3">
                  <input 
                    type="number" 
                    placeholder="От" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl outline-none" 
                  />
                  <input 
                    type="number" 
                    placeholder="До" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl outline-none" 
                  />
                </div>
              </div>
              
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold"
              >
                Показать результаты ({categoryProducts.length})
              </button>
              <button 
                onClick={clearFilters}
                className="w-full py-4 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold"
              >
                Сбросить всё
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}