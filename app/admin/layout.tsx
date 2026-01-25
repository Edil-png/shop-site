"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  Shield,
  ChevronLeft,
  LogOut,
  Users,
  ShoppingCart,
  BarChart3,
  FolderTree,
  DollarSign,
  Settings,
  Package,
} from "lucide-react";
import { Sidebar } from "@/components/admin/components/SideBarAdmin";
import { AdminProvider } from "@/context/adminContext";

// Массив навигации: передаем сами компоненты иконок
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Проверка авторизации
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("admin_token")
        : null;
    const isLoginPage = pathname === "/admin/login";

    if (!token && !isLoginPage) {
      router.replace("/admin/login");
      return;
    }

    // 2. Адаптивность
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };

    handleResize();
    setIsLoading(false);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;
  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      <AdminProvider>
        {/* Sidebar Overlay для мобилок */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

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
          <main className="p-8 max-w-[1600px] mx-auto w-full">{children}</main>
        </div>
      </AdminProvider>
    </div>
  );
}

function AdminSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-400 font-medium animate-pulse">
          Загрузка панели...
        </p>
      </div>
    </div>
  );
}
