import { searchBooks } from '@/lib/bookSearch';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? '';
  const books = await searchBooks(query);
  return Response.json({ books });
}
