"use client";

import { CategoriesCard } from "../../CategoriesCard";
import { useProducts } from "@/context/ProductsContext";
import { SceletonCategories } from "./SceletonCategories";

export default function BestCategories() {
  const { categories, loading, error } = useProducts();
  if (error && categories.length === 0) {
    return;
  }

  return (
    <section className="py-20 bg-white dark:bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading ? (
            // Скелетон
            <SceletonCategories />
          ) : (
            categories
              .slice(0, 6)
              .map((category) => (
                <CategoriesCard
                  key={category.id}
                  category={category}
                  theme={category.image}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}
