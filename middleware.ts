import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/login') {
    return NextResponse.next()
  }

  const session = request.cookies.get('session')?.value
  if (!session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*'
}
