"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  ShoppingCart,
  BarChart3,
  FolderTree,
  DollarSign,
  Settings,
  Package,
  Menu, // Добавили иконку меню
} from "lucide-react";
import { Sidebar } from "@/components/admin/components/SideBarAdmin";

export const adminNavItems = [
  { name: "Дашборд", href: "/admin", icon: BarChart3 },
  { name: "Товары", href: "/admin/products", icon: Package },
  { name: "Заказы", href: "/admin/orders", icon: ShoppingCart },
  { name: "Категории", href: "/admin/categories", icon: FolderTree },
  { name: "Пользователи", href: "/admin/users", icon: Users },
  { name: "Аналитика", href: "/admin/analytics", icon: DollarSign },
  { name: "Настройки", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // По умолчанию закрыт на мобилках
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Логика определения мобильного экрана
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024; // 1024px - порог lg в Tailwind
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true); // Всегда открыт на десктопе
      else setSidebarOpen(false); // Закрыт при переходе на мобилку
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] dark:bg-[#030712]">
      {/* Sidebar компонент */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        adminNavItems={adminNavItems}
        handleLogout={handleLogout}
        pathname={pathname}
        isMobile={isMobile}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Мобильный Header */}
        <header className="flex lg:hidden items-center justify-between px-4 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-600 dark:text-gray-300"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-bold text-lg dark:text-white">Admin</span>
          </div>
          {/* Тут можно добавить аватарку или поиск */}
        </header>

        <main className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}