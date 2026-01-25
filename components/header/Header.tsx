"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Package } from "lucide-react";

import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import { useProducts } from "@/context/ProductsContext";

const categories = [
  { name: "Электроника", slug: "electronics" },
  { name: "Одежда", slug: "clothing" },
  { name: "Для дома", slug: "home" },
  { name: "Красота", slug: "beauty" },
];

export default function Header() {
  const { products = [] } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Оптимизированный поиск
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length <= 1) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter((p) => p?.name?.toLowerCase().includes(query))
      .slice(0, 6);
  }, [searchQuery, products]);

  // Восстанавливаем системную логику (скролл и клик вне)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Затемнение фона при поиске */}
      {isSearchFocused && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140] transition-opacity duration-300" />
      )}

      <header
        className={`fixed top-0 w-full z-[150] transition-all duration-300 ${
          scrolled || isSearchFocused
            ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-lg"
            : "bg-white dark:bg-gray-950"
        } border-b border-gray-100 dark:border-gray-800`}
      >
        {/* Градиентная полоса сверху */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600" />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
            {/* 1. Логотип */}
            <Link href="/" className="flex items-center space-x-3 shrink-0 group">
              <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter dark:text-white uppercase">
                EL-SHOP
              </span>
            </Link>

            {/* 2. Десктопная навигация */}
            <nav className="hidden lg:flex items-center gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* 3. Центр: Поиск */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isFocused={isSearchFocused}
              setIsFocused={setIsSearchFocused}
              results={searchResults}
              searchRef={searchRef}
            />

            {/* 4. Правая часть: Корзина, Юзер, Меню */}
            <HeaderActions />
          </div>
        </div>
      </header>

      {/* Отступ под хедером */}
      <div className="h-20" />
    </>
  );
}