"use client";

import { Star, Truck, Shield, RefreshCw, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
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

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(
          "https://shop-site-fda0f-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
        );

        if (!res.ok) throw new Error("Ошибка загрузки");

        const data = await res.json();
        const products: Product[] = Array.isArray(data)
          ? data
          : Object.values(data);

        const foundProduct = products[Number(id)];
        setProduct(foundProduct ?? null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Загрузка...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Товар не найден</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">

        {/* Хлебные крошки */}
        <nav className="mb-8 text-sm text-gray-600">
          <a href="/">Главная</a> /{" "}
          <a href={`/categories/${product.category}`}>
            {product.category}
          </a>{" "}
          / {product.name}
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Изображение */}
          <div className="bg-gray-100 rounded-2xl p-12 flex justify-center">
            <div className="text-8xl">
              {product.category === "electronics" && "📱"}
              {product.category === "clothing" && "👕"}
              {product.category === "home" && "🏠"}
              {product.category === "beauty" && "💄"}
            </div>
          </div>

          {/* Информация */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Рейтинг */}
            <div className="flex items-center mb-4">
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
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Цена */}
            <div className="mb-4">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.oldPrice && (
                <span className="ml-3 text-gray-500 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {/* Наличие */}
            {product.inStock ? (
              <div className="text-green-600 flex items-center mb-4">
                <Check className="mr-2" /> В наличии
              </div>
            ) : (
              <div className="text-red-600 mb-4">Нет в наличии</div>
            )}

            {/* Описание */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Кнопки */}
            <div className="flex gap-4">
              <button className="btn-primary flex-1">В корзину</button>
              <button className="btn-secondary">Купить</button>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Feature icon={<Truck />} text="Быстрая доставка" />
              <Feature icon={<Shield />} text="Гарантия 2 года" />
              <Feature icon={<RefreshCw />} text="Возврат 30 дней" />
              <Feature icon={<Check />} text="Оригинал" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
