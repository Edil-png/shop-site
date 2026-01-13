'use client'

import { useState } from 'react'
import { 
  Phone, Mail, MapPin, Clock, 
  MessageSquare, Send, CheckCircle
} from 'lucide-react'

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь должна быть логика отправки формы
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const contacts = [
    {
      title: 'Телефон',
      description: 'Единая справочная служба',
      value: '8 (800) 123-45-67',
      icon: <Phone className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    },
    {
      title: 'Email',
      description: 'Для общих вопросов',
      value: 'info@simpleshop.ru',
      icon: <Mail className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    },
    {
      title: 'Адрес',
      description: 'Главный офис',
      value: 'Москва, ул. Примерная, 1',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    },
    {
      title: 'Режим работы',
      description: 'Служба поддержки',
      value: 'Пн-Вс: 9:00-21:00',
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    }
  ]

  const departments = [
    {
      name: 'Отдел продаж',
      phone: '8 (800) 123-45-68',
      email: 'sales@simpleshop.ru',
      hours: 'Пн-Пт: 9:00-20:00'
    },
    {
      name: 'Служба доставки',
      phone: '8 (800) 123-45-69',
      email: 'delivery@simpleshop.ru',
      hours: 'Пн-Вс: 8:00-22:00'
    },
    {
      name: 'Техническая поддержка',
      phone: '8 (800) 123-45-70',
      email: 'support@simpleshop.ru',
      hours: 'Круглосуточно'
    },
    {
      name: 'Отдел рекламаций',
      phone: '8 (800) 123-45-71',
      email: 'returns@simpleshop.ru',
      hours: 'Пн-Пт: 10:00-19:00'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero секция */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <MessageSquare className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Контакты
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
          </p>
        </div>

        {/* Основные контакты */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Как с нами связаться</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contacts.map((contact, index) => (
              <div key={index} className="card p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl ${contact.color} mb-4`}>
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{contact.description}</p>
                <div className="font-semibold text-lg">{contact.value}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Форма обратной связи */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Напишите нам</h2>
            
            <div className="card p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900 rounded-full mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Сообщение отправлено!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Иван Иванов"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="example@mail.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Сообщение *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Опишите ваш вопрос или проблему..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary py-3 text-lg flex items-center justify-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Отправить сообщение
                    </button>
                  </form>

                  <div className="mt-6 text-sm text-gray-500">
                    <p>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Отделы и карта */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Наши отделы</h2>
            
            <div className="card p-6 mb-8">
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div key={index} className="pb-6 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
                    <h3 className="text-xl font-bold mb-3">{dept.name}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Телефон</div>
                        <a href={`tel:${dept.phone}`} className="font-medium hover:text-blue-600">
                          {dept.phone}
                        </a>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Email</div>
                        <a href={`mailto:${dept.email}`} className="font-medium hover:text-blue-600">
                          {dept.email}
                        </a>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Часы работы</div>
                        <div className="font-medium">{dept.hours}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карта (заглушка) */}
            <div className="card overflow-hidden">
              <div className="bg-gray-200 dark:bg-gray-800 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Карта расположения офиса
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Как добраться</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Московский офис находится в центре города, рядом со станцией метро "Примерная".
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>Москва, ул. Примерная, 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>Пн-Пт: 9:00-18:00 (прием посетителей)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ для контактов */}
        <section className="mt-16">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Полезная информация</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Для покупателей</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Ответим на все вопросы по товарам и заказам</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Поможем с выбором и подбором товаров</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Консультации по гарантии и возврату</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Для партнеров</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Сотрудничество и оптовые закупки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Размещение товаров на маркетплейсе</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt:0.5 flex-shrink-0" />
                    <span>Рекламные возможности</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}