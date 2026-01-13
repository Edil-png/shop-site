"use client";
import { useProducts } from "@/context/ProductsContext";
import { Recommended } from "../components/Recommended";
import { HeroNews } from "../components/News";
import { Stock } from "../components/Stock";
import BestCategories from "../components/BestCategories";
import "./globals.css";

export default function Home() {
  const { products, loading } = useProducts();

  if (loading) return <div className="text-center py-20">Загрузка...</div>;

  const cleanFilter = products.filter(Boolean);
  const featuredProducts = cleanFilter.slice(0, 4);
  const newProducts = cleanFilter.filter((p) => p.isNew);
  const discountedProducts = cleanFilter.filter((p) => p.discount);

  return (
    <div className="min-h-screen">
      <BestCategories />
      <Recommended featuredProducts={featuredProducts} />
      <HeroNews newsProducts={newProducts} />
      <Stock />
    </div>
  );
}
