import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Solo aplicar a rutas admin
  if (path.startsWith('/admin')) {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('admin_auth')

    // Si no está autenticado y no está en login, redirigir
    if (!authToken && path !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Si está autenticado y está en login, redirigir al dashboard
    if (authToken && path === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
