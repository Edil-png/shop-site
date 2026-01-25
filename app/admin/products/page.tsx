"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { TableCard } from "@/components/admin/components/TableCard";
import Link from "next/link";


// Добавляем массив категорий
const categories = [
  "all",
  "Электроника",
  "Одежда",
  "Мебель",
  "Книги",
  "Спорттовары",
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { products } = useProducts();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Логика выбора
  const toggleProductSelection = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length
        ? []
        : filteredProducts.map((p) => p.id),
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Каталог товаров</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Всего {products.length} позиций в {categories.length - 1} категориях
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={"/admin/add-product"}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Добавить товар
          </Link>
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "Все категории" : category}
            </option>
          ))}
        </select>
        <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 transition-colors">
          <Filter className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <TableCard
        selectedProducts={selectedProducts}
        filteredProducts={filteredProducts}
        toggleSelectAll={toggleSelectAll}
        toggleProductSelection={toggleProductSelection}
        getStatusBadge={getStatusBadge}
      />{" "}
      {/* Карточка */}
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
  );
}

const getStatusBadge = (status: string) => {
  const map = {
    active: {
      text: "В наличии",
      class: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    "low-stock": {
      text: "Мало",
      class: "bg-amber-50 text-amber-700 border-amber-100",
      icon: AlertTriangle,
    },
    "out-of-stock": {
      text: "Нет",
      class: "bg-rose-50 text-rose-700 border-rose-100",
    },
  };
  const config = map[status as keyof typeof map] || map.active;

  // Добавляем проверку на существование иконки
  const IconComponent = config.icon;

  return (
    <span
      className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${config.class}`}
    >
      {IconComponent && <IconComponent className="h-3 w-3" />}
      {config.text}
    </span>
  );
};
