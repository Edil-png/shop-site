"use client";

import { LucideIcon, LogOut, Shield, X } from "lucide-react";
import Link from "next/link";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number | string;
  children?: NavItem[];
  permission?: string;
}

export function Sidebar({
  sidebarOpen,
  adminNavItems,
  handleLogout,
  pathname,
  isMobile,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  adminNavItems: NavItem[];
  handleLogout: () => void;
  pathname: string;
  isMobile: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <>
      {/* 1. Overlay - затемнение заднего фона на мобилках */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header с кнопкой закрытия для мобилок */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200 dark:shadow-none">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight dark:text-white">
                Simple<span className="text-blue-600">Admin</span>
              </span>
            </Link>

            {/* Кнопка "Закрыть" - видна только на мобилках при открытом меню */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 lg:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4 pt-2">
              Управление
            </p>
            {adminNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  // Закрываем сайдбар после клика на пункт меню
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.97]
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600"
                    }
                  `}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"
                    }`}
                  />
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <span className={`
                      ml-auto text-xs font-bold px-2 py-0.5 rounded-full
                      ${isActive ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer с кнопкой выхода */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors active:bg-red-100"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Выйти из аккаунта</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}