'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  BarChart3, Package, ShoppingCart, Users, 
  Settings, LogOut, Menu, X, Bell, Search,
  Home, FolderTree, DollarSign, Shield
} from 'lucide-react'

const adminNavItems = [
  { name: 'Дашборд', href: '/admin', icon: <BarChart3 className="h-5 w-5" /> },
  { name: 'Товары', href: '/admin/products', icon: <Package className="h-5 w-5" /> },
  { name: 'Заказы', href: '/admin/orders', icon: <ShoppingCart className="h-5 w-5" /> },
  { name: 'Категории', href: '/admin/categories', icon: <FolderTree className="h-5 w-5" /> },
  { name: 'Пользователи', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { name: 'Аналитика', href: '/admin/analytics', icon: <DollarSign className="h-5 w-5" /> },
  { name: 'Настройки', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Проверка авторизации
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token')
      setIsAuthenticated(!!token)
      
      if (!token && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }

    checkAuth()

    // Проверка размера экрана
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Сайдбар */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Логотип */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <span className="font-bold text-lg">Admin</span>
              <span className="font-bold text-lg text-blue-600">Panel</span>
            </div>
          </Link>
        </div>

        {/* Навигация */}
        <nav className="p-4 space-y-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Выход */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* Основной контент */}
      <div className={`
        min-h-screen transition-all duration-300
        ${sidebarOpen ? 'lg:ml-64' : ''}
      `}>
        {/* Шапка */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="h-16 px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="text-sm font-semibold">Администратор</div>
                  <div className="text-xs text-gray-500">admin@simpleshop.ru</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Контент */}
        <main className="p-6">
          {children}
        </main>

        {/* Подвал */}
        <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <div>© 2024 SimpleShop Admin Panel</div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:text-blue-600">
                <Home className="h-4 w-4" />
                <span>На сайт</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Overlay для мобильных */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}