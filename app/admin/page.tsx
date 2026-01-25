"use client";

import { useState, useEffect, useMemo } from "react";
import {
  TrendingUp, Users, ShoppingCart, Package,
  DollarSign, CreditCard, BarChart3, Activity,
  Calendar, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { useAdmin } from "@/context/adminContext";
import { Loading } from "@/components/Loading";

// ... recentOrders и topProducts оставляем без изменений ...

export default function AdminDashboardPage() {
  const { stats, isLoading } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Формируем массив карточек только когда stats загружены
  const statCards = useMemo(() => {
    if (!stats) return [];
    
    return [
      {
        title: "Выручка",
        value: `${stats.totalRevenue?.toLocaleString()} ₽`,
        change: "+12.5%",
        trend: "up",
        color: "from-blue-600 to-cyan-500",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "Пользователи",
        value: stats.totalUsers?.toString(),
        change: "+3.2%",
        trend: "up",
        color: "from-purple-600 to-indigo-500",
        icon: <Users className="h-6 w-6" />,
      },
      {
        title: "Заказы",
        value: stats.totalOrders?.toString(),
        change: "-1.4%",
        trend: "down",
        color: "from-orange-600 to-amber-500",
        icon: <ShoppingCart className="h-6 w-6" />,
      },
      {
        title: "В наличии",
        value: stats.productsInStock?.toString(),
        change: "+5",
        trend: "up",
        color: "from-emerald-600 to-teal-500",
        icon: <Package className="h-6 w-6" />,
      },
    ];
  }, [stats]);

  // 1. Сначала проверяем монтаж (гидратация)
  if (!mounted) return null;

  // 2. Затем проверяем загрузку
  if (isLoading) {
    return <Loading />; // Обязательно return!
  }

  // 3. Если загрузка завершена, но данных нет
  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Данные статистики недоступны</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Обзор статистики и активности магазина
        </p>
      </div>

      {/* Статистика - теперь используем statCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div
                className={`flex items-center gap-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ... Остальной код (График, Заказы, Топ товары) остается без изменений ... */}
    </div>
  );
}