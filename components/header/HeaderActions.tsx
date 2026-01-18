'use client';
import { Heart, ShoppingBag, Menu, User } from 'lucide-react'; // Добавили User
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderActionsProps {
  favoritesCount: number;
  cartCount: number;
  isLoggedIn?: boolean; // Добавили статус входа
  userName?: string;    // Опционально: имя пользователя
  onCartOpen: () => void;
  onMenuOpen: () => void;
}

export default function HeaderActions({ 
  favoritesCount, 
  cartCount, 
  isLoggedIn = false, 
  userName,
  onCartOpen, 
  onMenuOpen 
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <ThemeToggle />
      
      {/* ЛОГИН / ПРОФИЛЬ */}
      <Link 
        href={isLoggedIn ? "/profile" : "/login"} 
        className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors flex items-center gap-2 group"
      >
        <User className={`h-5 w-5 ${isLoggedIn ? "text-blue-600" : ""}`} />
        {/* На десктопах показываем имя или текст "Войти" */}
        <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">
          {isLoggedIn ? (userName || "Профиль") : "Войти"}
        </span>
      </Link>

      {/* Избранное */}
      <Link href="/favorite" className="relative p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors">
        <Heart className={`h-5 w-5 ${favoritesCount > 0 ? "text-rose-500 fill-current" : ""}`} />
        <AnimatePresence>
          {favoritesCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-950"
            >
              {favoritesCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>

      {/* Корзина */}
      <button 
        onClick={onCartOpen} 
        className="relative p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
      >
        <ShoppingBag className="h-5 w-5" />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span 
              key={cartCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-950"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Бургер-меню (только мобилки) */}
      <button 
        className="md:hidden p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-600 dark:text-gray-300 active:scale-90 transition-transform" 
        onClick={onMenuOpen}
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
}