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

import {
  Category,
  Product,
  Order,
  PaymentMethod,
  Address,
  WishlistItem,
  User,
} from "@/type/product";

import api from "@/utils/axios";

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
  users: User[];
}

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка всех данных с улучшенной обработкой ошибок
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Используем Promise.allSettled вместо Promise.all
      const endpoints = [
        { key: "products", url: "/api/products" },
        { key: "categories", url: "/api/categories" },
        { key: "orders", url: "api/orders" },
        { key: "users", url: "api/users" },
      ];

      const results = await Promise.allSettled(
        endpoints.map((endpoint) => api.get(endpoint.url)),
      );

      // Обрабатываем результаты
      const productsResult = results[0];
      const categoriesResult = results[1];
      const ordersResult = results[2];
      const usersResult = results[3];

      // Обработка товаров

      if (productsResult.status === "fulfilled") {
        setProducts(productsResult.value.data || []);
      } else {
        console.error("Ошибка загрузки товаров:", productsResult.status);
        setProducts([]);
        setError("Не удалось загрузить товары");
      }

      // Обработка категорий
      if (categoriesResult.status === "fulfilled") {
        setCategories(categoriesResult.value.data || []);
      } else {
        console.error("Ошибка загрузки категорий:", categoriesResult.reason);
        setCategories([]);
        if (!error) setError("Не удалось загрузить категории");
      }

      //Обработка заказов
      if (ordersResult.status === "fulfilled") {
        setOrders(ordersResult.value.data || []);
      } else {
        console.error("Ошибка загрузки заказов :", ordersResult.reason);
        setOrders([]);
        if (!error) setError("Не удалось загрузить заказы");
      }

      //Обработка пользователей

      if (usersResult.status === "fulfilled") {
        setUsers(usersResult.value.data);
      } else {
        console.error("Ошибка загрузки пользователей :", usersResult.reason);
        setUsers([]);
        if (!error) setError("Не удалось загрузить пользователей");
      }

      // Загружаем избранное и корзину из localStorage
      if (typeof window !== "undefined") {
        try {
          const savedWishlist = localStorage.getItem("wishlist");
          const savedCart = localStorage.getItem("cart");

          if (savedWishlist) {
            const parsedWishlist = JSON.parse(savedWishlist);
            setWishlist(Array.isArray(parsedWishlist) ? parsedWishlist : []);
          }

          if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            setCart(Array.isArray(parsedCart) ? parsedCart : []);
          }
        } catch (localStorageError) {
          console.error("Ошибка чтения localStorage:", localStorageError);
        }
      }
    } catch (err) {
      console.error("Критическая ошибка загрузки данных:", err);
      setError("Не удалось загрузить данные. Проверьте подключение к серверу.");

      // Загружаем mock данные при ошибке
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (mounted) {
        await fetchData();
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetchData]);

  // Сохранение корзины и избранного в localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (err) {
        console.error("Ошибка сохранения корзины:", err);
      }
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      } catch (err) {
        console.error("Ошибка сохранения избранного:", err);
      }
    }
  }, [wishlist]);

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
        return newWishlist;
      } else {
        // Добавляем в избранное
        const wishlistItem: WishlistItem = {
          id: Date.now().toString(),
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
        };
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

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((item) => item.productId !== id));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  // ... (остальные функции без изменений)

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
    users,
    paymentMethods,
    wishlist,
    cart,
    loading,
    error,
    setError,

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

    // Данные
    refreshData: fetchData,
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
