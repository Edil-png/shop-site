import { 
  BarChart3, Package, ShoppingCart, Users, 
  Settings, FolderTree, DollarSign 
} from 'lucide-react'

export const adminNavItems = [
  { name: 'Дашборд', href: '/admin', icon: BarChart3 },
  { name: 'Товары', href: '/admin/products', icon: Package },
  { name: 'Заказы', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Категории', href: '/admin/categories', icon: FolderTree },
  { name: 'Пользователи', href: '/admin/users', icon: Users },
  { name: 'Аналитика', href: '/admin/analytics', icon: DollarSign },
  { name: 'Настройки', href: '/admin/settings', icon: Settings },
]