"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import api from "@/utils/axios";
import { useAuth } from "@/context/authContext"; // Импортируем наш контекст

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login: authLogin } = useAuth(); // Берем метод login из контекста

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/users/login", { email, password });

      const { user, token } = response.data;

      // 1. Сохраняем токен в зависимости от галочки "Запомнить меня"
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", token);

      authLogin(user);

      // 3. Переход
      router.push("/");
      router.refresh(); // Принудительное обновление для серверных компонентов
    } catch (err: any) {
      setError(err.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-black transition-colors">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <div className="h-8 w-8 text-white text-xl font-black">S</div>
          </div>
          <h1 className="text-3xl font-black mb-2 dark:text-white uppercase tracking-tighter">
            Вход
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Добро пожаловать обратно!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 dark:border-gray-800 space-y-6"
        >
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-2 ml-1 dark:text-gray-300">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 ml-1 dark:text-gray-300">
              Пароль
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                Запомнить
              </span>
            </label>
            <a
              href="/forgot-password"
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              Забыли?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "ВОЙТИ В АККАУНТ"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Впервые у нас?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline font-bold"
            >
              Создать аккаунт
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
