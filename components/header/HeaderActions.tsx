"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Home,
  LayoutGrid,
} from "lucide-react";

import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { useFavorite } from "@/context/FavoriteContext";
import CartDrawer from "../cart/cartDrawer";
import ThemeToggle from "../ThemeToggle";
import { AdminButton } from "./AdminButton";
import { useProducts } from "@/context/ProductsContext";

export default function HeaderActions() {
  const { categories } = useProducts();
  const cat = categories.filter((el) => el.count);
  const categoriesMap = cat.slice(0, 5);
  console.log(categoriesMap);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isLoggedIn } = useAuth();
  const { totalItems } = useCart();
  const { favorites } = useFavorite();

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>

      {/* Профиль (Desktop/Tablet) */}
      <Link
        href={isLoggedIn ? "/account" : "/login"}
        className="flex items-center gap-2 p-2.5 md:p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-90"
      >
        <User
          className={`h-5 w-5 md:h-6 md:w-6 ${isLoggedIn ? "text-blue-600" : ""}`}
        />
        <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">
          {isLoggedIn ? user?.name?.split(" ")[0] : "Войти"}
        </span>
      </Link>

      {/* Избранное (Desktop) */}
      <Link
        href="/favorite"
        className="relative hidden md:block p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Heart
          className={`h-5 w-5 ${favorites.length > 0 ? "text-rose-500 fill-current" : ""}`}
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
        className="relative p-2.5 md:p-3 bg-blue-600 text-white rounded-xl md:rounded-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-500/20"
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-gray-950 scale-110 md:scale-100">
            {totalItems}
          </span>
        )}
      </button>

      {/* Админка (Desktop) */}
      <div className="hidden md:block">
        <AdminButton />
      </div>

      {/* Бургер (Mobile) */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200"
      >
        <Menu className="h-6 w-6" />
      </button>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Мобильное Меню */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-gray-950 flex flex-col md:hidden animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center p-6 border-b border-gray-50 dark:border-gray-900">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <span className="text-xl font-black dark:text-white uppercase tracking-tighter">
                Меню
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"
            >
              <X className="h-6 w-6 dark:text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Категории
            </p>
            {categoriesMap.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-lg font-bold dark:text-white group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-6">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <Home className="h-6 w-6 text-blue-600" />
                <span className="text-xs font-bold dark:text-white">
                  Главная
                </span>
              </Link>
              <Link
                href="/favorite"
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <Heart className="h-6 w-6 text-rose-500" />
                <span className="text-xs font-bold dark:text-white">
                  Избранное
                </span>
              </Link>
            </div>

            {/* Админ-кнопка внутри списка на мобилках */}
            <div className="pt-4" onClick={() => setIsMenuOpen(false)}>
              <AdminButton />
            </div>
          </div>

          {/* Footer меню */}
          <div className="p-6 border-t border-gray-50 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
            <Link
              href={isLoggedIn ? "/account" : "/login"}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm font-bold dark:text-white transition-transform active:scale-[0.98]"
            >
              <User className="h-5 w-5 text-blue-600" />
              {isLoggedIn ? "Личный кабинет" : "Войти в аккаунт"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
