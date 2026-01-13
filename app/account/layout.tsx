'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Проверка авторизации (заглушка)
    const isAuthenticated = true // Здесь должна быть реальная проверка
    
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [])

  return <>{children}</>
}