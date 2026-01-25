import { Product } from "@/type/product";
import { ArrowUpDown, Edit, MoreVertical, Trash2 } from "lucide-react";

interface TableCardProps {
  selectedProducts: string[];
  filteredProducts: Product[];
  toggleSelectAll: () => void;
  toggleProductSelection: (id: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function TableCard({
  selectedProducts,
  filteredProducts,
  toggleSelectAll,
  toggleProductSelection,
  getStatusBadge,
}: TableCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto text-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
              <th className="p-5 text-left w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedProducts.length === filteredProducts.length &&
                    filteredProducts.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-500">
                Товар
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-500">
                Категория
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-500">
                <div className="flex items-center gap-1">
                  Цена <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-500 text-center">
                Склад
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-500">
                Статус
              </th>
              <th className="px-6 py-4 text-right font-semibold text-gray-500">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors ${
                    selectedProducts.includes(product.id)
                      ? "bg-blue-50/50 dark:bg-blue-900/20"
                      : ""
                  }`}
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
                        <img src={product.images} alt={product.images} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors cursor-pointer leading-tight">
                          {product.name}
                        </span>
                        <span className="text-[11px] text-gray-400 font-mono mt-1">
                          {/* SKU: {product.sku} */}
                        </span>
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
                      {product.price.toLocaleString("ru-RU")} ₽
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1.5 min-w-[100px]">
                      <div className="flex justify-between w-full text-[11px] font-medium px-0.5">
                        <span
                          className={
                            product.inStock ? "text-rose-500" : "text-gray-400"
                          }
                        >
                          {product.inStock} шт.
                        </span>
                        <span className="text-gray-400">100+</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            product.inStock
                              ? "bg-rose-500"
                              : product.discount < 15
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(product.discount, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* {getStatusBadge(product.)} */}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-blue-600 transition-shadow border border-transparent hover:border-gray-100 shadow-sm"
                        title="Правка"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-red-500 transition-shadow border border-transparent hover:border-gray-100 shadow-sm"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      📦
                    </div>
                    <p className="font-medium">Товары не найдены</p>
                    <p className="text-sm text-gray-400">
                      Попробуйте изменить параметры поиска или фильтры
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
