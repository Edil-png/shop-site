"use client";

import { useState, useEffect } from "react";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Loading } from "@/components/Loading";
import { notFound, usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useStats } from "@/context/statsContext";
import { useProducts } from "@/context/ProductsContext";

const ICON_MAP: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5 md:h-6 md:w-6" />,
  Users: <Users className="h-5 w-5 md:h-6 md:w-6" />,
  ShoppingCart: <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />,
  Package: <Package className="h-5 w-5 md:h-6 md:w-6" />,
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { stats, isLoading: statsLoading } = useStats();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !user?.isAdmin && pathname !== "/admin/login") {
      notFound();
    }
  }, [mounted, user, pathname]);

  if (!mounted || statsLoading) return <Loading />;

  if (!stats || stats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] opacity-50 px-4">
        <Package className="h-12 w-12 mb-4" />
        <p className="text-lg font-medium text-center">
          Данные статистики загружаются <br /> или файл stats.json пуст
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-0 pb-10">
      {/* Header section - centered on mobile */}
      <div className="text-left sm:text-left">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          Дашборд
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1 md:mt-2 font-medium">
          Обзор ключевых показателей
        </p>
      </div>

      {/* Stats Grid - 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = ICON_MAP[stat.icon] || <Package className="h-5 w-5" />;
          const isUp = stat.trend === "up";

          return (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-gray-800 p-5 md:p-6 shadow-sm active:scale-[0.98] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} shadow-md text-white`}
                >
                  {Icon}
                </div>
                
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold ${
                    isUp
                      ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  }`}
                >
                  {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-black tracking-tight dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
                  {stat.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}