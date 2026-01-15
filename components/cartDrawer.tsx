"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  // 1. Блокировка скролла body при открытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // 2. Закрытие по клавише Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white dark:bg-gray-950 shadow-[0_0_50px_rgba(0,0,0,0.3)] z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-950 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-950">
                      {totalItems}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black tracking-tight">Корзина</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-90"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-7xl bg-gray-50 dark:bg-gray-900 p-8 rounded-[3rem]">🛒</div>
                  <div>
                    <p className="text-xl font-black mb-1">Пусто</p>
                    <p className="text-gray-500 text-sm max-w-[200px]">
                      Вы еще не добавили ни одного товара в корзину
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Перейти к покупкам
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4 p-4 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all"
                  >
                    <div className="h-20 w-20 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm">
                       {/* Отображаем иконку по категории, если нет картинки */}
                       {item.category === "electronics" ? "📱" : 
                        item.category === "clothing" ? "👕" : 
                        item.category === "home" ? "🏠" : "📦"}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-sm leading-tight line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <p className="font-black text-blue-600 dark:text-blue-400">
                          {item.price.toLocaleString()} ₽
                        </p>
                        
                        <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-blue-600 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-blue-600 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-sm text-gray-500">
                      <span>Доставка</span>
                      <span className="font-bold text-green-600 uppercase text-[10px] tracking-widest">Бесплатно</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-gray-500 font-bold">Итого к оплате:</span>
                      <span className="text-3xl font-black tracking-tighter">
                        {totalPrice.toLocaleString()} ₽
                      </span>
                   </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] flex items-center justify-center gap-3 font-black transition-all active:scale-[0.98] shadow-xl shadow-blue-500/25 group"
                  >
                    Оформить заказ
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full py-2 text-center text-xs font-bold text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
                  >
                    Продолжить покупки
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}