"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, totalItems } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Темный фон (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Панель корзины */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[201] flex flex-col"
          >
            {/* Шапка корзины */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-black">Корзина ({totalItems})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Список товаров */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 font-bold">Ваша корзина пуста</p>
                  <button
                    onClick={onClose}
                    className="mt-4 text-blue-600 font-bold text-sm"
                  >
                    Начать покупки
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="h-20 w-20 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                      {item.image || "📦"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-blue-600 font-black mt-1">
                        {item.price.toLocaleString()} ₽
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Футер с кнопкой оплаты */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4 bg-gray-50/50 dark:bg-gray-800/20">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 font-bold">Итого:</span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white">
                    {subtotal.toLocaleString()} ₽
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2"
                >
                  Оформить заказ
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button
                  onClick={onClose}
                  className="w-full text-center text-sm font-bold text-gray-400 hover:text-gray-600"
                >
                  Продолжить покупки
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
