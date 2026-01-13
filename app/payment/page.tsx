'use client'

import { Shield, Clock, RefreshCw, Check, AlertCircle, HelpCircle, Phone, Mail } from 'lucide-react'

export default function GuaranteePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero секция */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Гарантия и возврат
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Мы гарантируем качество всех товаров и обеспечиваем простую процедуру возврата.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Гарантия */}
          <div>
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                <h2 className="text-3xl font-bold">Гарантия</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Стандартная гарантия</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-2xl font-bold">24 месяца</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    На все товары предоставляется гарантия от 12 до 24 месяцев в зависимости от категории.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Расширенная гарантия</h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-lg font-semibold">До 36 месяцев</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Приобретите расширенную гарантию и получите дополнительную защиту на срок до 3 лет.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Что покрывает гарантия:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Заводские дефекты и неисправности</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Поломки в результате нормальной эксплуатации</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Бесплатный ремонт в авторизованных сервисных центрах</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Возврат */}
          <div>
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold">Возврат</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Возврат в течение 14 дней</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-lg font-semibold">14 дней с момента покупки</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Вы можете вернуть товар надлежащего качества в течение 14 дней без объяснения причин.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Условия возврата:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Товар не был в употреблении</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Сохранены все заводские ярлыки и упаковка</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt:0.5 flex-shrink-0" />
                      <span>Присутствуют все документы и аксессуары</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Важная информация:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Некоторые категории товаров (гигиенические товары, программное обеспечение) не подлежат возврату.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}