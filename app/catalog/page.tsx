"use client";

import { useState, useMemo } from "react";
import {
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  Cpu,
  Gamepad2,
  Smartphone,
  Headphones,
  Search,
  X,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "@/context/ProductsContext";

const categories = [
  { id: "all", name: "Все товары", icon: <Grid3x3 className="h-4 w-4" /> },
  {
    id: "gaming",
    name: "Гейминг",
    icon: <Gamepad2 className="h-4 w-4" />,
    color: "text-orange-400",
  },
  {
    id: "creative",
    name: "Творчество",
    icon: <Cpu className="h-4 w-4" />,
    color: "text-purple-400",
  },
  {
    id: "mobile",
    name: "Мобильность",
    icon: <Smartphone className="h-4 w-4" />,
    color: "text-blue-400",
  },
  {
    id: "accessory",
    name: "Аксессуары",
    icon: <Headphones className="h-4 w-4" />,
    color: "text-green-400",
  },
];

const priceRanges = [
  { id: "all", name: "Любая цена" },
  { id: "budget", name: "До 50,000 ₽", max: 50000 },
  { id: "mid", name: "50,000 - 150,000 ₽", min: 50000, max: 150000 },
  { id: "premium", name: "От 150,000 ₽", min: 150000 },
];

export default function CatalogPage() {
  const { products } = useProducts();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">(
    "name"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Фильтр по категории
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Фильтр по цене
    if (selectedPrice !== "all") {
      const range = priceRanges.find((r) => r.id === selectedPrice);
      if (range) {
        if (range.min) filtered = filtered.filter((p) => p.price >= range.min!);
        if (range.max) filtered = filtered.filter((p) => p.price <= range.max!);
      }
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, selectedPrice, sortBy, searchQuery]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) + (selectedPrice !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedPrice("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Заголовок и поиск */}
        <div className="mb-8">
          <h1 className="font-exo text-4xl font-bold mb-2">
            Каталог устройств
          </h1>
          <p className="text-gray-400 mb-6">
            Выберите устройства для своей идеальной цифровой экосистемы
          </p>

          {/* Поисковая строка */}
          <div className="relative max-w-2xl mb-6">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск устройств по названию или описанию..."
              className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Панель управления */}
        <div className="glass-card rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Левая часть - переключатели категорий */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <span className={cat.color}>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Правая часть - сортировка и вид */}
            <div className="flex items-center gap-4">
              {/* Сортировка */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-gray-900 border border-gray-700 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-blue-500 text-sm"
                >
                  <option value="name">По названию</option>
                  <option value="price-asc">Сначала дешевые</option>
                  <option value="price-desc">Сначала дорогие</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Переключатель вида */}
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-gray-400"
                  }`}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-gray-400"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Кнопка фильтров для мобильных */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors relative"
              >
                <Filter className="h-5 w-5" />
                Фильтры
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Активные фильтры */}
          {(selectedCategory !== "all" ||
            selectedPrice !== "all" ||
            searchQuery) && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-400">
                    Активные фильтры:
                  </span>

                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="ml-1 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {selectedPrice !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {priceRanges.find((p) => p.id === selectedPrice)?.name}
                      <button
                        onClick={() => setSelectedPrice("all")}
                        className="ml-1 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      Поиск: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-1 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Очистить все
                </button>
              </div>
            </div>
          )}

          {/* Фильтры для мобильных */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-800 md:hidden animate-fadeInUp">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Ценовой диапазон:</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setSelectedPrice(range.id)}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          selectedPrice === range.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Сайдбар с фильтрами (десктоп) */}
          <aside className="hidden lg:block">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Фильтры
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Очистить
                  </button>
                )}
              </div>

              {/* Фильтр по цене */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Ценовой диапазон</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPrice(range.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedPrice === range.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-800 text-gray-300"
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Фильтр по экосистемам */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Экосистемы</h4>
                <div className="space-y-3">
                  {[
                    {
                      id: "gaming",
                      name: "Nexus Gaming",
                      color: "border-orange-500",
                    },
                    {
                      id: "creative",
                      name: "Nexus Creator",
                      color: "border-purple-500",
                    },
                    {
                      id: "mobile",
                      name: "Nexus Mobile",
                      color: "border-blue-500",
                    },
                  ].map((eco) => (
                    <label
                      key={eco.id}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">
                        {eco.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Фильтр по брендам */}
              <div>
                <h4 className="font-medium mb-4">Бренды</h4>
                <div className="space-y-3">
                  {["Nexus", "ASUS", "Apple", "Logitech", "Samsung"].map(
                    (brand) => (
                      <label
                        key={brand}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">
                          {brand}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Список товаров */}
          <div className="lg:col-span-3">
            {/* Статистика */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400">
                  Найдено товаров:{" "}
                  <span className="text-white font-semibold">
                    {filteredProducts.length}
                  </span>
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {viewMode === "grid" ? "Сетка" : "Список"}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center p-6 rounded-full bg-gray-800/50 mb-6">
                  <Search className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Товары не найдены
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Попробуйте изменить параметры фильтрации или ввести другой
                  поисковый запрос
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={
                        viewMode === "list" ? "glass-card rounded-xl" : ""
                      }
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Пагинация */}
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      Назад
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors">
                      2
                    </button>
                    <button className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors">
                      3
                    </button>
                    <span className="px-2 text-gray-500">...</span>
                    <button className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors">
                      10
                    </button>
                    <button className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors">
                      Далее
                    </button>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Информационный блок */}
        <div className="mt-16 glass-card rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-500/20 mb-4">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Безопасная оплата</h3>
              <p className="text-sm text-gray-400">
                Все платежи защищены шифрованием
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-500/20 mb-4">
                <svg
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Гарантия 2 года</h3>
              <p className="text-sm text-gray-400">
                Расширенная гарантия на все устройства
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-500/20 mb-4">
                <svg
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-sm text-gray-400">
                Доставка по России за 1-3 дня
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
