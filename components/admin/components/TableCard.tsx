"use client";

import { Product } from "@/type/product";
import api from "@/utils/axios";
import { ArrowUpDown, Edit, MoreVertical, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TableCardProps {
  selectedProducts: string[];
  filteredProducts: Product[];
  toggleSelectAll: () => void;
  toggleProductSelection: (id: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  onDelete: (id: string) => void;
}

export function TableCard({
  selectedProducts,
  filteredProducts,
  toggleSelectAll,
  toggleProductSelection,
  getStatusBadge,
  onDelete,
}: TableCardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteClick = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation(); // Останавливаем переход по ссылке при клике на удаление
    if (!confirm(`Вы уверены, что хотите удалить товар "${name}"?`)) return;

    setDeletingId(id);
    try {
      await api.delete(`/api/products/${id}`);
      onDelete(id);
    } catch (error: any) {
      alert("Не удалось удалить товар.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto text-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 font-semibold">
              <th className="p-5 text-left w-10">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 text-left">Товар</th>
              <th className="px-6 py-4 text-left">Категория</th>
              <th className="px-6 py-4 text-left">Цена</th>
              <th className="px-6 py-4 text-center">Склад</th>
              <th className="px-6 py-4 text-left">Статус</th>
              <th className="px-6 py-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                onClick={() => router.push(`/admin/products/${product.id}`)}
                className={`group cursor-pointer hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors ${
                  selectedProducts.includes(product.id) ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
                } ${deletingId === product.id ? "opacity-40 pointer-events-none" : ""}`}
              >
                {/* Чекбокс */}
                <td className="p-5" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </td>

                {/* Инфо о товаре */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">📦</div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">{product.name}</span>
                      <span className="text-[11px] text-gray-400 font-mono uppercase">{product.sku}</span>
                    </div>
                  </div>
                </td>

                {/* Категория */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs">{product.category}</span>
                </td>

                {/* Цена */}
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                  {product.price.toLocaleString("ru-RU")} ₽
                </td>

                {/* Склад */}
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center gap-1.5 min-w-[100px]">
                    <span className={`text-[11px] font-medium ${product.stock > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {product.stock} шт.
                    </span>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${product.stock === 0 ? "bg-rose-500" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min(product.stock, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Статус */}
                <td className="px-6 py-4">{getStatusBadge(product.stock > 0 ? "in-stock" : "out-of-stock")}</td>

                {/* Действия */}
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, product.id, product.name)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg text-red-500"
                    >
                      {deletingId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}