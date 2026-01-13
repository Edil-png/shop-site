import Link from "next/link";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean
};

type Props = {
  newsProducts: Product[];
};

export function HeroNews({ newsProducts }: Props) {
  if (!newsProducts || newsProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Новинки</h2>

          <Link
            href="/catalog?sort=new"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Смотреть все новинки →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
