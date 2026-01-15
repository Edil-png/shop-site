'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Home,
  Package,
  User,
  Phone,
  Settings,
  Heart,
  ChevronRight
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Отслеживаем скролл для изменения прозрачности
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled ? "glass shadow-lg py-1" : "bg-white dark:bg-gray-900 py-3"
        } border-b border-gray-100 dark:border-gray-800`}
      >
        {/* Акцентная полоса сверху */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600"></div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Логотип */}
            <Link href="/" className="flex items-center space-x-3 shrink-0 group">
              <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="hidden lg:block leading-none">
                <span className="text-xl font-black tracking-tighter dark:text-white">EL-SHOP</span>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Premium Store</p>
              </div>
            </Link>

            {/* Поиск (Десктоп) */}
            <div className="hidden md:flex flex-1 max-w-2xl group">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Найти кроссовки, смартфоны..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Иконки действий */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Link href="/favorites" className="hidden sm:flex p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                <Heart className="h-6 w-6" />
              </Link>
              <Link href="/account" className="hidden sm:flex p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                <User className="h-6 w-6" />
              </Link>
              <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block"></div>
              <CartButton />
              
              <button
                className="md:hidden p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl active:scale-90 transition-all"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Категории (Десктоп) */}
          <nav className="hidden md:flex items-center justify-center space-x-8 h-12 border-t border-gray-50 dark:border-gray-800/50">
            {categories.map((category) => {
              const isActive = pathname === `/categories/${category.slug}`;
              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className={`text-sm font-bold transition-all relative py-2 ${
                    isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  {category.name}
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Мобильное меню (Drawer Overlay) */}
      <div 
        className={`fixed inset-0 z-[200] transition-all duration-500 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <span className="text-xl font-black">Меню</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Категории</p>
                {categories.map((c) => (
                  <Link 
                    key={c.slug} 
                    href={`/categories/${c.slug}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl font-bold text-gray-700 dark:text-gray-200"
                  >
                    {c.name} <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Сервис</p>
                <Link href="/account" className="flex items-center gap-3 px-2 font-bold text-gray-600"><User className="h-5 w-5" /> Профиль</Link>
                <Link href="/favorites" className="flex items-center gap-3 px-2 font-bold text-gray-600"><Heart className="h-5 w-5" /> Избранное</Link>
                <Link href="/contacts" className="flex items-center gap-3 px-2 font-bold text-gray-600"><Phone className="h-5 w-5" /> Поддержка</Link>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
              <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/30">
                Войти в кабинет
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer, чтобы контент не заезжал под фиксированный Header */}
      <div className="h-20 md:h-32"></div>
    </>
  );
}