"use client";

import Link from "next/link";
import ProductCard from "../ProductCard";
import { TitleSection } from "./TitleSection";
import { useProducts } from "@/context/ProductsContext";
import { useState, useEffect } from "react";

export function Stock() {
  const { products, loading } = useProducts();
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!products.length) return;

    // Разные стратегии определения "скидочных" товаров:
    const filtered = products
      .filter(product => {
        if (!product) return false;
        
        // 1. Прямое указание скидки
        if (product.discount > 0 || product.isOnSale) return true;
        
        // 2. Разница между oldPrice и price
        if (product.oldPrice && product.price < product.oldPrice) {
          return true;
        }
        
        // 3. Товары с определенными категориями (например, "распродажа")
        if (product.categoryId === "sale" || product.tags?.includes("sale")) {
          return true;
        }
        
        // 4. Товары с высоким рейтингом и низкой ценой (хиты продаж)
        if (product.rating >= 4.5 && product.price < 10000) {
          return true;
        }
        
        return false;
      })
      // Добавляем вычисленную скидку для отображения
      .map(product => {
        let discountPercent = product.discount;
        
        // Если есть oldPrice, вычисляем процент скидки
        if (product.oldPrice && product.price < product.oldPrice) {
          discountPercent = Math.round(
            (1 - product.price / product.oldPrice) * 100
          );
        }
        
        // Если нет скидки, но товар в акции - ставим случайную скидку для демо
        if (!discountPercent && (product.isOnSale || product.categoryId === "sale")) {
          discountPercent = Math.floor(Math.random() * 30) + 10; // 10-40%
        }
        
        return {
          ...product,
          discount: discountPercent,
          oldPrice: product.oldPrice || product.price * (1 + discountPercent / 100)
        };
      })
      .slice(0, 4);
    
    setDiscountedProducts(filtered);
  }, [products]);

  if (loading) {
    return <div className="py-12 text-center">Загрузка акций...</div>;
  }

  if (discountedProducts.length === 0) {
    return (
      <section className="bg-gradient-to-b from-transparent to-red-50/30 dark:to-red-950/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <TitleSection 
            title={["Акции", "скидки"]} 
            subTitle="Скоро появятся горячие предложения!" 
          />
          <Link
            href="/catalog"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-transparent to-red-50/30 dark:to-red-950/10 py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <TitleSection 
              title={["Акции", "скидки"]} 
              subTitle={`${discountedProducts.length} специальных предложений`} 
            />
            
          </div>

          <Link
            href="/catalog?filter=sales"
            className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all text-lg"
          >
            Все акции
            <span className="transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {discountedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              showDiscountBadge={true}
              discountPercent={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}