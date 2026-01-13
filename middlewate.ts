import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Проверяем, является ли путь админским
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Исключаем страницу логина из проверки
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Проверяем наличие токена
    const token = request.cookies.get('admin_token')?.value
    
    if (!token) {
      // Редирект на страницу логина если нет токена
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}