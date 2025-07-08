import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authenticate } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()
  if (authenticate(username, password)) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('session', 'authenticated', {
      httpOnly: true,
      path: '/',
    })
    response.cookies.set('username', username, {
      httpOnly: true,
      path: '/',
    })
    return response
  }
  return NextResponse.json({ success: false }, { status: 401 })
}
