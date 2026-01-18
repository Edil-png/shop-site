"use client";

import { useState, useEffect } from "react";
import { TitleSection } from "./TitleSection";
import { LookAll } from "../LookAll";
import { CategoriesCard } from "../CategoriesCard";
import { Category } from "@/type/product";
import api from "@/utils/axios";

export default function BestCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await api.get("/categories");
      setCategories(response.data);
      console.log(response)
    } catch (err) {
      console.error("Ошибка при загрузке категорий:", err);
      setError("Не удалось загрузить категории");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Если есть ошибка и нет данных
  if (error && categories.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-transparent overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Ошибка загрузки</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchCategories}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <TitleSection
            title={["Популярные", "категории"]}
            subTitle={"Тренды сезона"}
          />
          <LookAll />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading
            ? // Скелетон
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col items-center"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-[2.5rem] h-48 w-full mb-4" />
                  <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded-full" />
                </div>
              ))
            : categories.map((category) => (
                <CategoriesCard key={category.id} category={category} theme={category.image} />
              ))}
        </div>
      </div>
    </section>
  );
}
