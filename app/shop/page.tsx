"use client";

import { useProducts } from "@/context/ProductsContext";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Search, X, LayoutGrid, List } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const { products, categories, loading } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Логика фильтрации
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Поиск
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Категория
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Сортировка
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex gap-4 mb-12 animate-pulse">
          <div className="h-12 w-48 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
          <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-[2.5rem] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-20">
      {/* Шапка магазина */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 pt-12 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-black mb-8 tracking-tight">Каталог</h1>

          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Поиск */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Искать в каталоге..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 shadow-sm outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Быстрые фильтры */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-100"
                }`}
              >
                Все товары
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Панель сортировки */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
            Найдено: {filteredProducts.length} товаров
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent font-black text-sm outline-none cursor-pointer border-b-2 border-gray-100 dark:border-gray-800 pb-1"
          >
            <option value="newest">Новинки</option>
            <option value="price-low">Сначала дешевле</option>
            <option value="price-high">Сначала дороже</option>
          </select>
        </div>

        {/* Сетка товаров */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => {
                // ДОБАВЛЕННАЯ ПРОВЕРКА:
                // Если product по какой-то причине null, мы просто его не рендерим
                if (!product || !product.id) return null;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id} // Теперь ошибка здесь исчезнет
                  >
                    <ProductCard product={product} />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-40 bg-gray-50 dark:bg-gray-900/30 rounded-[3rem]"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-2xl font-black mb-2">Ничего не найдено</h2>
              <p className="text-gray-500">
                Попробуйте изменить запрос или категорию
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-8 px-8 py-4 bg-black dark:bg-white dark:text-black text-white rounded-2xl font-bold"
              >
                Сбросить фильтры
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
