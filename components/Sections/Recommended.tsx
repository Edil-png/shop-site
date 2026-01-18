import Link from "next/link";
import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";
import { TitleSection } from "./TitleSection";
import { LookAll } from "../LookAll";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  image?: string; // Добавьте, если в ProductCard нужна картинка
};

type Props = {
  featuredProducts: Product[];
};

export function Recommended({ featuredProducts }: Props) {
  // Проверка на случай пустых данных
  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <TitleSection title={["Хиты", "продаж"]} subTitle={"Популярные"} />
          <LookAll />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
