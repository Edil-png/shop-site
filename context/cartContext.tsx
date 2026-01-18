"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartContextType, CartItem, Product } from "@/type/product";
import api from "@/utils/axios";
import { toast } from "sonner"; // Предполагаю, что вы используете sonner для уведомлений

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    const saved = localStorage.getItem("cart_data");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка парсинга корзины", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Сохранение корзины при изменениях
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart_data", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Функция отправки заказа на сервер
  const checkout = async (customerData: any) => {
    try {
      const orderPayload = {
        items: cartItems,
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
      toast.error(error.response?.data?.message || "Ошибка при создании заказа");
      throw error;
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};