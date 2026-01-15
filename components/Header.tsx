"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Package,
  User,
  Phone,
  Heart,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/cartContext";
import { useProducts } from "@/context/ProductsContext"; // Импортируем товары
import CartDrawer from "./cartDrawer";
import ThemeToggle from "./ThemeToggle";

const categories = [
  { name: "Электроника", slug: "electronics" },
  { name: "Одежда", slug: "clothing" },
  { name: "Для дома", slug: "home" },
  { name: "Красота", slug: "beauty" },
];

export default function Header() {
  const { products } = useProducts(); // Получаем список товаров из контекста
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  // Фильтрация товаров для поиска
  const searchResults =
    searchQuery.length > 1
      ? products
          .filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 6)
      : [];

  // Закрытие поиска при клике вне области
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Затемнение фона при поиске */}
      {isSearchFocused && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity" />
      )}

      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled || isSearchFocused
            ? "bg-white dark:bg-gray-900 shadow-xl py-1"
            : "bg-white dark:bg-gray-900 py-3"
        } border-b border-gray-100 dark:border-gray-800`}
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600"></div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-8">
            {/* Логотип */}
            <Link
              href="/"
              className="flex items-center space-x-3 shrink-0 group"
            >
              <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="hidden lg:block text-xl font-black tracking-tighter dark:text-white">
                EL-SHOP
              </span>
            </Link>

            {/* ПОИСКОВАЯ СИСТЕМА */}
            <div
              className="hidden md:flex flex-1 max-w-2xl relative"
              ref={searchRef}
            >
              <div className="relative w-full z-[110]">
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                    isSearchFocused ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Найти товары..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* ВЫПАДАЮЩИЕ РЕЗУЛЬТАТЫ */}
              {isSearchFocused && searchQuery.length > 1 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-[110]">
                  <div className="p-4 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">
                      Результаты поиска
                    </span>
                    <span className="text-xs text-blue-600 font-bold">
                      Найдено: {searchResults.length}
                    </span>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto p-2">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors group"
                        >
                          <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                            {product.category === "electronics" ? "📱" : "👕"}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-500 font-medium">
                              {product.price.toLocaleString()} ₽
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </Link>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500 font-bold">
                          Ничего не нашли 😔
                        </p>
                      </div>
                    )}
                  </div>

                  {searchResults.length > 0 && (
                    <Link
                      href={`/search?q=${searchQuery}`}
                      className="block p-4 bg-gray-50 dark:bg-gray-800/50 text-center text-sm font-black text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Показать все результаты
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Иконки действий */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/favorites"
                className="hidden sm:flex p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
              >
                <Heart className="h-6 w-6" />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* Оставляем Spacer и Мобильное меню без изменений */}
      <div className="h-20 md:h-32"></div>
    </>
  );
}
