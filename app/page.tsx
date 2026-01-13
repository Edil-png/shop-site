"use client";

import { useEffect, useState } from "react";
import BestCategories from "@/components/BestCategories";
import { HeroNews } from "@/components/News";
import { Recommended } from "@/components/Recommended";
import { Stock } from "@/components/Stock";

/* ===== TYPE ===== */
type Product = {
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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(
          `https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`
        );

        if (!res.ok) {
          throw new Error("Ошибка загрузки");
        }
        const data = await res.json();
        console.log(data)
        if (data) {
          const productsArray: Product[] = Object.values(data);
          setProducts(productsArray);
        }
      } catch (error) {
        console.error(error);
      } 
    }

    getProducts();
  }, []);
  const cleanFilter = products.filter(Boolean)
  const featuredProducts = cleanFilter.slice(0, 4);
  const newProducts = cleanFilter.filter((p) => p.isNew);
  const discountedProducts = cleanFilter.filter((p) => p.discount);
  console.log(featuredProducts)



  return (
    <div className="min-h-screen">
      <BestCategories />
      <Recommended featuredProducts={featuredProducts} />
      <HeroNews newsProducts={newProducts} />
      <Stock discountedProducts={discountedProducts} />
    </div>
  );
}
