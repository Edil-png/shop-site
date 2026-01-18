"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Package, X, Heart } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { useProducts } from "@/context/ProductsContext";
import { useFavorite } from "@/context/FavoriteContext";
import CartDrawer from "../cart/cartDrawer";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";

const categories = [
  { name: "Электроника", slug: "electronics" },
  { name: "Одежда", slug: "clothing" },
  { name: "Для дома", slug: "home" },
  { name: "Красота", slug: "beauty" },
];

export default function Header() {
  const { products } = useProducts();
  const { totalItems } = useCart();
  const { favorites } = useFavorite();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults =
    searchQuery.length > 1
      ? products
          .filter((p) =>
            p?.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(0, 6)
      : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setIsSearchFocused(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 20);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isSearchFocused && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140] transition-opacity duration-300" />
      )}

      <header
        className={`fixed top-0 w-full z-[150] transition-all duration-300 ${
          scrolled || isSearchFocused
            ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-lg py-0"
            : "bg-white dark:bg-gray-950 py-2"
        } border-b border-gray-100 dark:border-gray-800`}
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600" />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
            <Link
              href="/"
              className="flex items-center space-x-3 shrink-0 group"
            >
              <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter dark:text-white">
                EL-SHOP
              </span>
            </Link>

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

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isFocused={isSearchFocused}
              setIsFocused={setIsSearchFocused}
              results={searchResults}
              searchRef={searchRef}
            />

            <HeaderActions
              favoritesCount={favorites.length}
              cartCount={totalItems}
              onCartOpen={() => setIsCartOpen(true)}
              onMenuOpen={() => setIsMenuOpen(true)}
            />
          </div>
        </div>
      </header>

      <div className="h-20" />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Мобильное меню можно вынести в отдельный компонент MobileMenu по аналогии */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-gray-950 p-6 md:hidden animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-black">МЕНЮ</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"
            >
              <X />
            </button>
          </div>
          <div className="space-y-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-bold hover:text-blue-600 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/favorite"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-xl font-bold text-rose-500"
              >
                <Heart className="fill-current" /> Избранное ({favorites.length}
                )
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
