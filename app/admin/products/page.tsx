'use client'

import { useState } from 'react'
import { 
  Plus, Search, Filter, Edit, Trash2, 
  Eye, MoreVertical, Download, Upload,
  Check, X, Package, Tag, ArrowUpDown, AlertTriangle
} from 'lucide-react'

// ... (данные products остаются прежними)

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const categories = ['all', 'Электроника', 'Одежда', 'Для дома', 'Красота']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Логика выбора
  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    setSelectedProducts(selectedProducts.length === filteredProducts.length ? [] : filteredProducts.map(p => p.id))
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Каталог товаров</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Всего {products.length} позиций в 5 категориях
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <button className="p-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 transition-colors border-r border-gray-200 dark:border-gray-700">
              <Upload className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            <Plus className="h-4 w-4" />
            Создать товар
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию, бренду или артикулу..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium outline-none focus:border-blue-500"
        >
          <option value="all">Все категории</option>
          {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 transition-colors">
          <Filter className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto text-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-5 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-500">Товар</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-500">Категория</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-500">
                   <div className="flex items-center gap-1">Цена <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-500 text-center">Склад</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-500">Статус</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id}
                  className={`group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors ${selectedProducts.includes(product.id) ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                >
                  <td className="p-5">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl shadow-inner border border-gray-200 dark:border-gray-600 group-hover:scale-105 transition-transform cursor-pointer">
                        {product.image}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors cursor-pointer leading-tight">
                          {product.name}
                        </span>
                        <span className="text-[11px] text-gray-400 font-mono mt-1">SKU: {product.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1.5 min-w-[100px]">
                       <div className="flex justify-between w-full text-[11px] font-medium px-0.5">
                          <span className={product.stock < 10 ? 'text-rose-500' : 'text-gray-400'}>{product.stock} шт.</span>
                          <span className="text-gray-400">100+</span>
                       </div>
                       <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${product.stock === 0 ? 'bg-rose-500' : product.stock < 15 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(product.stock, 100)}%` }}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-blue-600 transition-shadow border border-transparent hover:border-gray-100 shadow-sm" title="Правка">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-red-500 transition-shadow border border-transparent hover:border-gray-100 shadow-sm" title="Удалить">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions Toolbar (Floating) */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8">
          <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 border border-white/10 ring-4 ring-black/5">
            <div className="flex items-center gap-3 pr-6 border-r border-white/20">
              <div className="h-6 w-6 bg-blue-500 rounded-md flex items-center justify-center text-xs font-bold">
                {selectedProducts.length}
              </div>
              <span className="text-sm font-medium">Выбрано товаров</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                <Edit className="h-4 w-4" /> Изменить цены
              </button>
              <button className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors">
                <Trash2 className="h-4 w-4" /> Удалить
              </button>
              <button 
                onClick={() => setSelectedProducts([])}
                className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const getStatusBadge = (status: string) => {
  const map = {
    active: { text: 'В наличии', class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    'low-stock': { text: 'Мало', class: 'bg-amber-50 text-amber-700 border-amber-100', icon: AlertTriangle },
    'out-of-stock': { text: 'Нет', class: 'bg-rose-50 text-rose-700 border-rose-100' }
  }
  const config = map[status as keyof typeof map] || map.active
  return (
    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${config.class}`}>
      {config.icon && <config.icon className="h-3 w-3" />}
      {config.text}
    </span>
  )
}