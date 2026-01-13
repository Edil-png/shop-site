'use client'

import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "./ProductCard";



export function Stock(){
  const {products} = useProducts()
  

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Акции и скидки</h2>

          <Link
            href="/catalog?sort=discount"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Все акции →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
