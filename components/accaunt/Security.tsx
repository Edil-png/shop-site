"use client";

import { Shield, Lock, Smartphone, Monitor, LogOut } from "lucide-react";

export function Security() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <Shield className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold">Безопасность</h2>
      </div>

      <div className="grid gap-6">
        {/* Смена пароля */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-bold">Смена пароля</h3>
          </div>
          
          <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Текущий пароль</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Новый пароль</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Минимум 8 символов"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Подтвердите новый пароль</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20">
              Обновить пароль
            </button>
          </form>
        </section>

        {/* Двухфакторная аутентификация */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg h-fit">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Двухфакторная аутентификация (2FA)</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md">
                  При входе мы будем запрашивать код подтверждения, чтобы убедиться, что это именно вы.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[22px] after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </section>

        {/* Активные сессии */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Активные сессии</h3>
          <div className="space-y-6">
            {/* Текущая сессия */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <Monitor className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2">
                    Chrome, Windows 11
                    <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300 rounded-full uppercase tracking-wider">
                      Текущая
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Москва, Россия • IP: 192.168.1.1</div>
                </div>
              </div>
            </div>

            {/* Другая сессия */}
            <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <Smartphone className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <div className="font-bold">Safari, iPhone 15 Pro</div>
                  <div className="text-xs text-gray-500">Санкт-Петербург, Россия • 2 часа назад</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Завершить</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}