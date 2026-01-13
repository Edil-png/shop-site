'use client'

import { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const cartItems = [
  {
    id: '1',
    name: 'Смартфон Samsung Galaxy S23',
    price: 79999,
    quantity: 1,
    image: '📱',
    category: 'electronics'
  },
  {
    id: '2',
    name: 'Джинсы классические',
    price: 3499,
    quantity: 2,
    image: '👖',
    category: 'clothing'
  },
  {
    id: '3',
    name: 'Наушники Sony WH-1000XM5',
    price: 29999,
    quantity: 1,
    image: '🎧',
    category: 'electronics'
  }
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 10000 ? 0 : 500
  const total = subtotal + shipping

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingBag className="h-8 w-8" />
          Корзина
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Добавьте товары, чтобы сделать заказ
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Вернуться к покупкам
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Список товаров */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="card p-4 flex items-center gap-4">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <div className="text-2xl font-bold mt-2">${item.price}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-xl font-bold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/" className="btn-secondary inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Продолжить покупки
                </Link>
              </div>
            </div>

            {/* Итоги */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Итог заказа</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Подытог:</span>
                    <span className="font-semibold">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'Бесплатно' : `$${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && subtotal < 10000 && (
                    <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                      Бесплатная доставка при заказе от $10,000
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Итого:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full btn-primary py-3 text-lg">
                  Оформить заказ
                </button>

                <div className="mt-6 text-sm text-gray-500">
                  <p className="mb-2">Мы принимаем:</p>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Visa</div>
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">MasterCard</div>
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">PayPal</div>
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