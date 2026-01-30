"use client";

import { CategoriesCard } from "../../CategoriesCard";
import { useProducts } from "@/context/ProductsContext";
import { SceletonCategories } from "./SceletonCategories";

export default function BestCategories() {
  const { categories, loading, error } = useProducts();
  if (error && categories.length === 0) {
    return;
  }

  const cat = categories.filter((el) => el.count)

  return (
    <section className="py-20 bg-white dark:bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading ? (
            // Скелетон
            <SceletonCategories />
          ) : (
            cat
              .slice(0, 6)
              .map((cat) => (
                <CategoriesCard
                  key={cat.id}
                  category={cat}
                  theme={cat.image}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}
