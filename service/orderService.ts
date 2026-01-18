import api from '@/utils/axios';
import { Product } from '@/type/product';

interface OrderData {
  items: (Product & { quantity: number })[];
  totalAmount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const createOrder = async (order: OrderData) => {
  // Отправляем POST запрос на ваш бэкенд
  const { data } = await api.post('/orders', order);
  return data;
};