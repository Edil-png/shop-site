"use client";

import { CreditCard, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { PaymentMethod } from "@/type/product";

interface PayTabProps {
  methods: PaymentMethod[];
}

export function PayTab({ methods }: PayTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Способы оплаты</h2>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
          <Plus className="h-4 w-4" />
          Добавить карту
        </button>
      </div>

      <div className="grid gap-4">
        {methods.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">У вас нет сохраненных способов оплаты</p>
          </div>
        ) : (
          methods.map((method) => (
            <div
              key={method.id}
              className={`relative overflow-hidden border rounded-xl p-6 transition-all ${
                method.isDefault
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <CreditCard className={`h-6 w-6 ${method.isDefault ? "text-blue-600" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {method.name} •••• {method.last4}
                      </h3>
                      {method.isDefault && (
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Срок действия: {method.expiry}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!method.isDefault && (
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                      Сделать основной
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Декоративный элемент для основной карты */}
              {method.isDefault && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4 flex gap-3">
        <div className="p-1">
          <CheckCircle2 className="h-5 w-5 text-amber-600" />
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Ваши платежные данные надежно зашифрованы и защищены по стандарту PCI DSS. Мы не храним полные номера карт на наших серверах.
        </p>
      </div>
    </div>
  );
}