"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Package, Menu, Search, X } from "lucide-react"; // Добавили иконки

import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import { useProducts } from "@/context/ProductsContext";

export default function Header() {
  const { products = [] } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); // Состояние для мобильного поиска
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length <= 1) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter((p) => p?.name?.toLowerCase().includes(query))
      .slice(0, 6);
  }, [searchQuery, products]);

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
      {/* Overlay */}
      {(isSearchFocused || isMobileSearchOpen) && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] transition-opacity duration-300" 
          onClick={() => {
            setIsSearchFocused(false);
            setIsMobileSearchOpen(false);
          }}
        />
      )}

      <header
        className={`fixed top-0 w-full z-[150] transition-all duration-300 ${
          scrolled || isSearchFocused || isMobileSearchOpen
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-md"
            : "bg-white dark:bg-gray-950"
        } border-b border-gray-100 dark:border-gray-800`}
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600" />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 gap-2 md:gap-8">
            
            {/* 1. Лого и Бургер */}
            <div className="flex items-center gap-3">
              
              <Link href="/" className="flex items-center space-x-2 shrink-0 group">
                <div className="h-8 w-8 md:h-10 md:w-10 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                  <Package className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="text-lg md:text-xl font-black tracking-tighter dark:text-white uppercase hidden sm:block">
                  EL-SHOP
                </span>
              </Link>
            </div>

            {/* 2. Каталог (Desktop) */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-bold transition-colors">
              Каталог
            </button>

            {/* 3. Центр: Поиск (Скрыт на мобилках до нажатия на лупу) */}
            <div className={`${isMobileSearchOpen ? "fixed inset-x-0 top-0 p-4 bg-white dark:bg-gray-950 z-[160] flex items-center gap-2" : "hidden lg:block"} flex-1 max-w-2xl`}>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isFocused={isSearchFocused}
                setIsFocused={setIsSearchFocused}
                results={searchResults}
                searchRef={searchRef}
              />
              {isMobileSearchOpen && (
                <button 
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-2 text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* 4. Правая часть: Действия */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Кнопка поиска для мобилок */}
              <button 
                onClick={() => setIsMobileSearchOpen(true)}
                className="p-2 text-gray-700 dark:text-gray-300 lg:hidden"
              >
                <Search className="h-6 w-6" />
              </button>
              <HeaderActions />
            </div>
          </div>
        </div>
      </header>

      {/* Отступ под хедером с учетом мобильной высоты */}
      <div className="h-16 md:h-20" />
    </>
  );
}