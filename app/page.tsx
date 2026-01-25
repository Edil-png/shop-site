"use client";

import BestCategories from "@/components/Sections/BestCategories/BestCategories";
import { HeroSection } from "@/components/Sections/HeroSection";
import { Recommended } from "@/components/Sections/Recommended";
import { HeroNews } from "@/components/Sections/News";
import { Stock } from "@/components/Sections/Stock";

export default function Home() {

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 selection:bg-blue-100 selection:text-blue-900">
      <BestCategories />
      <HeroSection />
      {/* <CtaBanner /> */}
      <Recommended  />
      <HeroNews  />
      <Stock />
    </main>
  );
}
