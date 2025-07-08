import { NextResponse } from 'next/server'
import { getBook } from '@/lib/bookSearch'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const book = await getBook(Number(params.id))
  if (!book) {
    return NextResponse.json({ success: false }, { status: 404 })
  }
  return NextResponse.json({ book })
}
