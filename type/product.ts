import { ReactNode } from "react";

/* ===== ТОВАР ===== */
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
};

/* ===== КАТЕГОРИЯ ===== */
export type Category = {
  id: string;
  name: string;
  about: string;
  count: number;
};

/* ===== АДРЕС ===== */
export type Addres = {
  id: string;
  name: string; // Например, "Дом" или "Работа"
  address: string; // Исправил опечатку (было addres)
  city: string;
  phone: string;
  isDefault: boolean;
};

/* ===== ЗАКАЗ ===== */
export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  date: string; // Рекомендую хранить ISO string
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[]; // Массив товаров в заказе
};

/* ===== ОПЛАТА ===== */
export type PaymentMethod = {
  id: string;
  name: string; // Например, "Visa" или "Mastercard"
  last4: string; // Последние 4 цифры
  expiry: string; // Срок действия, например "12/26"
  isDefault: boolean;
};