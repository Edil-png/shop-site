import Link from "next/link";
import ProductCard from "../ProductCard";
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
};

type Props = {
  newsProducts: Product[];
};

export function HeroNews({ newsProducts }: Props) {
  if (!newsProducts || newsProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <TitleSection subTitle="Новинки" title={["Новые", "поступление"]} />
          <LookAll />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
