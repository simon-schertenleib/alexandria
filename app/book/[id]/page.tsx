import { getBook } from '@/lib/bookSearch'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(Number(params.id))
  if (!book) return notFound()
  return (
    <div className="flex min-h-screen flex-col items-center p-8 pt-12">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {book.title}
            {book.year && (
              <Badge variant="secondary" className="ml-2">
                {book.year}
              </Badge>
            )}
          </CardTitle>
          {book.author && <CardDescription>{book.author}</CardDescription>}
        </CardHeader>
        {book.description && (
          <CardContent className="pt-0 pb-4">
            <p className="text-sm text-muted-foreground">{book.description}</p>
          </CardContent>
        )}
        {book.rating && (
          <CardContent className="pt-0">
            <Badge variant="outline">Rating: {book.rating.toFixed(1)}</Badge>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
