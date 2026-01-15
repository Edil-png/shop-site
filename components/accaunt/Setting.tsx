"use client";

import { useState } from "react";
import { Globe, Banknote, Palette, Check } from "lucide-react";

export function Setting() {
  const [lang, setLang] = useState("Русский");
  const [currency, setCurrency] = useState("RUB ₽");
  const [theme, setTheme] = useState("dark");

  const languages = ["Русский", "English", "中文"];
  const currencies = ["RUB ₽", "USD $", "EUR €"];
  const themes = [
    { id: "light", name: "Светлая", icon: "🌞" },
    { id: "dark", name: "Темная", icon: "🌙" },
    { id: "system", name: "Системная", icon: "⚙️" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Настройки аккаунта</h2>

      <div className="space-y-10">
        {/* Выбор Языка */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
            <Globe className="h-5 w-5" />
            <h3 className="text-lg font-medium">Язык интерфейса</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={`px-6 py-3 rounded-xl border-2 transition-all font-medium ${
                  lang === item
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Выбор Валюты */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
            <Banknote className="h-5 w-5" />
            <h3 className="text-lg font-medium">Валюта</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {currencies.map((item) => (
              <button
                key={item}
                onClick={() => setCurrency(item)}
                className={`px-6 py-3 rounded-xl border-2 transition-all font-medium ${
                  currency === item
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Выбор Темы */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
            <Palette className="h-5 w-5" />
            <h3 className="text-lg font-medium">Тема оформления</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${
                  theme === t.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                    : "border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{t.icon}</span>
                  <span className={`font-medium ${theme === t.id ? "text-blue-600 dark:text-blue-400" : ""}`}>
                    {t.name}
                  </span>
                </div>
                {theme === t.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-blue-500" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-500">
          Версия приложения: 2.4.0-stable
        </p>
      </div>
    </div>
  );
}