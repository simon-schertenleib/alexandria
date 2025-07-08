import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { addFavourite, getFavourites, removeFavourite } from '@/lib/db'

export async function GET(request: NextRequest) {
  const username = request.cookies.get('username')?.value
  if (!username) return NextResponse.json({ favourites: [] })
  const favourites = getFavourites(username)
  return NextResponse.json({ favourites })
}

export async function POST(request: NextRequest) {
  const username = request.cookies.get('username')?.value
  if (!username) return NextResponse.json({ success: false }, { status: 401 })
  const book = await request.json()
  addFavourite(username, book)
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const username = request.cookies.get('username')?.value
  if (!username) return NextResponse.json({ success: false }, { status: 401 })
  const { id } = await request.json()
  removeFavourite(username, Number(id))
  return NextResponse.json({ success: true })
}
