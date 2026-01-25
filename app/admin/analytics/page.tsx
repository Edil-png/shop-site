"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight,
  Calendar,
  Download,
  Filter
} from "lucide-react";

// Типизация для карточек KPI
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Аналитика</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Обзор производительности вашего магазина в реальном времени
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
            {["24h", "7d", "30d", "12m"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  timeRange === range 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Общая выручка" 
          value="1,280,400 ₽" 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
        />
        <StatCard 
          title="Заказы" 
          value="456" 
          change="+8.2%" 
          trend="up" 
          icon={ShoppingBag} 
        />
        <StatCard 
          title="Новые клиенты" 
          value="+124" 
          change="-2.4%" 
          trend="down" 
          icon={Users} 
        />
        <StatCard 
          title="Конверсия" 
          value="3.42%" 
          change="+1.1%" 
          trend="up" 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Главный график (заглушка визуализации) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Динамика продаж</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-gray-500">Текущий период</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-gray-200"></span>
                <span className="text-gray-500">Прошлый</span>
              </div>
            </div>
          </div>
          
          {/* Визуальная имитация графика */}
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60, 85, 45].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-gray-100 dark:bg-gray-700/50 rounded-t-lg relative overflow-hidden h-full min-h-[10px]">
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-400" 
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">М{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Топ категорий */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Популярные категории</h3>
          <div className="space-y-5">
            {[
              { name: "Электроника", value: 45, color: "bg-blue-500" },
              { name: "Одежда", value: 30, color: "bg-purple-500" },
              { name: "Аксессуары", value: 15, color: "bg-amber-500" },
              { name: "Прочее", value: 10, color: "bg-emerald-500" },
            ].map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{cat.name}</span>
                  <span className="text-gray-500">{cat.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: `${cat.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-semibold text-blue-600 border border-blue-100 dark:border-blue-900/30 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            Полный отчет
          </button>
        </div>
      </div>

      {/* Таблица последних транзакций */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg">Последние операции</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">Смотреть все</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 dark:bg-gray-900/20 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">ID Заказа</th>
                <th className="px-6 py-4">Клиент</th>
                <th className="px-6 py-4">Сумма</th>
                <th className="px-6 py-4">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {[
                { id: "#8842", user: "Артем М.", amount: "12,400 ₽", status: "Выполнено" },
                { id: "#8841", user: "Анна К.", amount: "3,100 ₽", status: "В обработке" },
                { id: "#8840", user: "Игорь С.", amount: "45,000 ₽", status: "Выполнено" },
              ].map((order) => (
                <tr key={order.id} className="text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 font-semibold">{order.user}</td>
                  <td className="px-6 py-4 font-bold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      order.status === "Выполнено" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
          <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${
          trend === "up" ? "text-emerald-500" : "text-rose-500"
        }`}>
          {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h2 className="text-2xl font-bold mt-1 tracking-tight">{value}</h2>
      </div>
    </div>
  );
}