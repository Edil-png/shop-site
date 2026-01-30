"use client";

import { notFound, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useProducts } from "@/context/ProductsContext";

export default function CategoryPage() {
  const { categories, products } = useProducts();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');

  // Состояния
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Категория с мемоизацией
  const category = useMemo(() => {
    return categories.find((c) => c.id === categoryParam);
  }, [categoryParam, categories]);

  // Основная логика фильтрации и сортировки
  const filteredProducts = useMemo(() => {
    if (!categoryParam) return [];

    let result = products.filter((p) => p && p.category === categoryParam);

    // Фильтрация по цене
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min)) {
      result = result.filter((p) => p.price >= min);
    }
    if (!isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }

    // Сортировка (создаем копию, чтобы не мутировать исходный массив)
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
        default:
          // Сортировка по ID или дате (предполагаем, что чем выше ID, тем новее товар)
          return Number(b.id) - Number(a.id);
      }
    });
  }, [categoryParam, products, sortBy, minPrice, maxPrice]);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  // Если категория не найдена в списке доступных
  if (categories.length > 0 && !category) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">
      {/* Хлебные крошки и заголовок */}
      <header className="bg-gray-50 dark:bg-gray-900/40 py-12 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Главная</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 dark:text-white">{category?.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                {category?.name}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                {category?.about || `Коллекция лучших товаров в секции ${category?.name}.`}
              </p>
            </div>
            <div className="flex items-center gap-4 border-t lg:border-t-0 pt-6 lg:pt-0 border-gray-100 dark:border-gray-800">
              <div className="text-sm font-medium">
                <span className="text-gray-400">Найдено позиций:</span>{" "}
                <span className="font-bold ml-1">{filteredProducts.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Десктопные фильтры */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-10">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" /> Фильтры
                  </h3>
                  {(minPrice || maxPrice) && (
                    <button onClick={clearFilters} className="text-[10px] text-blue-500 font-black uppercase hover:underline flex items-center gap-1">
                      <RotateCcw className="h-3 w-3" /> Сброс
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold opacity-50 uppercase tracking-tighter">Диапазон цены</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="От"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl p-4 text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all"
                    />
                    <input
                      type="number"
                      placeholder="До"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl p-4 text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </section>

              <section className="pt-8 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6">Сортировать по</h3>
                <div className="space-y-2">
                  {[
                    { id: 'newest', label: 'Новинки' },
                    { id: 'price-low', label: 'Сначала дешевле' },
                    { id: 'price-high', label: 'Сначала дороже' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        sortBy === option.id 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          {/* Сетка товаров */}
          <main className="flex-1">
            {/* Мобильная панель инструментов */}
            <div className="lg:hidden flex gap-2 mb-8">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/10"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Параметры
              </button>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <X className="h-10 w-10 text-gray-300" />
                </div>
                <h2 className="text-2xl font-black mb-2">Ничего не найдено</h2>
                <p className="text-gray-500 mb-8 max-w-xs">Упс! По вашим параметрам товаров нет. Попробуйте сбросить фильтры.</p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
                >
                  Сбросить всё
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Мобильный Drawer (Оверлей) */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 top-20 bg-white dark:bg-gray-950 rounded-t-[2.5rem] p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black">Фильтры</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Повтор логики фильтров для мобилки */}
            <div className="space-y-10">
               <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Диапазон цен (₽)</h4>
                  <div className="flex gap-4">
                     <input type="number" placeholder="От" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="flex-1 bg-gray-100 dark:bg-gray-900 p-5 rounded-2xl outline-none" />
                     <input type="number" placeholder="До" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="flex-1 bg-gray-100 dark:bg-gray-900 p-5 rounded-2xl outline-none" />
                  </div>
               </div>

               <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30"
               >
                 Применить
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}