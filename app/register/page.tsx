"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import api from "@/utils/axios";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Состояния для полей формы
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Отправляем запрос на регистрацию
      const response = await api.post("/api/users/register", {
        name,
        email,
        password,
      });

      const { user, token } = response.data;

      // После успешной регистрации обычно сразу логиним пользователя
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Переход в личный кабинет
      router.push("/account");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Ошибка при регистрации. Возможно, такой email уже занят.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-transparent">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-lg mb-4 shadow-lg shadow-blue-500/20">
            <div className="h-8 w-8 text-white text-xl font-bold flex items-center justify-center">
              S
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Создать аккаунт
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Присоединяйтесь к нам и начните покупки
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-5 border border-gray-100 dark:border-gray-800"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Поле Имя */}
          <div>
            <label className="block text-sm font-medium mb-1.5  dark:text-gray-300">
              Полное имя
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  outline-none transition-all"
                placeholder="Иван Иванов"
                required
              />
            </div>
          </div>

          {/* Поле Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5  dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-200  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  outline-none transition-all"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>

          {/* Поле Пароль */}
          <div>
            <label className="block text-sm font-medium mb-1.5  dark:text-gray-300">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 text-gray-200  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  outline-none transition-all"
                placeholder="Минимум 8 символов"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Регистрируясь, вы соглашаетесь с нашими{" "}
            <a href="/terms" className="underline hover:text-blue-600">
              Условиями использования
            </a>
            .
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "Создание..." : "Создать аккаунт"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Уже есть аккаунт?{" "}
          </span>
          <a
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-800 font-bold"
          >
            Войти в систему
          </a>
        </div>
      </div>
    </div>
  );
}
