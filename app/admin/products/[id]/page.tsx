"use client";

import { useProducts } from "@/context/ProductsContext";
import { useParams, notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Tag,
  Scale,
  Zap,
  ChevronRight,
  Box,
  ShoppingBag,
} from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";

export default function ProductPage() {
  const { products, loading, categories } = useProducts();
  const params = useParams();

  const product = useMemo(() => {
    const id = params?.id;
    if (!products || !id) return null;
    return products.find((p) => p && String(p.id) === String(id));
  }, [products, params?.id]);

  const breadcrumbs = useMemo(() => {
    if (!product) return [];
    return [
      { name: "Админ", href: "/admin" },
      { name: "Продукты", href: "/admin/products" },
      { name: product.name, href: "#" },
    ];
  }, [product]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-blue-50 dark:border-blue-900/20" />
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-t-blue-600 animate-spin" />
        </div>
      </div>
    );

  if (!product) return notFound();

  return (
    <div className="min-h-screen pb-20 bg-[#fafafa] dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs - Чистый стиль */}
        <nav className="flex items-center gap-2 text-[13px] mb-10 group">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-3 w-3 text-gray-400" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-400 truncate max-w-[150px] md:max-w-[300px]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Левая колонка: Изображение (Sticky) */}
          <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-22">
            <div className="group relative aspect-[4/5] md:aspect-square bg-white dark:bg-gray-900 rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-800">
              {/* Градиентная подложка для глубины */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {product.isNew && (
                <div className="absolute top-8 left-8 z-10 bg-black dark:bg-blue-600 text-white px-5 py-2 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-xl">
                  Новинка
                </div>
              )}

              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-[85%] h-[85%] object-contain transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <Box className="h-32 w-32 text-gray-200 dark:text-gray-800" />
              )}
            </div>
          </div>

          {/* Правая колонка: Инфо */}
          <div className="lg:col-span-6 flex flex-col pt-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/20">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/20">
                  {categories.find((el) => el.id === product.categoryId)
                    ?.name || "Без категории"}
                </span>
              </span>
              <div
                className={`h-2 w-2 rounded-full animate-pulse ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
              />
              <span className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">
                {product.stock > 0
                  ? `В акций: ${product.stock}`
                  : "Не в акций"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating || 5) ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900 dark:text-white mt-0.5">
                  {product.rating || "5.0"}
                </span>
              </div>
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800" />
              <span className="text-gray-500 font-medium text-sm">
                {product.reviews || 0} Customer Reviews
              </span>
            </div>

            <div className="flex items-center gap-5 mb-10">
              <div className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                {product.price.toLocaleString()} ₽
              </div>
              {product.oldPrice && (
                <div className="relative text-2xl text-gray-400 font-medium">
                  {product.oldPrice.toLocaleString()} ₽
                  <div className="absolute inset-x-0 top-1/2 h-[2px] bg-rose-500 -rotate-12 opacity-70" />
                </div>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-12 max-w-xl">
              {product.description ||
                "The perfect fusion of innovative design and premium craftsmanship, tailored for those who value both form and function."}
            </p>

            {/* Спецификации - Карточный стиль */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold dark:text-white tracking-tight">
                  Specifications
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {product.specifications &&
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="group flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        {key}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-200 group-hover:text-blue-600 transition-colors">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : String(value)}
                      </span>
                      <div className="h-[1px] w-full bg-gray-50 dark:bg-gray-800 mt-2" />
                    </div>
                  ))}

                {product.weight && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Weight
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                      {product.weight} kg
                    </span>
                    <div className="h-[1px] w-full bg-gray-50 dark:bg-gray-800 mt-2" />
                  </div>
                )}
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10">
                  {product.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl text-gray-500 dark:text-gray-400 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all cursor-default"
                    >
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Финальный CTA (опционально) */}
            <Link
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              href={`admin/products/${product.id}/edit`}
            >
              Редактировать
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
