import { CreditCard, Shield, TrendingUp, Truck } from "lucide-react";

export default function Advantages() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              1-3 дня по всей стране
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Гарантия 2 года</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              На все товары
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
              <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Удобная оплата</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Картой или наличными
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold mb-2">Лучшие цены</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Гарантия низкой цены
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
