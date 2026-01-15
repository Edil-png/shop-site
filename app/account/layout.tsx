"use client";

import { useProducts } from "@/context/ProductsContext";
import { Addres } from "@/components/accaunt/Addres";
import { Plus } from "lucide-react";

export default function AddressesPage() {
  const { addresses, loading } = useProducts();

  if (loading) return <p>Загрузка адресов...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Мои адреса</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Добавить адрес
        </button>
      </div>

      {/* Передаем данные из контекста в ваш компонент */}
      <Addres addresses={addresses} />
      
      {addresses.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-xl">
          <p className="text-gray-500">У вас пока нет сохраненных адресов</p>
        </div>
      )}
    </div>
  );
}