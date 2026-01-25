import { LucideIcon, LogOut, Shield } from "lucide-react";
import Link from "next/link"; // Или другой роутер

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
  setSidebarOpen: (open: boolean) => void; // Исправленный тип
}) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="h-20 flex items-center px-8 border-b border-gray-100 dark:border-gray-700">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight dark:text-white">
              Simple<span className="text-blue-600">Admin</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">
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
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-blue-600"
                  }
                `}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`}
                />
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Выход
          </button>
        </div>
      </div>
    </aside>
  );
}