"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "./ProductCard";
import { Percent } from "lucide-react";

export function Stock() {
  const { products, loading } = useProducts();

  // 1. Сначала проверяем, загрузились ли данные
  if (loading) {
    return <div className="py-12 text-center">Загрузка акций...</div>;
  }

  // 2. Безопасно фильтруем, проверяя каждый продукт на null/undefined
  const discountedProducts = (products || [])
    .filter((product) => {
      if (!product) return false; // Пропускаем null элементы
      const hasDiscount = product.discount && product.discount > 0;
      const hasOldPrice = product.oldPrice && product.oldPrice > 0;
      return hasDiscount || hasOldPrice;
    })
    .slice(0, 4);

  // 3. Если после фильтрации ничего не осталось — не рендерим секцию
  if (discountedProducts.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-red-50/30 dark:to-red-950/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight">
              Акции и скидки
            </h2>
          </div>

          <Link
            href="/catalog?filter=sales"
            className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
          >
            Все акции
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {discountedProducts.map((product) => (
            <div
              key={product.id}
              className="transform hover:-translate-y-2 transition-transform duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
