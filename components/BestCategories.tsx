'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

type Category = {
  id: string;
  name: string;
  count: number;
  about: string;
  color?: string; // Добавим для визуального разнообразия
};

export default function BestCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategoryTheme = (id: string) => {
    const themes: Record<string, { icon: string; bg: string }> = {
      electronics: { icon: "📱", bg: "bg-blue-50 dark:bg-blue-900/20" },
      clothing: { icon: "👕", bg: "bg-orange-50 dark:bg-orange-900/20" },
      home: { icon: "🏠", bg: "bg-green-50 dark:bg-green-900/20" },
      beauty: { icon: "💄", bg: "bg-pink-50 dark:bg-pink-900/20" },
      sports: { icon: "⚽", bg: "bg-red-50 dark:bg-red-900/20" },
      books: { icon: "📚", bg: "bg-purple-50 dark:bg-purple-900/20" },
    };
    return themes[id] || { icon: "📦", bg: "bg-gray-50 dark:bg-gray-800" };
  };

  async function fetchCategories() {
    try {
      const res = await fetch(`https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json`);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      
      if (!data) {
        setCategories([]);
        return;
      }

      const categoriesArray: Category[] = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setCategories(categoriesArray);
    } catch (error) {
      console.error("Ошибка", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Маркетплейс</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Популярные категории</h2>
          </div>
          <Link href="/categories" className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
            Все категории <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl h-48 w-full" />
            ))
          ) : (
            categories.map((category) => {
              const theme = getCategoryTheme(category.id);
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group relative p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 text-center"
                >
                  <div className={`w-20 h-20 ${theme.bg} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    {theme.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className="text-[11px] font-bold text-blue-600/60 dark:text-blue-400/60 uppercase">
                    {category.count || 0} товаров
                  </div>
                  
                  {/* Декоративный элемент при наведении */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
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