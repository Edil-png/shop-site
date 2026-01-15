"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "@/type/product";
import { useProducts } from "@/context/ProductsContext";

interface ChosenTabProps {
  items: Product[];
}

export function ChosenTab({ items }: ChosenTabProps) {
  const { addToCart } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Избранное</h2>
        <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400">
          {items.length} товаров
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Список избранного пуст</h3>
          <p className="text-gray-500 mb-6">
            Добавляйте товары, чтобы не потерять их
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              {/* Заглушка изображения на основе категории */}
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-3xl shrink-0">
                {item.category === "electronics" && "📱"}
                {item.category === "clothing" && "👕"}
                {item.category === "home" && "🏠"}
                {item.category === "beauty" && "💄"}
                {!["electronics", "clothing", "home", "beauty"].includes(item.category) && "📦"}
              </div>

              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 capitalize">
                  {item.category}
                </p>
                <div className="text-lg font-bold text-blue-600">
                  ${item.price.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => addToCart(item)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  title="Добавить в корзину"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <button 
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
                  title="Удалить из избранного"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}