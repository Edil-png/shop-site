"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Globe,
  Store,
  CreditCard,
  Save,
  Moon,
  Sun,
  ShieldCheck,
  Mail,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const tabs = [
    { id: "general", label: "Общие", icon: Store },
    { id: "profile", label: "Профиль", icon: User },
    { id: "security", label: "Безопасность", icon: Lock },
    { id: "notifications", label: "Уведомления", icon: Bell },
    { id: "billing", label: "Оплата", icon: CreditCard },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
        <p className="text-gray-500 mt-1">Управляйте параметрами вашего магазина и учетной записи</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:w-64 flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-500 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === "general" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              {/* Shop Info */}
              <section className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" /> Основные настройки
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Название магазина</label>
                    <input 
                      type="text" 
                      defaultValue="My Tech Store" 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Публичный Email</label>
                    <input 
                      type="email" 
                      defaultValue="support@techstore.ru" 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Валюта</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500">
                      <option>RUB (₽)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Язык интерфейса</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500">
                      <option>Русский</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Preferences */}
              <section className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Предпочтения темы</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      {darkMode ? <Moon className="h-5 w-5 text-indigo-500" /> : <Sun className="h-5 w-5 text-amber-500" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Темный режим</p>
                      <p className="text-xs text-gray-500">Переключить визуальную тему панели</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <section className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" /> Безопасность
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Двухфакторная аутентификация</p>
                      <p className="text-sm text-gray-500">Дополнительный уровень защиты вашего аккаунта</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold border border-emerald-100">Включить</button>
                  </div>
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Сменить пароль администратора</button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6">
            <button className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Сбросить</button>
            <button className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
              <Save className="h-4 w-4" />
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}