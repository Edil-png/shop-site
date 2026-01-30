"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Для редиректа
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

import { useProducts } from "@/context/ProductsContext";
import { useAuth } from "@/context/authContext";
import { useFavorite } from "@/context/FavoriteContext"; // Импорт избранного

// Компоненты вкладок
import { ProfileTab } from "@/components/accaunt/ProfileTab";
import { OrderTab } from "@/components/accaunt/OrderTab";
import { Addres } from "@/components/accaunt/Addres";
import { PayTab } from "@/components/accaunt/PayTab";
import { Push } from "@/components/accaunt/Push";
import { Setting } from "@/components/accaunt/Setting";
import { Security } from "@/components/accaunt/Security";

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
  const router = useRouter();

  const { orders, addresses, loading } = useProducts();
  const { logout, user, isLoading: authLoading } = useAuth();
  const { favorites } = useFavorite();

  // Редирект, если пользователь не залогинен
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Загрузка...
      </div>
    );
  if (!user) return null;

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
        // Теперь вкладка не проваливается в "addresses"
        return <div>Компонент избранного (Товаров: {favorites.length})</div>;
      case "addresses":
        return <Addres addresses={addresses} />;
      case "payment":
        return <PayTab />;
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
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Сайдбар */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 p-4 space-y-2 sticky top-24 rounded-xl">
              <div className="px-4 py-3 mb-4 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">
                  Управление
                </p>
              </div>

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-8"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Выйти</span>
              </button>
            </div>
          </div>

          {/* Контент */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm min-h-[500px]">
              {/* key={activeTab} заставляет React пересоздавать анимацию при смене вкладки */}
              <div
                key={activeTab}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
