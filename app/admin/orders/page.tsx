'use client'

import { useState } from 'react'
import { 
  Search, Filter, Eye, Check, X,
  Clock, Package, Truck, CheckCircle,
  MoreVertical, Download, Printer, ChevronRight,
  User, CreditCard, MapPin
} from 'lucide-react'

// ... (данные orders остаются прежними)

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const statuses = [
    { value: 'all', label: 'Все заказы', color: 'bg-gray-100 text-gray-600' },
    { value: 'processing', label: 'В обработке', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'shipped', label: 'Отправлены', color: 'bg-blue-100 text-blue-700' },
    { value: 'delivered', label: 'Доставлены', color: 'bg-green-100 text-green-700' },
    { value: 'cancelled', label: 'Отменены', color: 'bg-red-100 text-red-700' }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Шапка и экспорт */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Заказы</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Найдено {filteredOrders.length} транзакций за выбранный период
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
            <Printer className="h-4 w-4" />
            Печать счетов
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Download className="h-4 w-4" />
            Экспорт CSV
          </button>
        </div>
      </div>

      {/* Быстрые фильтры-табы */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {statuses.map(status => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
              ${selectedStatus === status.value 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                : 'bg-white dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-blue-300'}
            `}
          >
            {status.label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] ${selectedStatus === status.value ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
              {status.value === 'all' ? orders.length : orders.filter(o => o.status === status.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Поиск и расширенные фильтры */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Поиск по номеру, клиенту или телефону..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden md:block" />
          <button className="p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Таблица */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-700">
                <th className="p-4 text-left w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    onChange={(e) => e.target.checked ? setSelectedOrders(orders.map(o => o.id)) : setSelectedOrders([])}
                  />
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-400">Заказ</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-400">Клиент</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-400">Доставка</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-400">Сумма</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600 dark:text-gray-400">Статус</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-600 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className={`
                    group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors
                    ${selectedOrders.includes(order.id) ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}
                  `}
                >
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">#{order.id.split('-')[1]}</span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" /> {order.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs uppercase">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 dark:text-white">{order.customer}</span>
                        <span className="text-[11px] text-gray-400 italic">id: user_9283</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        {order.delivery}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                        <CreditCard className="h-3 w-3" />
                        {order.payment}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {order.amount.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-[11px] text-green-500 font-medium">Оплачено</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-200">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Вспомогательный компонент для бейджа статуса
const getStatusBadge = (status: string) => {
  const configs = {
    processing: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock, label: 'Обработка' },
    shipped: { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: Truck, label: 'В пути' },
    delivered: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle, label: 'Доставлен' },
    cancelled: { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: X, label: 'Отменен' },
  }
  
  const config = configs[status as keyof typeof configs] || configs.processing
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${config.color}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  )
}