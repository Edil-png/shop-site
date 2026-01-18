"use client";

import { useProducts } from "@/context/ProductsContext";
import { Loading } from "@/components/Loading";
import BestCategories from "@/components/Sections/BestCategories";
import { HeroSection } from "@/components/Sections/HeroSection";
import { Recommended } from "@/components/Sections/Recommended";
import { HeroNews } from "@/components/Sections/News";
import { Stock } from "@/components/Sections/Stock";

export default function Home() {
  const { products, loading } = useProducts();

  const cleanProducts = (products || []).filter(
    (p) => p && typeof p === "object"
  );

  const featuredProducts = cleanProducts.slice(0, 4);
  const newProducts = cleanProducts.filter((p) => p.isNew).slice(0, 8);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 selection:bg-blue-100 selection:text-blue-900">
      <BestCategories />
      <HeroSection />
      <Recommended featuredProducts={featuredProducts} />
      <HeroNews newsProducts={newProducts} />
      <Stock />
    </main>
  );
}
