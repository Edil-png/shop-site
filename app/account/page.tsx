'use client'

import { useState } from 'react'
import { 
  User, Package, Heart, Settings, 
  LogOut, MapPin, CreditCard, Bell,
  Edit, Check, X, Camera, Shield, History
} from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'Профиль', icon: <User className="h-5 w-5" /> },
  { id: 'orders', label: 'Заказы', icon: <Package className="h-5 w-5" /> },
  { id: 'wishlist', label: 'Избранное', icon: <Heart className="h-5 w-5" /> },
  { id: 'addresses', label: 'Адреса', icon: <MapPin className="h-5 w-5" /> },
  { id: 'payment', label: 'Оплата', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'notifications', label: 'Уведомления', icon: <Bell className="h-5 w-5" /> },
  { id: 'settings', label: 'Настройки', icon: <Settings className="h-5 w-5" /> },
  { id: 'security', label: 'Безопасность', icon: <Shield className="h-5 w-5" /> },
]

const orders = [
  {
    id: 'ORD-12345',
    date: '15.12.2023',
    total: 85498,
    status: 'delivered',
    items: [
      { name: 'Смартфон Samsung Galaxy S23', quantity: 1, price: 79999 },
      { name: 'Чехол для смартфона', quantity: 1, price: 1499 },
      { name: 'Защитное стекло', quantity: 2, price: 1000 }
    ]
  },
  {
    id: 'ORD-12344',
    date: '10.12.2023',
    total: 12999,
    status: 'processing',
    items: [
      { name: 'Беспроводные наушники', quantity: 1, price: 12999 }
    ]
  },
  {
    id: 'ORD-12343',
    date: '05.12.2023',
    total: 3499,
    status: 'cancelled',
    items: [
      { name: 'Футболка хлопковая', quantity: 1, price: 3499 }
    ]
  }
]

const wishlistItems = [
  { id: '1', name: 'Умные часы Apple Watch', price: 39999, category: 'electronics' },
  { id: '2', name: 'Кроссовки спортивные', price: 7999, category: 'clothing' },
  { id: '3', name: 'Кофемашина Delonghi', price: 29999, category: 'home' },
  { id: '4', name: 'Набор косметики L\'Oreal', price: 4999, category: 'beauty' }
]

const addresses = [
  { id: '1', name: 'Дом', address: 'ул. Ленина, 123, кв. 45', city: 'Москва', phone: '+7 (999) 123-45-67', isDefault: true },
  { id: '2', name: 'Работа', address: 'ул. Пушкина, 456, офис 12', city: 'Москва', phone: '+7 (999) 765-43-21', isDefault: false },
]

const paymentMethods = [
  { id: '1', type: 'card', last4: '4242', expiry: '12/25', name: 'Visa', isDefault: true },
  { id: '2', type: 'card', last4: '8888', expiry: '09/24', name: 'MasterCard', isDefault: false },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    birthDate: '15.05.1990'
  })

  const [tempData, setTempData] = useState({ ...userData })

  const handleEdit = () => {
    setTempData({ ...userData })
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserData({ ...tempData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData({ ...userData })
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }))
  }

  const getStatusBadge = (status: string) => {
    const statuses: Record<string, { text: string; color: string }> = {
      delivered: { text: 'Доставлен', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
      processing: { text: 'В обработке', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      shipped: { text: 'Отправлен', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
      cancelled: { text: 'Отменен', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
    }
    const statusObj = statuses[status] || { text: status, color: 'bg-gray-100 text-gray-800' }
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusObj.color}`}>{statusObj.text}</span>
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Сайдбар навигации */}
          <div className="lg:col-span-1">
            <div className="card p-4 space-y-2 sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
              
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-8">
                <LogOut className="h-5 w-5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            {/* Профиль */}
            {activeTab === 'profile' && (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Профиль</h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Редактировать
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Сохранить
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Отмена
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Аватар */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                        ИИ
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{userData.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">Покупатель с декабря 2023</p>
                    </div>
                  </div>

                  {/* Форма */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          {userData.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          {userData.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={tempData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          {userData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Дата рождения</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="ДД.ММ.ГГГГ"
                        />
                      ) : (
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          {userData.birthDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Заказы */}
            {activeTab === 'orders' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">История заказов</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Заказов пока нет</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Сделайте свой первый заказ!
                    </p>
                    <a href="/" className="btn-primary">
                      Перейти к покупкам
                    </a>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="font-bold text-lg">Заказ #{order.id}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-2">${order.total}</div>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                          <h4 className="font-medium mb-3">Товары:</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name} × {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-4">
                          <button className="btn-secondary text-sm">
                            Повторить заказ
                          </button>
                          <button className="btn-primary text-sm">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Избранное */}
            {activeTab === 'wishlist' && (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Избранное</h2>
                  <span className="text-gray-600 dark:text-gray-400">
                    {wishlistItems.length} товаров
                  </span>
                </div>
                
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Список избранного пуст</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Добавляйте товары, чтобы не потерять их
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center gap-4">
                        <div className="text-4xl">
                          {item.category === 'electronics' && '📱'}
                          {item.category === 'clothing' && '👕'}
                          {item.category === 'home' && '🏠'}
                          {item.category === 'beauty' && '💄'}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.category}</p>
                          <div className="text-xl font-bold">${item.price}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="btn-primary text-sm">
                            В корзину
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-sm">
                            Удалить
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Адреса */}
            {activeTab === 'addresses' && (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Адреса доставки</h2>
                  <button className="btn-primary">
                    + Добавить адрес
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className={`border rounded-lg p-6 ${
                      address.isDefault 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-800'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{address.name}</h3>
                          {address.isDefault && (
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 text-xs rounded mt-1">
                              Основной
                            </span>
                          )}
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Edit className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{address.address}, {address.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{userData.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          <span>{address.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-6">
                        {!address.isDefault && (
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            Сделать основным
                          </button>
                        )}
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Оплата */}
            {activeTab === 'payment' && (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Способы оплаты</h2>
                  <button className="btn-primary">
                    + Добавить карту
                  </button>
                </div>
                
                <div className="space-y-6">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-bold">
                              {method.name} **** {method.last4}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              Срок действия: {method.expiry}
                            </p>
                            {method.isDefault && (
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 text-xs rounded mt-1">
                                Основной
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          {!method.isDefault && (
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              Сделать основной
                            </button>
                          )}
                          <button className="text-red-600 hover:text-red-800">
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Уведомления */}
            {activeTab === 'notifications' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">Настройка уведомлений</h2>
                
                <div className="space-y-6">
                  {[
                    { title: 'Новости и акции', description: 'Получать информацию о новых товарах и специальных предложениях' },
                    { title: 'Статус заказов', description: 'Уведомления об изменении статуса ваших заказов' },
                    { title: 'Персональные рекомендации', description: 'Подборки товаров на основе ваших интересов' },
                    { title: 'Отзывы и оценки', description: 'Напоминания оставить отзыв о купленных товарах' },
                    { title: 'Баланс и бонусы', description: 'Информация о начисленных бонусах и скидках' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Настройки */}
            {activeTab === 'settings' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">Настройки аккаунта</h2>
                
                <div className="space-y-8">
                  {/* Язык */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Язык интерфейса</h3>
                    <div className="flex gap-4">
                      {['Русский', 'English', '中文'].map((lang) => (
                        <button
                          key={lang}
                          className={`px-6 py-3 rounded-lg border ${
                            lang === 'Русский'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Валюта */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Валюта</h3>
                    <div className="flex gap-4">
                      {['RUB ₽', 'USD $', 'EUR €'].map((currency) => (
                        <button
                          key={currency}
                          className={`px-6 py-3 rounded-lg border ${
                            currency === 'RUB ₽'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Тема */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Тема оформления</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🌞</div>
                          <div>Светлая</div>
                        </div>
                      </button>
                      <button className="p-4 border border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🌙</div>
                          <div className="text-blue-600 dark:text-blue-400">Темная</div>
                        </div>
                      </button>
                      <button className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="text-center">
                          <div className="text-2xl mb-2">⚙️</div>
                          <div>Системная</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Безопасность */}
            {activeTab === 'security' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">Безопасность</h2>
                
                <div className="space-y-6">
                  {/* Смена пароля */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Смена пароля</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Текущий пароль</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Новый пароль</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Подтвердите новый пароль</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                          placeholder="••••••••"
                        />
                      </div>
                      <button className="btn-primary">
                        Изменить пароль
                      </button>
                    </div>
                  </div>

                  {/* Двухфакторная аутентификация */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium mb-1">Двухфакторная аутентификация</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Добавьте дополнительный уровень безопасности
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Активные сессии */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Активные сессии</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Chrome, Windows 11</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Москва, Россия • Сейчас</div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 text-sm rounded-full">
                          Текущая
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Safari, iPhone</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">2 часа назад</div>
                        </div>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Завершить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}