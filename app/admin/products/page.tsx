'use client'

import { useState } from 'react'
import { 
  Plus, Search, Filter, Edit, Trash2, 
  Eye, MoreVertical, Download, Upload,
  Check, X, Package, Tag
} from 'lucide-react'

const products = [
  {
    id: '1',
    name: 'Смартфон Samsung Galaxy S23',
    sku: 'SM-G23-BLK',
    category: 'Электроника',
    price: 79999,
    stock: 45,
    status: 'active',
    sales: 234,
    image: '📱'
  },
  {
    id: '2',
    name: 'Наушники Sony WH-1000XM5',
    sku: 'SONY-WH5',
    category: 'Электроника',
    price: 29999,
    stock: 23,
    status: 'active',
    sales: 189,
    image: '🎧'
  },
  {
    id: '3',
    name: 'Джинсы классические',
    sku: 'JEANS-01',
    category: 'Одежда',
    price: 3499,
    stock: 156,
    status: 'active',
    sales: 89,
    image: '👖'
  },
  {
    id: '4',
    name: 'Кофемашина DeLonghi',
    sku: 'DL-CF-01',
    category: 'Для дома',
    price: 29999,
    stock: 12,
    status: 'low-stock',
    sales: 45,
    image: '☕'
  },
  {
    id: '5',
    name: 'Крем для лица',
    sku: 'CR-FACE-01',
    category: 'Красота',
    price: 1999,
    stock: 0,
    status: 'out-of-stock',
    sales: 156,
    image: '💄'
  },
  {
    id: '6',
    name: 'Умные часы Apple Watch',
    sku: 'APPLE-WATCH-9',
    category: 'Электроника',
    price: 39999,
    stock: 34,
    status: 'active',
    sales: 145,
    image: '⌚'
  },
  {
    id: '7',
    name: 'Футболка хлопковая',
    sku: 'TEE-01',
    category: 'Одежда',
    price: 1299,
    stock: 267,
    status: 'active',
    sales: 67,
    image: '👕'
  },
  {
    id: '8',
    name: 'Пылесос Dyson V15',
    sku: 'DYSON-V15',
    category: 'Для дома',
    price: 59999,
    stock: 8,
    status: 'low-stock',
    sales: 89,
    image: '🧹'
  }
]

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

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs rounded-full">В наличии</span>
      case 'low-stock':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs rounded-full">Мало</span>
      case 'out-of-stock':
        return <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs rounded-full">Нет в наличии</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Заголовок и действия */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Товары</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Управление товарами магазина
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <Upload className="h-4 w-4" />
            Импорт
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            Экспорт
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors">
            <Plus className="h-4 w-4" />
            Добавить товар
          </button>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или SKU..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Все категории</option>
            {categories.filter(c => c !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Filter className="h-4 w-4" />
            Больше фильтров
          </button>
        </div>
      </div>

      {/* Таблица товаров */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left px-6 py-4 font-semibold">Товар</th>
                <th className="text-left px-6 py-4 font-semibold">Категория</th>
                <th className="text-left px-6 py-4 font-semibold">Цена</th>
                <th className="text-left px-6 py-4 font-semibold">Остаток</th>
                <th className="text-left px-6 py-4 font-semibold">Статус</th>
                <th className="text-left px-6 py-4 font-semibold">Продажи</th>
                <th className="text-left px-6 py-4 font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id}
                  className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{product.image}</div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">${product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{product.stock} шт.</div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      {product.sales}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-800">
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
            Показано {filteredProducts.length} из {products.length} товаров
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

      {/* Выбранные товары */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              Выбрано {selectedProducts.length} товаров
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800">
                <Trash2 className="h-4 w-4 inline mr-1" />
                Удалить
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800">
                <Edit className="h-4 w-4 inline mr-1" />
                Редактировать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}