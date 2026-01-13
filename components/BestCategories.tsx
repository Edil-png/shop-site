"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  count: number;
  about: string;
};

export default function BestCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function fetchCategories() {
    try {
      const res = await fetch(`https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json`
      );

      if (!res.ok) throw new Error("Ошибка загрузки");

      let data = await res.json();
       console.log(data)
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
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Популярные товары</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="card p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">
                {category.id === "electronics" && "📱"}
                {category.id === "clothing" && "👕"}
                {category.id === "home" && "🏠"}
                {category.id === "beauty" && "💄"}
                {category.id === "sports" && "⚽"}
                {category.id === "books" && "📚"}
              </div>

              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.about}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
