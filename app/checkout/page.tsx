'use client'

import { useCart } from "@/context/cartContext";
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Имитация отправки заказа
    setTimeout(() => {
      toast.success("Заказ успешно оформлен!", {
        description: "Мы свяжемся с вами в ближайшее время."
      });
      clearCart();
      setLoading(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black mb-4">Ваша корзина пуста</h2>
        <Link href="/" className="btn-primary px-8 py-3 rounded-2xl bg-blue-600 text-white">Вернуться в магазин</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/" className="flex items-center gap-2 text-gray-500 mb-8 hover:text-blue-600 transition-colors">
          <ArrowLeft size={20} /> Назад к покупкам
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ФОРМА */}
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-black mb-6">Данные получателя</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required placeholder="Имя" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                <input required placeholder="Фамилия" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                <input required type="tel" placeholder="Телефон" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                <input required type="email" placeholder="Email" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                <input required placeholder="Адрес доставки" className="md:col-span-2 w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </form>
          </div>

          {/* ИТОГО */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24">
              <h3 className="text-xl font-black mb-6">Ваш заказ</h3>
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.name} x{item.quantity}</span>
                    <span className="font-bold">{(item.price * item.quantity).toLocaleString()} ₽</span>
                  </div>
                ))}
                <div className="border-t pt-4 flex justify-between items-end">
                  <span className="font-bold">Итого:</span>
                  <span className="text-3xl font-black text-blue-600">{totalPrice.toLocaleString()} ₽</span>
                </div>
              </div>
              <button 
                type="submit" 
                form="checkout-form"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black transition-all disabled:opacity-50"
              >
                {loading ? "Обработка..." : "Подтвердить заказ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}