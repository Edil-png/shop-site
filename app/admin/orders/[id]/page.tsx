"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  X,
  Phone,
  Mail,
} from "lucide-react";
import { useProducts } from "@/context/ProductsContext";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { orders, users, products } = useProducts();

  // 1. Находим заказ и пользователя
  const order = useMemo(() => orders.find((o) => o.id === id), [orders, id]);
  const user = useMemo(
    () => (order ? users.find((u) => u.id === order.userId) : null),
    [order, users],
  );

  // 2. Рассчитываем итоговую сумму (если в заказе только ID товаров)
  const orderItems = useMemo(() => {
    if (!order) return [];
    return order.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        product,
      };
    });
  }, [order, products]);

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-bold">Заказ не найден</h2>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-500 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      {/* Кнопка назад и заголовок */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            Заказ #{order.id.slice(-6).toUpperCase()}
            {getStatusBadge(order.status)}
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Оформлен: {order.date}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка: Состав заказа */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50/50">
              <h2 className="font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" /> Состав заказа
              </h2>
            </div>
            <div className="divide-y">
              {orderItems.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    {item.product?.images ? (
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {item.product?.name || "Товар удален"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} шт. × {item.product?.price} ₽
                    </p>
                  </div>
                  <div className="text-right font-semibold">
                    {(item.product?.price || 0) * item.quantity} ₽
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
              <span className="font-bold text-lg">Итого к оплате:</span>
              <span className="font-bold text-2xl text-blue-600">
                {totalPrice} ₽
              </span>
            </div>
          </div>
        </div>

        {/* Правая колонка: Информация о клиенте и доставке */}
        <div className="space-y-6">
          {/* Клиент */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-semibold flex items-center gap-2 border-b pb-2">
              <User className="h-5 w-5 text-gray-400" /> Клиент
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Имя</p>
                <p className="font-medium">{user?.name || "Гость"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{user?.phone || "Не указан"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-blue-500 underline cursor-pointer">
                  {user?.email || "Нет почты"}
                </span>
              </div>
            </div>
          </div>

          {/* Доставка и оплата */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-semibold flex items-center gap-2 border-b pb-2">
              <MapPin className="h-5 w-5 text-gray-400" /> Доставка и оплата
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                  Адрес доставки
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {user?.addresses?.[0]
                    ? `${user.addresses[0].city}, ${user.addresses[0].address}`
                    : "Самовывоз или адрес не указан"}
                </p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                  Способ оплаты
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  {order.pay === "card"
                    ? "Банковская карта"
                    : "Наличными при получении"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Вспомогательная функция (можно вынести в отдельный UI-компонент) */
const getStatusBadge = (status: string) => {
  const map = {
    processing: {
      label: "Обработка",
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    shipped: {
      label: "В пути",
      color: "bg-blue-100 text-blue-700",
      icon: Truck,
    },
    delivered: {
      label: "Доставлен",
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    cancelled: { label: "Отменён", color: "bg-red-100 text-red-700", icon: X },
  };

  const config = map[status as keyof typeof map] ?? map.processing;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.color}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
};
