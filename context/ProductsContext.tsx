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
// Предполагаем, что типы расширены в этом файле
import {
  Addres,
  Category,
  Product,
  Order,
  PaymentMethod,
} from "@/type/product";

export interface CartItem extends Product {
  quantity: number;
}

interface ProductsContextType {
  products: Product[];
  categories: Category[];
  addresses: Addres[]; // Исправили имя на множественное число
  orders: Order[]; // Добавили заказы
  paymentMethods: PaymentMethod[]; // Добавили оплату
  wishlist: Product[]; // Добавили избранное
  cart: CartItem[];
  loading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const api = axios.create({
  baseURL:
    "https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [addresses, setAddresses] = useState<Addres[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Загрузка данных
  useEffect(() => {
    async function fetchData() {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) setCart(JSON.parse(savedCart));

        // ВАЖНО: В Firebase Realtime DB ко всем путям нужно добавлять .json
        const [
          resProducts,
          resCategories,
          resAddres,
          resOrders,
          resPayments,
          resWishlist,
        ] = await Promise.all([
          api.get("/products.json"),
          api.get("/categories.json"),
          api.get("/addres.json"),
          api.get("/orders.json"), // Добавили .json
          api.get("/paymentMethods.json"),
          api.get("/wishlistItems.json"),
        ]);

        // Универсальная функция для превращения объектов Firebase в массивы
        const formatData = (data: any) => (data ? Object.values(data) : []);

        setProducts(formatData(resProducts.data) as Product[]);
        setCategories(formatData(resCategories.data) as Category[]);
        setAddresses(formatData(resAddres.data) as Addres[]);
        setOrders(formatData(resOrders.data) as Order[]);
        setPaymentMethods(formatData(resPayments.data) as PaymentMethod[]);
        setWishlist(formatData(resWishlist.data) as Product[]);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. Сохранение корзины
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 3. Методы управления корзиной
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );
  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        addresses, // Состояние адресов
        orders, // Состояние заказов
        paymentMethods,
        wishlist,
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts must be used within ProductsProvider");
  return context;
};
