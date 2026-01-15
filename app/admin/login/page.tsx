'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  
  const router = useRouter()
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Фокус на поле email при загрузке страницы
  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email === 'admin@simpleshop.ru' && password === 'admin123') {
      localStorage.setItem('admin_token', 'demo_token_12345')
      router.push('/admin')
    } else {
      setError('Неверный email или пароль')
      setLoading(false)
      setIsShaking(true) // Включаем тряску формы
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] dark:bg-[#111827] p-4">
      <div className={`max-w-md w-full transition-transform duration-500 ${isShaking ? 'animate-shake' : ''}`}>
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-3xl mb-4 shadow-xl shadow-blue-500/20">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-white">Админ-панель</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
            SimpleAdmin v2.0
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-none p-8 border border-gray-100 dark:border-gray-700">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="admin@simpleshop.ru"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-gray-300">Пароль</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Проверка...
                </>
              ) : 'Войти в панель'}
            </button>
          </form>

          {/* Demo Credentials Footer */}
          <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-700">
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-4 text-center">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Демо доступ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-mono">admin@simpleshop.ru</span> / <span className="font-mono">admin123</span>
              </p>
            </div>
            
            <div className="text-center mt-6">
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                ← Вернуться на главный сайт
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}