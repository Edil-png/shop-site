"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import api from "@/utils/axios";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
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

      // В response.data должен быть user и token
      const { user, token } = response.data;

      // Можно сохранять токен в localStorage если rememberMe
      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      // Переход на главную или панель
      router.push("/account");
    } catch (err: any) {
      // Axios возвращает ошибку в response
      setError(err.response?.data?.error || "Ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-lg mb-4">
            <div className="h-8 w-8 text-white text-xl font-bold">S</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Вход в аккаунт</h1>
          <p className="text-gray-600">Введите свои данные для входа</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Запомнить меня</span>
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Забыли пароль?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-sm text-gray-600">Нет аккаунта? </span>
          <a
            href="/register"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  );
}
