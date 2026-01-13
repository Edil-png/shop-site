'use client'

import { useState } from 'react'
import { 
  Truck, Package, Clock, MapPin, 
  CreditCard, Shield, HelpCircle,
  Check, X, Calculator, Phone, Mail
} from 'lucide-react'

const deliveryMethods = [
  {
    id: 'courier',
    name: 'Курьерская доставка',
    description: 'Доставка курьером до двери',
    icon: <Truck className="h-8 w-8" />,
    time: '1-3 дня',
    price: 'Бесплатно от 3000 ₽',
    features: ['Бесплатно от 3000 ₽', 'Точное время', 'Наличные/карта при получении'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'pickup',
    name: 'Самовывоз',
    description: 'Заберите заказ из пункта выдачи',
    icon: <Package className="h-8 w-8" />,
    time: '1-2 дня',
    price: 'Бесплатно',
    features: ['Бесплатно всегда', '40+ пунктов в Москве', 'Работаем до 22:00'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'express',
    name: 'Экспресс-доставка',
    description: 'Доставка в день заказа',
    icon: <Clock className="h-8 w-8" />,
    time: '2-4 часа',
    price: 'от 500 ₽',
    features: ['Доставка за 2-4 часа', 'В пределах МКАД', 'Работаем 24/7'],
    color: 'from-orange-500 to-red-500'
  },
  // {
  //   id: 'post',
  //   name: 'Почта России',
  //   description: 'Доставка по всей России',
  //   icon: <MapPin className="h-8 w-8" />,
  //   time: '5-14 дней',
  //   price: 'от 250 ₽',
  //   features: ['По всей России', 'Наложенный платеж', 'Отслеживание'],
  //   color: 'from-purple-500 to-pink-500'
  // }
]

const regions = [
  { city: 'Москва', time: '1-2 дня', price: 'Бесплатно от 3000 ₽' },
  { city: 'Санкт-Петербург', time: '2-3 дня', price: 'от 300 ₽' },
  { city: 'Казань', time: '3-4 дня', price: 'от 400 ₽' },
  { city: 'Екатеринбург', time: '3-5 дней', price: 'от 450 ₽' },
  { city: 'Новосибирск', time: '4-6 дней', price: 'от 500 ₽' },
  { city: 'Краснодар', time: '3-5 дней', price: 'от 400 ₽' },
  { city: 'Владивосток', time: '7-14 дней', price: 'от 800 ₽' },
  { city: 'Калининград', time: '5-8 дней', price: 'от 600 ₽' },
]

const faqs = [
  {
    question: 'Как отследить заказ?',
    answer: 'После отправки заказа мы пришлем вам трек-номер для отслеживания. Также вы можете отслеживать статус заказа в личном кабинете.'
  },
  {
    question: 'Можно ли изменить адрес доставки?',
    answer: 'Да, вы можете изменить адрес доставки до момента отправки заказа. Свяжитесь с нашей службой поддержки.'
  },
  {
    question: 'Что делать, если товар поврежден?',
    answer: 'При получении проверьте товар в присутствии курьера. Если есть повреждения, откажитесь от получения и свяжитесь с нами.'
  },
  {
    question: 'Работает ли доставка в выходные?',
    answer: 'Да, мы осуществляем доставку 7 дней в неделю. В выходные дни доступна только экспресс-доставка.'
  },
  {
    question: 'Как рассчитать срок доставки?',
    answer: 'Срок доставки рассчитывается от момента подтверждения заказа до прибытия в ваш город. На обработку заказа требуется 1 рабочий день.'
  }
]

export default function DeliveryPage() {
  const [selectedMethod, setSelectedMethod] = useState('courier')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  const selectedDelivery = deliveryMethods.find(m => m.id === selectedMethod)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero секция */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <Truck className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Доставка и оплата
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Быстрая и надежная доставка по всей России. Выбирайте удобный способ получения и оплаты.
          </p>
        </div>

        {/* Основные способы доставки */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Способы доставки</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {deliveryMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg'
                    : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${method.color} mb-4`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Срок:</span>
                    <span className="font-semibold">{method.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Стоимость:</span>
                    <span className="font-semibold">{method.price}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Детали выбранного метода */}
          {selectedDelivery && (
            <div className="card p-8 animate-fadeInUp">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedDelivery.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedDelivery.description}</p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedDelivery.color}`}>
                  {selectedDelivery.icon}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-3xl font-bold mb-2">{selectedDelivery.time}</div>
                  <div className="text-gray-600 dark:text-gray-400">Срок доставки</div>
                </div>
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-3xl font-bold mb-2">{selectedDelivery.price}</div>
                  <div className="text-gray-600 dark:text-gray-400">Стоимость</div>
                </div>
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-400">Поддержка</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Преимущества:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedDelivery.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Сроки доставки по регионам */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Сроки доставки по городам</h2>
            <Calculator className="h-6 w-6 text-gray-400" />
          </div>

          <div className="card p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-4 px-6 font-semibold">Город</th>
                    <th className="text-left py-4 px-6 font-semibold">Срок доставки</th>
                    <th className="text-left py-4 px-6 font-semibold">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map((region, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                        region.city === 'Москва' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{region.city}</span>
                          {region.city === 'Москва' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 text-xs rounded-full">
                              Основной
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {region.time}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold">{region.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
            <p>Для других городов сроки уточняйте у менеджера.</p>
          </div>
        </section>

        {/* Способы оплаты */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Способы оплаты</h2>
            <CreditCard className="h-6 w-6 text-gray-400" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-900 mb-4">
                <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Картой онлайн</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Безопасная оплата картой Visa, MasterCard, Мир
              </p>
              <div className="flex justify-center gap-2">
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Visa</div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">MasterCard</div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">МИР</div>
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-green-100 dark:bg-green-900 mb-4">
                <Truck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">При получении</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Наличными или картой курьеру или в пункте выдачи
              </p>
              <div className="text-sm text-green-600 dark:text-green-400">
                Доступно не для всех товаров
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-purple-100 dark:bg-purple-900 mb-4">
                <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Электронные кошельки</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ЮMoney, СберПэй, Тинькофф, QIWI и другие системы
              </p>
              <div className="flex justify-center gap-2">
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">ЮMoney</div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">QIWI</div>
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-orange-100 dark:bg-orange-900 mb-4">
                <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Рассрочка и кредит</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Рассрочка от 3 до 12 месяцев без первоначального взноса
              </p>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                Подробности у менеджера
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Частые вопросы</h2>
            <HelpCircle className="h-6 w-6 text-gray-400" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-lg font-semibold">{faq.question}</span>
                  </div>
                  {expandedFaq === index ? (
                    <X className="h-5 w-5 text-gray-500" />
                  ) : (
                    <span className="text-blue-600 dark:text-blue-400">+</span>
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6 pt-0 border-t border-gray-200 dark:border-gray-800 animate-fadeInUp">
                    <p className="text-gray-700 dark:text-gray-300 mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Контакты службы доставки */}
        <section className="mb-16">
          <div className="card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Контакты службы доставки</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-medium">Телефон</div>
                      <a href="tel:+78001234567" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                        8 (800) 123-45-67
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:delivery@simpleshop.ru" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                        delivery@simpleshop.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-medium">Режим работы</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Пн-Пт: 9:00-21:00<br />
                        Сб-Вс: 10:00-20:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Правила доставки</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Проверяйте товар при получении в присутствии курьера</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Имейте при себе паспорт для получения заказа</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Сохраняйте чек до истечения гарантийного срока</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>При отказе от заказа предупредите за 2 часа до доставки</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">
              Остались вопросы по доставке?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Наши менеджеры с радостью помогут вам с выбором способа доставки и ответят на все вопросы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+78001234567" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Позвонить нам
              </a>
              <a 
                href="/contacts" 
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Все контакты
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Добавляем анимацию fadeInUp в глобальные стили если её нет
// Добавьте в app/globals.css:
/*
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.3s ease-out;
}
*/