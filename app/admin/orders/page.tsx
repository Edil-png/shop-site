"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Clock,
  Truck,
  CheckCircle,
  X,
  Download,
  Printer,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { orders, users } = useProducts();
  const router = useRouter();

  /** 🔥 usersMap для быстрого доступа */
  const usersMap = useMemo(() => {
    return Object.fromEntries(users.map((u) => [u.id, u]));
  }, [users]);

  /** 🔍 Фильтрация заказов */
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const user = usersMap[order.userId];

      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [orders, usersMap, searchQuery]);

  const PushRouter = (id: any) => {
    router.push(`orders/${id}`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Шапка */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Заказы</h1>
          <p className="text-sm text-gray-500">
            Найдено {filteredOrders.length} заказов
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn">
            <Printer className="h-4 w-4" />
            Печать
          </button>
          <button className="btn-primary">
            <Download className="h-4 w-4" />
            Экспорт CSV
          </button>
        </div>
      </div>

      {/* Поиск */}
      <div className="bg-white p-4 rounded-xl flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по заказу или клиенту"
            className="w-full pl-9 py-2 rounded-lg bg-gray-100 outline-none"
          />
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Таблица */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Дата</th>
              <th className="p-3 text-left">Клиент</th>
              <th className="p-3 text-left">Доставка</th>
              <th className="p-3 text-left">Оплата</th>
              <th className="p-3 text-left">Статус</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const user = usersMap[order.userId];

              return (
                <tr
                  onClick={() => PushRouter(order.id)}
                  key={order.id}
                  className={`border-t hover:bg-gray-200 hover:cursor-pointer `}
                >
                  <td className="p-3 flex items-center gap-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    {order.date}
                  </td>

                  <td className="p-3">
                    <div className="font-semibold">
                      {user?.name ?? "Неизвестный пользователь"}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {user?.addresses?.[0]
                        ? `${user.addresses[0].city}, ${user.addresses[0].address}`
                        : "Адрес не указан"}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      {order.pay === "card" ? "картой" : "наличными"}
                    </div>
                  </td>

                  <td className="p-3">{getStatusBadge(order.status)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** 🎯 Бейдж статуса */
const getStatusBadge = (status: string) => {
  const map = {
    processing: {
      label: "Обработка",
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    shipped: {
      label: "В пути",
      color: "bg-blue-100 text-blue-700",
      icon: Truck,
    },
    delivered: {
      label: "Доставлен",
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    cancelled: {
      label: "Отменён",
      color: "bg-red-100 text-red-700",
      icon: X,
    },
  };

  const config = map[status as keyof typeof map] ?? map.processing;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${config.color}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};
