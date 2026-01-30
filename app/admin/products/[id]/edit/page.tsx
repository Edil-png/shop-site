"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Save,
  X,
  Info,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import api from "@/utils/axios";

type ApiError = {
  error: string;
  message: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { categories } = useProducts();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  // 1. Загрузка данных существующего товара
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${params.id}`);
        const product = response.data;
        
        setFormData({
          name: product.name || "",
          sku: product.sku || "",
          category: product.category || "",
          price: product.price || 0,
          stock: product.stock || 0,
          description: product.description || "",
          tags: product.tags || [],
          specifications: product.specifications || {
            author: "",
            pages: 0,
            language: "",
            year: 0,
          },
          weight: product.weight || 0,
        });
        setImages(product.images || []);
      } catch (err) {
        console.error("Ошибка при загрузке товара:", err);
        setError({ error: "FETCH_ERROR", message: "Не удалось загрузить данные товара" });
      } finally {
        setFetching(false);
      }
    };

    if (params.id) fetchProduct();
  }, [params.id]);

  // ---------------- SUBMIT (UPDATE) ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Используем метод PUT для обновления
      await api.put(`/api/products/${params.id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images,
      });

      router.push("/admin/products");
      router.refresh(); // Обновляем данные на странице списка
    } catch (err: any) {
      setError(
        err.response?.data ?? {
          error: "UNKNOWN_ERROR",
          message: "Ошибка при сохранении изменений",
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

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500">Загрузка данных товара...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Вернуться к списку
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Редактирование</h1>
          <p className="text-gray-500 truncate max-w-md">
            ID: {params.id}
          </p>
        </div>

        <div className="flex gap-3">
            <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
                Отмена
            </button>
            <button
            type="submit"
            form="product-form"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-50 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
            <Save className="h-4 w-4" />
            {loading ? "Сохранение..." : "Сохранить изменения"}
            </button>
        </div>
      </div>

      <form
        id="product-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Общая ошибка */}
          {error?.error === "FETCH_ERROR" && (
             <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
                {error.message}
             </div>
          )}

          <section className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold mb-6 flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-blue-500" /> Основные данные
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Название товара</label>
                    <input
                    type="text"
                    placeholder="Название товара"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    />
                    {error?.error === "NAME" && (
                    <p className="text-red-500 text-xs mt-1">{error.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Описание</label>
                    <textarea
                    rows={6}
                    placeholder="Полное описание товара..."
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    />
                </div>
            </div>
          </section>

          {/* IMAGES */}
          <section className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold mb-6 flex items-center gap-2 text-lg">
              <ImageIcon className="h-5 w-5 text-purple-500" /> Изображения
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative group aspect-square">
                  <img
                    src={img}
                    alt="product"
                    className="w-full h-full object-cover rounded-xl border border-gray-200 dark:border-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-2 font-medium">Загрузить</span>
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

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <section className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-5">
            <div>
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">Категория</label>
                <select
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
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
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
            </div>

            <div>
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">Цена (₽)</label>
                <input
                type="number"
                min={0}
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.price || ""}
                onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                }
                />
                {error?.error === "PRICE" && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
            </div>

            <div>
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">Склад (шт)</label>
                <input
                type="number"
                min={0}
                placeholder="0"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.stock || ""}
                onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                }
                />
            </div>

            <div>
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">Артикул (SKU)</label>
                <input
                type="text"
                placeholder="SKU-XXXXX"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                value={formData.sku}
                onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                }
                />
                {error?.error === "SKU" && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
            </div>
          </section>

          <div className="p-6 bg-blue-50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/20">
              <h4 className="text-blue-700 dark:text-blue-400 font-bold text-sm mb-2 flex items-center gap-2">
                  <Info size={16} /> Совет
              </h4>
              <p className="text-xs text-blue-600/80 dark:text-blue-400/60 leading-relaxed">
                  Проверьте корректность SKU и цены перед сохранением. Эти данные напрямую влияют на учет в системе и видимость для покупателей.
              </p>
          </div>
        </div>
      </form>
    </div>
  );
}