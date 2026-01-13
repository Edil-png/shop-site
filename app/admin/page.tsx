'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, Users, ShoppingCart, Package,
  DollarSign, CreditCard, BarChart3, Activity,
  Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

const stats = [
  {
    title: 'Общий доход',
    value: '245,876',
    change: '+12.5%',
    trend: 'up',
    icon: <DollarSign className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Новые заказы',
    value: '1,234',
    change: '+5.2%',
    trend: 'up',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Пользователи',
    value: '45,678',
    change: '+8.7%',
    trend: 'up',
    icon: <Users className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Товары',
    value: '2,345',
    change: '-2.1%',
    trend: 'down',
    icon: <Package className="h-6 w-6" />,
    color: 'from-orange-500 to-red-500'
  }
]

const recentOrders = [
  { id: 'ORD-78901', customer: 'Иван Иванов', amount: 24999, status: 'Доставлен', date: 'Сегодня' },
  { id: 'ORD-78900', customer: 'Мария Петрова', amount: 15999, status: 'В обработке', date: 'Сегодня' },
  { id: 'ORD-78899', customer: 'Алексей Сидоров', amount: 89999, status: 'Отправлен', date: 'Вчера' },
  { id: 'ORD-78898', customer: 'Елена Васильева', amount: 34999, status: 'Доставлен', date: 'Вчера' },
  { id: 'ORD-78897', customer: 'Дмитрий Козлов', amount: 12999, status: 'Отменен', date: '2 дня назад' }
]

const topProducts = [
  { name: 'Смартфон Samsung Galaxy S23', sales: 234, revenue: 18799666, stock: 45 },
  { name: 'Наушники Sony WH-1000XM5', sales: 189, revenue: 5661111, stock: 23 },
  { name: 'Ноутбук Apple MacBook Pro', sales: 156, revenue: 23399944, stock: 12 },
  { name: 'Умные часы Apple Watch', sales: 145, revenue: 5795555, stock: 34 },
  { name: 'Планшет Samsung Galaxy Tab', sales: 123, revenue: 3690000, stock: 56 }
]

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Обзор статистики и активности магазина
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* График и заказы */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* График дохода */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Динамика дохода</h2>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>За месяц</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                График дохода (демо)
              </p>
            </div>
          </div>
        </div>

        {/* Последние заказы */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Последние заказы</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">
              Смотреть все →
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${order.amount.toLocaleString()}</div>
                  <div className={`text-sm ${
                    order.status === 'Доставлен' ? 'text-green-600' :
                    order.status === 'В обработке' ? 'text-yellow-600' :
                    order.status === 'Отправлен' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Топ товары */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Популярные товары</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">
            Экспорт в CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold">Товар</th>
                <th className="text-left py-3 px-4 font-semibold">Продажи</th>
                <th className="text-left py-3 px-4 font-semibold">Выручка</th>
                <th className="text-left py-3 px-4 font-semibold">Остаток</th>
                <th className="text-left py-3 px-4 font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4">
                    <div className="font-medium">{product.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      {product.sales}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold">${product.revenue.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
                      product.stock > 30 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      product.stock > 10 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {product.stock} шт.
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm">
                      Редактировать
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
          <Package className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <div className="font-semibold">Добавить товар</div>
        </button>
        <button className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
          <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
          <div className="font-semibold">Новый заказ</div>
        </button>
        <button className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border border-purple-200 dark:border-purple-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
          <CreditCard className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
          <div className="font-semibold">Статистика</div>
        </button>
        <button className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 border border-orange-200 dark:border-orange-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
          <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
          <div className="font-semibold">Отчеты</div>
        </button>
      </div>
    </div>
  )
}