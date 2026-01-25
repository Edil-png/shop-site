"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { CartContextType, CartItem, Product } from "@/type/product";
import api from "@/utils/axios";
import { toast } from "sonner";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Инициализация из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart_data");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка парсинга корзины", e);
        localStorage.removeItem("cart_data");
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. Синхронизация с localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart_data", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // 3. Мемоизированные расчеты
  const { totalItems, totalPrice } = useMemo(() => {
    const items = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return {
      totalItems: items,
      // Округляем до 2 знаков для защиты от ошибок float
      totalPrice: Math.round(price * 100) / 100,
    };
  }, [cartItems]);

  // 4. Методы управления корзиной
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image, // Добавил image, обычно он нужен в корзине
          quantity,
        },
      ];
    });
    toast.success(`${product.name} добавлен в корзину`);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // 5. Оформление заказа
  const checkout = async (customerData: any) => {
    if (cartItems.length === 0) {
      toast.error("Корзина пуста");
      return;
    }

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
        customer: customerData,
        createdAt: new Date().toISOString(),
      };

      const response = await api.post("/orders", orderPayload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Заказ успешно оформлен!");
        clearCart();
        return response.data;
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Ошибка при создании заказа";
      toast.error(errorMsg);
      throw error;
    }
  };

  // Контекст мемоизируем, чтобы компоненты не перерендерились зря
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalItems,
      totalPrice,
      clearCart,
      checkout,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalItems,
      totalPrice,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
