"use client";

import { useState } from "react";
import { Bell, ShieldCheck } from "lucide-react";

export function Push() {
  // Имитация состояния настроек (в будущем можно забирать из Firebase)
  const [settings, setSettings] = useState({
    news: true,
    orders: true,
    promo: false,
    reviews: true,
    bonus: true,
  });

  const notificationItems = [
    {
      id: "news",
      title: "Новости и акции",
      description: "Получать информацию о новых товарах и специальных предложениях",
    },
    {
      id: "orders",
      title: "Статус заказов",
      description: "Уведомления об изменении статуса ваших заказов",
    },
    {
      id: "promo",
      title: "Персональные рекомендации",
      description: "Подборки товаров на основе ваших интересов",
    },
    {
      id: "reviews",
      title: "Отзывы и оценки",
      description: "Напоминания оставить отзыв о купленных товарах",
    },
    {
      id: "bonus",
      title: "Баланс и бонусы",
      description: "Информация о начисленных бонусах и скидках",
    },
  ];

  const handleToggle = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Bell className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Настройка уведомлений</h2>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
        {notificationItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="max-w-[80%]">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings[item.id as keyof typeof settings]}
                onChange={() => handleToggle(item.id)}
              />
              <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 transition-all shadow-inner"></div>
            </label>
          </div>
        ))}
      </div>

      {/* Информационный блок */}
      <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
        <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Мы заботимся о вашем комфорте. Вы в любой момент можете отключить все уведомления, и мы будем присылать только критически важную информацию о безопасности вашего аккаунта.
        </p>
      </div>
    </div>
  );
}