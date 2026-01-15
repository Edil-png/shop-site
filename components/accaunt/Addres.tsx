"use client";

import { Edit, MapPin, User, Phone, Trash2 } from "lucide-react";
import { Addres as AddresType } from "@/type/product";

interface AddresProps {
  addresses: AddresType[];
}

export function Addres({ addresses }: AddresProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Адреса доставки</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Добавить адрес
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-xl p-6 transition-all ${
              address.isDefault
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{address.name}</h3>
                {address.isDefault && (
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 text-xs rounded mt-1">
                    Основной
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-red-600 transition-colors p-1">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {address.address}, {address.city}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{address.phone}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              {!address.isDefault && (
                <button className="text-xs font-medium text-blue-600 hover:underline">
                  Сделать основным
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <MapPin className="h-10 w-10 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Список адресов пуст</p>
        </div>
      )}
    </div>
  );
}