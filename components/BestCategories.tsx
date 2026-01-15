'use client'

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

// Типизация данных из Firebase
type Category = {
  id: string;
  name: string;
  count: number;
  about?: string;
};

// Темы вынесены в константу для производительности
const THEMES: Record<string, { icon: string; bg: string }> = {
  electronics: { icon: "📱", bg: "bg-blue-50 dark:bg-blue-900/20" },
  clothing: { icon: "👕", bg: "bg-orange-50 dark:bg-orange-900/20" },
  home: { icon: "🏠", bg: "bg-green-50 dark:bg-green-900/20" },
  beauty: { icon: "💄", bg: "bg-pink-50 dark:bg-pink-900/20" },
  sports: { icon: "⚽", bg: "bg-red-50 dark:bg-red-900/20" },
  books: { icon: "📚", bg: "bg-purple-50 dark:bg-purple-900/20" },
};

export default function BestCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const getTheme = (id: string) => THEMES[id] || { icon: "📦", bg: "bg-gray-50 dark:bg-gray-800" };

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json`);
      
      if (!res.ok) throw new Error("Ошибка загрузки");
      
      const data = await res.json();
      
      if (!data) {
        setCategories([]);
        return;
      }

      // Преобразование объекта Firebase в массив с сохранением ключей как ID
      const categoriesArray: Category[] = Object.entries(data).map(([key, value]: [string, any]) => ({
        id: key,
        ...value,
      }));

      setCategories(categoriesArray);
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="py-20 bg-white dark:bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
              <Sparkles className="h-4 w-4" />
              <span>Тренды сезона</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
              Популярные <span className="text-blue-600">категории</span>
            </h2>
          </div>
          <Link 
            href="/categories" 
            className="group flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-blue-600 transition-all"
          >
            Смотреть все 
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-[2.5rem] h-48 w-full mb-4" />
                <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
              </div>
            ))
          ) : (
            categories.map((category) => {
              const theme = getTheme(category.id);
              return (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.id}`}
                  className="group relative p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center"
                >
                  {/* Icon Box */}
                  <div className={`w-20 h-20 ${theme.bg} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner`}>
                    {theme.icon}
                  </div>

                  {/* Info */}
                  <h3 className="font-black text-gray-900 dark:text-white text-sm mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                    {category.name}
                  </h3>
                  
                  <div className="inline-block px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-[10px] font-black text-blue-600/60 dark:text-blue-400 border border-gray-100 dark:border-gray-700 uppercase tracking-tighter">
                    {category.count || 0} товаров
                  </div>

                  {/* Hover Arrow overlay */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="h-5 w-5 text-blue-500" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}