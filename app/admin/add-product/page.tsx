"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Save,
  X,
  Info,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import api from "@/utils/axios";

type ApiError = {
  error: string;
  message: string;
};

export default function AddProductPage() {
  const router = useRouter();
  const { categories } = useProducts();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    tags: [] as string[],
    specifications: {
      author: "",
      pages: 0,
      language: "",
      year: 0,
    },
    weight: 0,
  });

  const [images, setImages] = useState<string[]>([]);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/products", {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images,
      });

      router.push("/admin/products");
    } catch (err: any) {
      setError(
        err.response?.data ?? {
          error: "UNKNOWN_ERROR",
          message: "Ошибка при создании товара",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- IMAGES ----------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- UI ----------------
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Вернуться к списку товаров
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Новый товар</h1>
          <p className="text-gray-500">
            Заполните информацию для добавления товара
          </p>
        </div>

        <button
          type="submit"
          form="product-form"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Сохранение..." : "Опубликовать"}
        </button>
      </div>

      <form
        id="product-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <section className="p-6 bg-white rounded-2xl shadow">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" /> Основные данные
            </h2>

            <input
              type="text"
              placeholder="Название товара"
              className="w-full mb-2 px-4 py-2 border rounded-xl"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {error?.error === "NAME" && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}

            <textarea
              rows={4}
              placeholder="Описание"
              className="w-full mt-4 px-4 py-2 border rounded-xl"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </section>

          {/* IMAGES */}
          <section className="p-6 bg-white rounded-2xl shadow">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-500" /> Изображения
            </h2>

            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer">
                <Upload className="h-6 w-6 text-gray-400" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <section className="p-6 bg-white rounded-2xl shadow space-y-4">
            <span>Категория</span>
            <select
              className="w-full px-4 py-2 border rounded-xl"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            {error?.error === "CATEGORY" && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
            <span>Цена</span>
            <input
              type="number"
              min={0}
              placeholder="Цена"
              className="w-full px-4 py-2 border rounded-xl"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />
            <span className="text-red-500 block">
              {error?.error === "PRICE" ? error.message : ""}
            </span>
            <span>Количество</span>
            <input
              type="number"
              min={0}
              placeholder="Количество"
              className="w-full px-4 py-2 border rounded-xl"
              value={formData.stock || ""}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
            />
            <span>Артикул</span>
            <input
              type="text"
              placeholder="SKU"
              className="w-full px-4 py-2 border rounded-xl"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />
            {error?.error === "SKU" && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </section>
        </div>
      </form>
    </div>
  );
}
