import { useProducts } from "@/context/ProductsContext";
import { notFound, useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const { products, categories, loading } = useProducts();
  const params = useParams();

  if (loading) return <div className="text-center py-20">Загрузка...</div>;

  const category = categories.find((c) => c.id === params.category);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.category === params.category);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-2xl font-bold mb-4">
              Товары временно отсутствуют
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Скоро появится что-то интересное!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
