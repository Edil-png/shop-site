'use client'

import { useState } from 'react'
import { 
  Plus, Edit, Trash2, FolderTree, 
  Search, MoreVertical, ArrowUpDown,
  Eye, EyeOff
} from 'lucide-react'

const categories = [
  {
    id: '1',
    name: 'Электроника',
    slug: 'electronics',
    description: 'Смартфоны, ноутбуки, гаджеты',
    products: 245,
    status: 'active',
    subcategories: ['Смартфоны', 'Ноутбуки', 'Наушники', 'Умные часы']
  },
  {
    id: '2',
    name: 'Одежда',
    slug: 'clothing',
    description: 'Мужская, женская, детская одежда',
    products: 120,
    status: 'active',
    subcategories: ['Мужское', 'Женское', 'Детское', 'Обувь']
  },
  {
    id: '3',
    name: 'Для дома',
    slug: 'home',
    description: 'Бытовая техника и мебель',
    products: 78,
    status: 'active',
    subcategories: ['Бытовая техника', 'Мебель', 'Текстиль', 'Кухня']
  },
  {
    id: '4',
    name: 'Красота',
    slug: 'beauty',
    description: 'Косметика и уход за собой',
    products: 56,
    status: 'active',
    subcategories: ['Косметика', 'Парфюмерия', 'Уход за кожей', 'Волосы']
  },
  {
    id: '5',
    name: 'Спорт',
    slug: 'sports',
    description: 'Спортивные товары и инвентарь',
    products: 34,
    status: 'inactive',
    subcategories: ['Тренажеры', 'Одежда', 'Аксессуары', 'Питание']
  },
  {
    id: '6',
    name: 'Книги',
    slug: 'books',
    description: 'Художественная и учебная литература',
    products: 89,
    status: 'active',
    subcategories: ['Художественные', 'Учебные', 'Детские', 'Бизнес']
  }
]

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleExpand = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Категории</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Управление категориями товаров
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors">
          <Plus className="h-4 w-4" />
          Добавить категорию
        </button>
      </div>

      {/* Поиск */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск категорий..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Список категорий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div 
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Заголовок категории */}
            <div 
              className="p-6 cursor-pointer"
              onClick={() => toggleExpand(category.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FolderTree className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {category.status === 'active' ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {category.products} товаров
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <ArrowUpDown className={`h-5 w-5 transition-transform ${
                    expandedCategory === category.id ? 'rotate-180' : ''
                  }`} />
                </button>
              </div>
            </div>

            {/* Подкатегории (раскрывающаяся часть) */}
            {expandedCategory === category.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 animate-fadeInUp">
                <h4 className="font-semibold mb-3">Подкатегории:</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.subcategories.map((sub, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Действия (если не раскрыто) */}
            {expandedCategory !== category.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    category.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {category.status === 'active' ? 'Активна' : 'Неактивна'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Пустое состояние */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <FolderTree className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Категории не найдены</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Попробуйте изменить поисковый запрос
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Сбросить поиск
          </button>
        </div>
      )}

      {/* Статистика */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold mb-4">Общая статистика</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Всего категорий</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold">
              {categories.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Активных</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold">
              {categories.reduce((sum, cat) => sum + cat.products, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Товаров всего</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold">
              {Math.round(categories.reduce((sum, cat) => sum + cat.products, 0) / categories.length)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Товаров на категорию</div>
          </div>
        </div>
      </div>
    </div>
  )
}