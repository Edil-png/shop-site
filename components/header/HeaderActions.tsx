"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Heart, ShoppingBag, Menu, X } from "lucide-react";

import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { useFavorite } from "@/context/FavoriteContext";
import CartDrawer from "../cart/cartDrawer";

// Если категории не приходят извне, их нужно объявить или импортировать
const categories = [
  { name: "Электроника", slug: "electronics" },
  { name: "Одежда", slug: "clothing" },
  { name: "Для дома", slug: "home" },
  { name: "Красота", slug: "beauty" },
];

export default function HeaderActions() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isLoggedIn } = useAuth();
  const { totalItems } = useCart();
  const { favorites } = useFavorite();

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="flex items-center gap-1 md:gap-2">
      {/* Профиль / Логин */}
      <Link
        href={isLoggedIn ? "/account" : "/login"}
        className="flex items-center gap-2 p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <User className={`h-5 w-5 ${isLoggedIn ? "text-blue-600" : ""}`} />
        <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">
          {isLoggedIn ? user?.name?.split(" ")[0] || "Профиль" : "Войти"}
        </span>
      </Link>

      {/* Избранное */}
      <Link
        href="/favorite"
        className="relative p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Heart
          className={`h-5 w-5 transition-all ${
            favorites.length > 0 ? "text-rose-500 fill-current" : ""
          }`}
        />
        {favorites.length > 0 && (
          <span className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-gray-950">
            {favorites.length}
          </span>
        )}
      </Link>

      {/* Корзина */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-transform active:scale-95 shadow-md shadow-blue-500/20"
      >
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-gray-950">
            {totalItems}
          </span>
        )}
      </button>

      {/* Drawer корзины */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Кнопка мобильного меню */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Мобильное меню (Портал/Оверлей) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-gray-950 p-6 md:hidden animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-black dark:text-white uppercase">Меню</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-transform active:scale-90"
            >
              <X className="h-6 w-6 dark:text-white" />
            </button>
          </div>

          <nav className="space-y-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-bold hover:text-blue-600 transition-colors dark:text-white"
              >
                {cat.name}
              </Link>
            ))}
            
            <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/favorite"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-xl font-bold text-rose-500"
              >
                <Heart className="fill-current h-6 w-6" /> 
                Избранное ({favorites.length})
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}