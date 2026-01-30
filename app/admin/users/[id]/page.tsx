"use client";

import { useParams, useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Package, 
  CreditCard,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { users, orders, loading } = useProducts();

  // Находим пользователя и его заказы
  const user = users.find((u) => u.id === id);
  const userOrders = orders.filter((o) => o.userId === id);

  if (loading) return <div className="p-10 text-center">Загрузка...</div>;
  if (!user) return <div className="p-10 text-center">Пользователь не найден</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Кнопка назад */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Назад к списку
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Левая колонка: Профиль */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <UserIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <span className="text-sm text-gray-500 capitalize">{user.role || 'Client'}</span>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{user.phone || "Не указан"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-bold uppercase">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Адреса
            </h3>
            <div className="text-sm text-gray-500 space-y-2">
              {/* Если у пользователя есть массив адресов */}
              {user.addresses?.length ? (
                user.addresses.map((addr, i) => <p key={i} className="border-b pb-2 last:border-0">{addr.street}, {addr.city}</p>)
              ) : (
                <p>Адреса не добавлены</p>
              )}
            </div>
          </div>
        </div>

        {/* Правая колонка: Активность и заказы */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Статистика */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 uppercase font-bold">Заказов</p>
              <p className="text-2xl font-bold mt-1">{userOrders.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 uppercase font-bold">Потрачено</p>
              <p className="text-2xl font-bold mt-1 text-blue-600">
                {userOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()} ₽
              </p>
            </div>
            <div className="hidden sm:block bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 uppercase font-bold">Регистрация</p>
              <p className="text-sm font-bold mt-2">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Таблица заказов */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" /> История заказов
              </h3>
            </div>
            
            {userOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Дата</th>
                      <th className="px-6 py-4">Статус</th>
                      <th className="px-6 py-4 text-right">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {userOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">#{order.id.slice(-6)}</td>
                        <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-bold">{order.total.toLocaleString()} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center text-gray-400">
                Этот пользователь еще ничего не заказывал
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}