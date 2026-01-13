"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  Home,
  Package,
  User,
  Phone,
} from "lucide-react";
import CartButton from "./CartButton";

const categories = [
  { name: "Электроника", slug: "electronics" },
  { name: "Одежда", slug: "clothing" },
  { name: "Для дома", slug: "home" },
  { name: "Красота", slug: "beauty" },
  { name: "Спорт", slug: "sports" },
  { name: "Книги", slug: "books" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        {/* Верхняя панель */}
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold dark:text-white">EL-SHOP</span>
          </Link>

          {/* Поиск (десктоп) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Иконки действий */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Home className="h-5 w-5" />
            </Link>
            <Link
              href="/account"
              className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <User className="h-5 w-5" />
            </Link>
            <CartButton />
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Категории (десктоп) */}
        <nav className="hidden md:flex items-center justify-center space-x-6 py-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            {/* Поиск в мобильном меню */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Категории в мобильном меню */}
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Дополнительные ссылки */}
            <div className="mt-4 space-y-2">
              <Link
                href="/"
                className="flex items-center space-x-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Главная</span>
              </Link>
              <Link
                href="/account"
                className="flex items-center space-x-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Личный кабинет</span>
              </Link>
              <Link
                href="/contacts"
                className="flex items-center space-x-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span>Контакты</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
