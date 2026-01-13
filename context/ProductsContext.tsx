"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Тип продукта
export interface Product {
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
}

// Тип категории
export interface Category {
  id: string;
  name: string;
}

// Тип контекста
interface ProductsContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  categories: [],
  loading: true,
});

// Провайдер
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resProducts, resCategories] = await Promise.all([
          fetch(
            "https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
          ),
          fetch(
            "https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json"
          ),
        ]);

        if (!resProducts.ok || !resCategories.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const productsData = await resProducts.json();
        const categoriesData = await resCategories.json();

        const productsArray: Product[] = Object.values(productsData || {});
        const categoriesArray: Category[] = Object.values(categoriesData || {});

        setProducts(productsArray);
        setCategories(categoriesArray);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, categories, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Хук для использования контекста
export const useProducts = () => useContext(ProductsContext);
