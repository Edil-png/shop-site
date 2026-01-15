"use client";

import { useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

// Импорт хука контекста
import { useProducts } from "@/context/ProductsContext";

// Импорты компонентов вкладок
import { ProfileTab } from "@/components/accaunt/ProfileTab";
import { OrderTab } from "@/components/accaunt/OrderTab";
import { ChosenTab } from "@/components/accaunt/ChosenTab";
import { Addres } from "@/components/accaunt/Addres";
import { PayTab } from "@/components/accaunt/PayTab";
import { Push } from "@/components/accaunt/Push";
import { Setting } from "@/components/accaunt/Setting";
import { Security } from "@/components/accaunt/Security";

// Определение вкладок
const tabs = [
  { id: "profile", label: "Профиль", icon: <User className="h-5 w-5" /> },
  { id: "orders", label: "Заказы", icon: <Package className="h-5 w-5" /> },
  { id: "wishlist", label: "Избранное", icon: <Heart className="h-5 w-5" /> },
  { id: "addresses", label: "Адреса", icon: <MapPin className="h-5 w-5" /> },
  { id: "payment", label: "Оплата", icon: <CreditCard className="h-5 w-5" /> },
  {
    id: "notifications",
    label: "Уведомления",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    id: "settings",
    label: "Настройки",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    id: "security",
    label: "Безопасность",
    icon: <Shield className="h-5 w-5" />,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Достаем данные из контекста
  const { orders, wishlist, addresses, paymentMethods, loading } =
    useProducts();

  // Функция для отрисовки контента с передачей реальных данных
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrderTab orders={orders} />;
      case "wishlist":
        return <ChosenTab items={wishlist} />;
      case "addresses":
        return <Addres addresses={addresses} />;
      case "payment":
        return <PayTab methods={paymentMethods} />;
      case "notifications":
        return <Push />;
      case "settings":
        return <Setting />;
      case "security":
        return <Security />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Сайдбар */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 p-4 space-y-2 sticky top-24 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-8">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Выйти</span>
              </button>
            </div>
          </div>

          {/* Контент */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm min-h-[500px]">
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
