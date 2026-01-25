import { ReactNode } from "react";

/* ===== ТОВАР ===== */
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  categoryId: string;
  rating: number;
  createdAt: string;
  reviews: number;
  features: [];
  stock: number;
  inStock: boolean;
  isNew?: boolean;
  discount: number;
  images: string[]; // Добавил массив изображений
  specifications?: Record<string, string>; // Технические характеристики
  tags?: string[]; // Теги для поиска
  weight?: number; // Вес товара
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
};



/* ===== КАТЕГОРИЯ ===== */
export type Category = {
  subcategories: any;
  products: ReactNode;
  status: string;
  id: string;
  name: string;
  description: string; // Переименовал about в description для консистентности
  slug: string; // URL-friendly идентификатор
  count: number;
  parentId?: string; // Для подкатегорий
  image?: string;
  about: string;
};

/* ===== АДРЕС ===== */
export type Address = {
  // Исправил опечатку в названии типа
  id: string;
  title: string; // "Дом", "Работа" - более точное название
  address: string;
  city: string;
  zipCode: string; // Добавил почтовый индекс
  phone: string;
  isDefault: boolean;
  country?: string;
  region?: string;
};

/* ===== ОТЗЫВ ===== */
export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpful?: number;
};

/* ===== ПОЛЬЗОВАТЕЛЬ ===== */
export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  addresses?: Address[];
  defaultAddressId?: string;
  paymentMethods?: PaymentMethod[];
  favoriteProductIds?: string[];
};

/* ===== ЭЛЕМЕНТ КОРЗИНЫ ===== */
export type CartItem = {
  id: string;
  productId: string;
  variantId?: string; // Если есть варианты
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  maxStock?: number; 
};

/* ===== ЗАКАЗ ===== */
export type OrderItem = {
  productId: string;
  variantId?: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  total: number; // price * quantity
};

export type Order = {
  pay: ReactNode;
  addresses: ReactNode;
  customer: any;
  id: string;
  userId: string;
  orderNumber: string; // Человекочитаемый номер
  date: string;
  total: number;
  subtotal: number;
  createdAt: string;
  shippingCost: number;
  tax: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  notes?: string;
};

/* ===== СПОСОБ ОПЛАТЫ ===== */
export type PaymentMethod = {
  id: string;
  type: "card" | "paypal" | "apple-pay" | "google-pay";
  name: string;
  last4?: string; // Для карт
  expiry?: string;
  isDefault: boolean;
  provider?: string; // Visa, Mastercard и т.д.
};

/* ===== ДОСТАВКА ===== */
export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
};

/* ===== КОНТЕКСТ КОРЗИНЫ ===== */
export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (
    product: Product | CartItem,
    quantity?: number,
    variantId?: string,
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // Изменил на абсолютное значение
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  getItem: (productId: string, variantId?: string) => CartItem | undefined;

  // Добавленные поля
  shippingMethod?: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  discountCode?: string;
  setDiscountCode: (code: string) => void;
  discountAmount: number;

  // Для чекаута
  checkout: (checkoutData: CheckoutData) => Promise<Order>;
  isLoading: boolean;
  error?: string;
};

/* ===== ДАННЫЕ ЧЕКАУТА ===== */
export type CheckoutData = {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  notes?: string;
};

/* ===== ФИЛЬТРЫ ТОВАРОВ ===== */
export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest";
  search?: string;
};

/* ===== ПРОМОКОД ===== */
export type PromoCode = {
  code: string;
  type: "percentage" | "fixed" | "shipping";
  value: number;
  minOrder?: number;
  expiresAt?: string;
  categories?: string[]; // Ограничение по категориям
};

/* ===== УВЕДОМЛЕНИЕ ===== */
export type Notification = {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
};

/* ===== ДЛЯ UI КОМПОНЕНТОВ ===== */
export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type Tab = {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

/* ===== ПАГИНАЦИЯ ===== */
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/* ===== API ОТВЕТ ===== */
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
  pagination?: Pagination;
};

/* ===== СОСТОЯНИЕ ЗАГРУЗКИ ===== */
export type LoadingState = {
  isLoading: boolean;
  error?: string;
  progress?: number; // Для загрузки файлов
};
export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}
