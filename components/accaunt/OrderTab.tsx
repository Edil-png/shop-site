"use client";

import { Package, ChevronRight, RefreshCcw } from "lucide-react";
import { Order } from "@/type/product";
import Link from "next/link";

interface OrderTabProps {
  orders: Order[];
}

export function OrderTab({ orders }: OrderTabProps) {
  // Вспомогательная функция для стилизации статусов
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    const labels: Record<string, string> = {
      delivered: "Доставлен",
      processing: "В обработке",
      shipped: "Отправлен",
      cancelled: "Отменен",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.processing}`}>
        {labels[status] || "Загрузка"}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">История заказов</h2>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Заказов пока нет</h3>
          <p className="text-gray-500 mb-8">Сделайте свой первый заказ в нашем магазине!</p>
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors inline-block"
          >
            Перейти к покупкам
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Заказ #{order.id.slice(-8).toUpperCase()}</h3>
                      <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-gray-900 dark:text-white mb-1">
                      ${order.total.toLocaleString()}
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Состав заказа</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                          <span className="text-gray-400 ml-2">× {item.quantity}</span>
                        </span>
                        <span className="font-semibold">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                    <RefreshCcw className="h-4 w-4" />
                    Повторить
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Подробнее
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}