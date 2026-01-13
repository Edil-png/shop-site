"use client";

import ProductCard from "@/components/ProductCard";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

/* ===== ТИПЫ ===== */
type Category = {
  id: string;
  name: string;
  count: number;
  about: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===== ЗАГРУЗКА ДАННЫХ ===== */
  useEffect(() => {
    async function loadData() {
      try {
        const [resCat, resProd] = await Promise.all([
          fetch(
            "https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json"
          ),
          fetch(
            "https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
          ),
        ]);

        const dataCat = await resCat.json();
        const dataProd = await resProd.json();

        // object -> array
        const categoriesArray: Category[] = Object.entries(dataCat).map(
          ([id, value]: any) => ({
            id,
            ...value,
          })
        );

        const productsArray: Product[] = Object.entries(dataProd).map(
          ([id, value]: any) => ({
            id,
            ...value,
          })
        );

        setCategories(categoriesArray);
        setProducts(productsArray);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Загрузка...
      </div>
    );
  }

  /* ===== КАТЕГОРИЯ ===== */
  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const categoryProducts = products.filter(
    (p) => p.category === categoryId
  );

  const CATEGORY_ICONS: Record<string, string> = {
    electronics: "📱",
    clothing: "👕",
    home: "🏠",
    beauty: "💄",
    sports: "⚽",
    books: "📚",
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">
            {CATEGORY_ICONS[category.id] ?? "📦"}
          </div>
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">
            {categoryProducts.length} товаров в категории
          </p>
        </div>

        {/* Товары */}
        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-2xl font-bold mb-4">
              Товары временно отсутствуют
            </h2>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-between items-center">
              <div>
                Найдено:{" "}
                <span className="font-bold">
                  {categoryProducts.length}
                </span>
              </div>

              <select className="px-4 py-2 bg-gray-100 rounded-lg">
                <option>По популярности</option>
                <option>По цене (дешёвые)</option>
                <option>По цене (дорогие)</option>
                <option>По новизне</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
