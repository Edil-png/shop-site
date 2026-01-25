"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  Search,
  MoreVertical,
  ChevronDown,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { useProducts } from "@/context/ProductsContext";

// Типизация для безопасности
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: number;
  status: "active" | "inactive";
  subcategories: string[];
}

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useProducts();

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleExpand = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const handleDelete = (name: string) => {
    if (
      confirm(
        `Вы уверены, что хотите удалить категорию "${name}"? Все связанные товары могут потерять привязку.`,
      )
    ) {
      // Здесь будет вызов API
      console.log("Удаление:", name);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Шапка с градиентом */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Категории</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Структура вашего магазина: {categories.length} разделов
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none font-medium"
        >
          <Plus className="h-5 w-5" />
          Новая категория
        </button>
      </div>

      {/* Фильтр и поиск */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по названию или описанию..."
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
        />
      </div>

      {/* Сетка категорий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`
              group bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300
              ${
                expandedCategory === category.id
                  ? "border-blue-500 ring-4 ring-blue-500/5"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 shadow-sm"
              }
            `}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-xl transition-colors ${category.status === "active" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}
                >
                  <FolderTree className="h-6 w-6" />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.name)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                onClick={() => toggleExpand(category.id)}
                className="cursor-pointer"
              >
                <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                  {category.description}
                </p>

                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <div
                      className={`w-2 h-2 rounded-full ${category.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    {category.products} товаров
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedCategory === category.id ? "rotate-180" : ""}`}
                  />
                </div>
              </div>
            </div>

            {/* Секция подкатегорий с анимацией высоты */}
            <div
              className={`
              overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 dark:border-gray-700
              ${expandedCategory === category.id ? "max-h-96 opacity-100 bg-gray-50/50 dark:bg-gray-900/20" : "max-h-0 opacity-0"}
            `}
            >
              <div className="p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Подкатегории
                </p>
                {/* <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((sub, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium shadow-sm"
                    >
                      {sub}
                    </span>
                  ))}
                  <button className="px-3 py-1.5 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all">
                    + Добавить
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Статистика внизу */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard
          title="Активные разделы"
          value={categories.filter((c) => c.status === "active").length}
          color="text-green-600"
        />
        {/* <StatCard
          title="Всего товаров"
          value={categories.reduce((a, b) => a + b.products, 0)}
          color="text-blue-600"
        /> */}
        <StatCard
          title="Пустые категории"
          value={categories.filter((c) => c.products === 0).length}
          color="text-orange-600"
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </span>
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
    </div>
  );
}
