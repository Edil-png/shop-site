"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import {
  Category,
  Product,
  Order,
  PaymentMethod,
  Address,
  WishlistItem,
} from "@/type/product";

export interface CartItem extends Product {
  quantity: number;
}

interface ProductsContextType {
  products: Product[];
  categories: Category[];
  addresses: Address[];
  orders: Order[];
  paymentMethods: PaymentMethod[];
  wishlist: WishlistItem[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;

  // Корзина
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  cartCount: number;

  // Избранное
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;

  // Заказы
  createOrder: (
    orderData: Omit<Order, "id" | "createdAt" | "status">,
  ) => Promise<string>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"],
  ) => Promise<void>;

  // Адреса
  addAddress: (address: Omit<Address, "id">) => Promise<string>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;

  // Данные
  refreshData: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getCategoryBySlug: (slug: string) => Category | undefined;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Инициализация из localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Форматирование данных из Firebase
  const formatFirebaseData = <T,>(data: any): T[] => {
    if (!data) return [];
    return Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as object),
    })) as T[];
  };

  // Загрузка всех данных

  // Сохранение корзины в localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Корзина
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // Избранное
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id,
      );
      if (existingIndex > -1) {
        // Удаляем из избранного
        const newWishlist = [...prev];
        newWishlist.splice(existingIndex, 1);

        // Опционально: удаляем с сервера
        api
          .delete(`/wishlist/${prev[existingIndex].id}.json`)
          .catch(console.error);

        return newWishlist;
      } else {
        // Добавляем в избранное
        const wishlistItem: WishlistItem = {
          id: Date.now().toString(),
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
        };

        // Опционально: добавляем на сервер
        api.post(`/wishlist.json`, wishlistItem).catch(console.error);

        return [...prev, wishlistItem];
      }
    });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => {
      return wishlist.some((item) => item.productId === id);
    },
    [wishlist],
  );

  const removeFromWishlist = useCallback(
    (id: string) => {
      const itemToRemove = wishlist.find((item) => item.productId === id);
      if (itemToRemove) {
        setWishlist((prev) => prev.filter((item) => item.productId !== id));
        api.delete(`/wishlist/${itemToRemove.id}.json`).catch(console.error);
      }
    },
    [wishlist],
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    // Опционально: очистка на сервере
    api.delete("/wishlist.json").catch(console.error);
  }, []);

  // Заказы
  const createOrder = useCallback(
    async (
      orderData: Omit<Order, "id" | "createdAt" | "status">,
    ): Promise<string> => {
      try {
        const order: Order = {
          ...orderData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          status: "pending",
        };

        const response = await api.post(`/orders.json`, order);
        const newOrderId = response.data.name; // Firebase возвращает ID как "name"

        setOrders((prev) => [...prev, { ...order, id: newOrderId }]);
        clearCart(); // Очищаем корзину после создания заказа

        return newOrderId;
      } catch (err) {
        console.error("Ошибка создания заказа:", err);
        throw new Error("Не удалось создать заказ");
      }
    },
    [clearCart],
  );

  const updateOrderStatus = useCallback(
    async (orderId: string, status: Order["status"]) => {
      try {
        await api.patch(`/orders/${orderId}.json`, { status });
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status } : order,
          ),
        );
      } catch (err) {
        console.error("Ошибка обновления заказа:", err);
        throw err;
      }
    },
    [],
  );

  // Адреса
  const addAddress = useCallback(
    async (addressData: Omit<Address, "id">): Promise<string> => {
      try {
        const response = await api.post("/addresses.json", addressData);
        const newAddressId = response.data.name;

        const newAddress: Address = {
          ...addressData,
          id: newAddressId,
        };

        setAddresses((prev) => [...prev, newAddress]);
        return newAddressId;
      } catch (err) {
        console.error("Ошибка добавления адреса:", err);
        throw err;
      }
    },
    [],
  );

  const updateAddress = useCallback(
    async (id: string, addressData: Partial<Address>) => {
      try {
        await api.patch(`/addresses/${id}.json`, addressData);
        setAddresses((prev) =>
          prev.map((address) =>
            address.id === id ? { ...address, ...addressData } : address,
          ),
        );
      } catch (err) {
        console.error("Ошибка обновления адреса:", err);
        throw err;
      }
    },
    [],
  );

  const removeAddress = useCallback(async (id: string) => {
    try {
      await api.delete(`/addresses/${id}.json`);
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (err) {
      console.error("Ошибка удаления адреса:", err);
      throw err;
    }
  }, []);

  const setDefaultAddress = useCallback(
    async (id: string) => {
      try {
        // Сначала сбрасываем все адреса как не основные
        await Promise.all(
          addresses.map((addr) =>
            api.patch(`/addresses/${addr.id}.json`, { isDefault: false }),
          ),
        );

        // Устанавливаем выбранный адрес как основной
        await api.patch(`/addresses/${id}.json`, { isDefault: true });

        setAddresses((prev) =>
          prev.map((address) => ({
            ...address,
            isDefault: address.id === id,
          })),
        );
      } catch (err) {
        console.error("Ошибка установки адреса по умолчанию:", err);
        throw err;
      }
    },
    [addresses],
  );

  // Вспомогательные методы
  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return products.find((product) => product.id === id);
    },
    [products],
  );

  const getProductsByCategory = useCallback(
    (categoryId: string): Product[] => {
      return products.filter((product) => product.categoryId === categoryId);
    },
    [products],
  );

  const getCategoryBySlug = useCallback(
    (slug: string): Category | undefined => {
      return categories.find((category) => category.slug === slug);
    },
    [categories],
  );

  // Вычисляемые значения
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const cartCount = useMemo(() => cart.length, [cart]);

  const value = {
    products,
    categories,
    addresses,
    orders,
    paymentMethods,
    wishlist,
    cart,
    loading,
    error,

    // Корзина
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
    cartCount,

    // Избранное
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    clearWishlist,

    // Заказы
    createOrder,
    updateOrderStatus,

    // Адреса
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,

    // Данные
    refreshData: fetchData,
    getProductById,
    getProductsByCategory,
    getCategoryBySlug,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
};
