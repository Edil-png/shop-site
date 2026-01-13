"use client";

import { useProducts } from "@/context/ProductsContext";
import { notFound, useParams } from "next/navigation";
import { Star } from "lucide-react";
import './../../globals.css'

export default function ProductPage() {
  const { products, loading } = useProducts();
  const params = useParams();

  if (loading) return <div className="text-center py-20">Загрузка...</div>;

  if (!params?.id || !products || products.length === 0) {
    return <div className="text-center py-20">пшпшТовар не найден</div>;
  }
  const cleanFilter = products.filter(Boolean)
  const product = cleanFilter.find((p) => p.id === params.id);

  if (!product) notFound();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="text-xl mb-2">Цена: ${product.price}</div>
        <p>{product.description}</p>
        <div className="flex mt-4 gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span>({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}
