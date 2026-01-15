'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Menu, Bell, Search, Shield, ChevronLeft, LogOut, Users, 
  ShoppingCart,
  BarChart3,
  FolderTree,
  DollarSign,
  Settings,
  Package
} from 'lucide-react'

// Массив навигации: передаем сами компоненты иконок
export const adminNavItems = [
  { name: 'Дашборд', href: '/admin', icon: BarChart3 },
  { name: 'Товары', href: '/admin/products', icon: Package },
  { name: 'Заказы', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Категории', href: '/admin/categories', icon: FolderTree },
  { name: 'Пользователи', href: '/admin/users', icon: Users },
  { name: 'Аналитика', href: '/admin/analytics', icon: DollarSign },
  { name: 'Настройки', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 1. Проверка авторизации
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    const isLoginPage = pathname === '/admin/login'

    if (!token && !isLoginPage) {
      router.replace('/admin/login')
      return
    }

    // 2. Адаптивность
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) setSidebarOpen(false)
    }

    handleResize()
    setIsLoading(false)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (isLoading) return <AdminSkeleton />

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] dark:bg-[#111827]">
      {/* Sidebar Overlay для мобилок */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
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
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              
              // ПРАВКА ТУТ: Сохраняем иконку в переменную с Большой буквы
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-blue-600'}
                  `}
                >
                  {/* ПРАВКА ТУТ: Рендерим как компонент <Icon /> */}
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
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

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 px-8 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            {sidebarOpen ? <ChevronLeft /> : <Menu />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Поиск..." 
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        <main className="p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

function AdminSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-400 font-medium animate-pulse">Загрузка панели...</p>
      </div>
    </div>
  )
}