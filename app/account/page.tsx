"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductsContext";
import { Addres } from "@/components/accaunt/Addres";
import { Plus, MapPin, Trash2, CheckCircle2, Home } from "lucide-react";

export default function AddressesPage() {
  const { addresses, loading, deleteAddress, setDefaultAddress } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* Шапка страницы */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Адреса доставки</h2>
          <p className="text-gray-500 mt-1">Управляйте вашими точками получения заказов</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black dark:bg-blue-600 text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-all shadow-lg active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Новый адрес</span>
        </button>
      </div>

      {/* Сетка адресов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div 
            key={addr.id} 
            className={`relative p-6 rounded-3xl border-2 transition-all ${
              addr.isDefault 
                ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10" 
                : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
            }`}
          >
            {addr.isDefault && (
              <div className="absolute top-4 right-4 text-blue-500">
                <CheckCircle2 className="h-6 w-6 fill-current" />
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Home className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1 pr-8">
                <h3 className="font-bold text-lg">{addr.title || "Дом"}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                  {addr.city}, {addr.street}, <br />
                  дом {addr.house}, кв. {addr.apartment}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {!addr.isDefault && (
                <button 
                  onClick={() => setDefaultAddress?.(addr.id)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Сделать основным
                </button>
              )}
              <button 
                onClick={() => deleteAddress?.(addr.id)}
                className="ml-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {/* Пустое состояние */}
        {addresses.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-full mb-4">
              <MapPin className="h-10 w-10 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium text-center">
              Список адресов пуст.<br />Добавьте адрес для быстрого оформления заказов.
            </p>
          </div>
        )}
      </div>

      {/* Здесь может быть ваш компонент Addres (как форма) */}
      {/* <Addres isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </div>
  );
}