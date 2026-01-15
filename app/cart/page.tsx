'use client'

import { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'

// Имитируем данные, которые потом придут из контекста корзины
const initialItems = [
  {
    id: '1',
    name: 'Смартфон Samsung Galaxy S23',
    price: 79999,
    quantity: 1,
    image: '📱',
    category: 'Электроника'
  },
  {
    id: '2',
    name: 'Джинсы классические',
    price: 3499,
    quantity: 2,
    image: '👖',
    category: 'Одежда'
  }
]

export default function CartPage() {
  const [items, setItems] = useState(initialItems)

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const freeShippingThreshold = 10000
  const shipping = subtotal > freeShippingThreshold ? 0 : 500
  const total = subtotal + shipping
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-transparent py-12">
      <div className="container mx-auto px-4">
        
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            <ShoppingBag className="h-10 w-10 text-blue-600" />
            Корзина
          </h1>
          <span className="text-gray-500 font-bold bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-sm">
            {items.length} товара
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-black mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-500 max-w-xs mx-auto mb-10">
              Похоже, вы еще ничего не выбрали. Исправим это?
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2 px-10">
              <ArrowLeft className="h-5 w-5" />
              Начать покупки
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* 1. СПИСОК ТОВАРОВ (8 колонок) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Индикатор бесплатной доставки */}
              {shipping > 0 && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-bold text-blue-600">
                      Добавьте еще на {(freeShippingThreshold - subtotal).toLocaleString()} ₽ для бесплатной доставки
                    </p>
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="h-2 w-full bg-blue-50 dark:bg-blue-900/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-500" 
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="group card p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
                    {/* Превью */}
                    <div className="h-24 w-24 md:h-32 md:w-32 bg-gray-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner shrink-0 transition-transform group-hover:scale-105">
                      {item.image}
                    </div>

                    {/* Инфо */}
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-xl font-black mb-1">{item.name}</h3>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.category}</p>
                      <div className="text-2xl font-black text-blue-600 mt-2">
                        {item.price.toLocaleString()} ₽
                      </div>
                    </div>

                    {/* Управление количеством */}
                    <div className="flex flex-col items-center gap-4 shrink-0">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl border border-transparent focus-within:border-blue-500 transition-all">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all active:scale-90"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-black">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all active:scale-90"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest"
                      >
                        <Trash2 className="h-4 w-4" /> Удалить
                      </button>
                    </div>

                    {/* Итого за позицию */}
                    <div className="hidden md:block min-w-[120px] text-right">
                      <div className="text-xs font-bold text-gray-400 mb-1 uppercase">Всего</div>
                      <div className="text-xl font-black tracking-tight">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Вернуться в каталог
              </Link>
            </div>

            {/* 2. ИТОГО (4 колонки) */}
            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-black mb-8">Детали заказа</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Сумма:</span>
                    <span className="text-gray-900 dark:text-white font-bold">{subtotal.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Доставка:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-bold' : 'text-gray-900 dark:text-white font-bold'}>
                      {shipping === 0 ? 'Бесплатно' : `${shipping} ₽`}
                    </span>
                  </div>
                  <div className="h-[1px] bg-gray-100 dark:bg-gray-800 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold">К оплате:</span>
                    <span className="text-4xl font-black text-blue-600 tracking-tighter">
                      {total.toLocaleString()} ₽
                    </span>
                  </div>
                </div>

                <button className="w-full btn-primary py-5 text-xl mb-6 shadow-blue-500/40">
                  Оформить заказ
                </button>

                {/* Гарантии */}
                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    Безопасная оплата SSL
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <Truck className="h-5 w-5 text-blue-500" />
                    Доставка до двери или в ПВЗ
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}