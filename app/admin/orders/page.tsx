'use client'

import { useState } from 'react'
import { 
  Search, Filter, Eye, Check, X,
  Clock, Package, Truck, CheckCircle,
  MoreVertical, Download, Printer
} from 'lucide-react'

const orders = [
  {
    id: 'ORD-78901',
    customer: 'Иван Иванов',
    date: '15.12.2023',
    amount: 24999,
    status: 'delivered',
    items: 3,
    payment: 'Картой онлайн',
    delivery: 'Курьер'
  },
  {
    id: 'ORD-78900',
    customer: 'Мария Петрова',
    date: '15.12.2023',
    amount: 15999,
    status: 'processing',
    items: 1,
    payment: 'При получении',
    delivery: 'Самовывоз'
  },
  {
    id: 'ORD-78899',
    customer: 'Алексей Сидоров',
    date: '14.12.2023',
    amount: 89999,
    status: 'shipped',
    items: 5,
    payment: 'Картой онлайн',
    delivery: 'Курьер'
  },
  {
    id: 'ORD-78898',
    customer: 'Елена Васильева',
    date: '14.12.2023',
    amount: 34999,
    status: 'delivered',
    items: 2,
    payment: 'Картой онлайн',
    delivery: 'Почта'
  },
  {
    id: 'ORD-78897',
    customer: 'Дмитрий Козлов',
    date: '13.12.2023',
    amount: 12999,
    status: 'cancelled',
    items: 1,
    payment: 'При получении',
    delivery: 'Самовывоз'
  },
  {
    id: 'ORD-78896',
    customer: 'Анна Смирнова',
    date: '13.12.2023',
    amount: 45999,
    status: 'processing',
    items: 4,
    payment: 'Картой онлайн',
    delivery: 'Курьер'
  },
  {
    id: 'ORD-78895',
    customer: 'Сергей Иванов',
    date: '12.12.2023',
    amount: 7999,
    status: 'delivered',
    items: 1,
    payment: 'При получении',
    delivery: 'Почта'
  },
  {
    id: 'ORD-78894',
    customer: 'Ольга Петрова',
    date: '12.12.2023',
    amount: 29999,
    status: 'shipped',
    items: 2,
    payment: 'Картой онлайн',
    delivery: 'Курьер'
  }
]

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')

  const statuses = [
    { value: 'all', label: 'Все статусы', icon: <Package className="h-4 w-4" /> },
    { value: 'processing', label: 'В обработке', icon: <Clock className="h-4 w-4" /> },
    { value: 'shipped', label: 'Отправлен', icon: <Truck className="h-4 w-4" /> },
    { value: 'delivered', label: 'Доставлен', icon: <CheckCircle className="h-4 w-4" /> },
    { value: 'cancelled', label: 'Отменен', icon: <X className="h-4 w-4" /> }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs rounded-full">
            <Clock className="h-3 w-3" />
            В обработке
          </span>
        )
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full">
            <Truck className="h-3 w-3" />
            Отправлен
          </span>
        )
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs rounded-full">
            <CheckCircle className="h-3 w-3" />
            Доставлен
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs rounded-full">
            <X className="h-3 w-3" />
            Отменен
          </span>
        )
      default:
        return null
    }
  }

  const getTotalStats = () => {
    const total = orders.length
    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)
    const processing = orders.filter(o => o.status === 'processing').length
    return { total, totalAmount, processing }
  }

  const stats = getTotalStats()

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold">Заказы</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Управление и отслеживание заказов
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-gray-600 dark:text-gray-400">Всего заказов</div>
            </div>
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${stats.totalAmount.toLocaleString()}</div>
              <div className="text-gray-600 dark:text-gray-400">Общая сумма</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{stats.processing}</div>
              <div className="text-gray-600 dark:text-gray-400">В обработке</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по ID или клиенту..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Все даты</option>
            <option value="today">Сегодня</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
          </select>

          <div className="flex gap-2">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex-1">
              <Download className="h-4 w-4" />
              Экспорт
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="text-left px-6 py-4 font-semibold">ID заказа</th>
                <th className="text-left px-6 py-4 font-semibold">Клиент</th>
                <th className="text-left px-6 py-4 font-semibold">Дата</th>
                <th className="text-left px-6 py-4 font-semibold">Сумма</th>
                <th className="text-left px-6 py-4 font-semibold">Статус</th>
                <th className="text-left px-6 py-4 font-semibold">Оплата</th>
                <th className="text-left px-6 py-4 font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id}
                  className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.items} товаров</div>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-bold">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div>{order.payment}</div>
                      <div className="text-gray-500">{order.delivery}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800" title="Просмотр">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800" title="Подтвердить">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800" title="Отменить">
                        <X className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-800" title="Еще">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Пагинация */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Показано {filteredOrders.length} из {orders.length} заказов
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              ←
            </button>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  page === 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}