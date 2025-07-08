"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import type { Book } from "@/lib/bookSearch"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = React.useState("")
  const [books, setBooks] = React.useState<Book[] | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [favourites, setFavourites] = React.useState<number[]>([])

  React.useEffect(() => {
    const q = searchParams.get('q')
    if (q !== null) {
      setQuery(q)
      setLoading(true)
      fetch(`/api/books/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setBooks(data.books))
        .catch((err) => {
          console.error(err)
          setBooks([])
        })
        .finally(() => setLoading(false))
    } else {
      setBooks(null)
    }
  }, [searchParams])

  React.useEffect(() => {
    fetch('/api/favourites')
      .then((res) => res.json())
      .then((data) => {
        const ids = (data.favourites as Book[]).map((b) => b.id)
        setFavourites(ids)
      })
      .catch((err) => console.error(err))
  }, [])

  async function handleAdd(book: Book) {
    await fetch('/api/favourites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
    setFavourites((prev) =>
      prev.includes(book.id) ? prev : [...prev, book.id]
    )
    toast('Added to favourites')
  }

  async function handleRemove(id: number) {
    await fetch('/api/favourites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setFavourites((prev) => prev.filter((f) => f !== id))
    toast('Removed from favourites')
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
    <div className="flex min-h-screen flex-col items-center p-8 pt-12">
      <h1 className="mb-6 text-3xl font-semibold">Book Search</h1>
      <form
        onSubmit={handleSearch}
        className={`w-full max-w-md mb-8 space-y-2 transition-transform duration-300 ease-out ${
          books === null && !loading ? "translate-y-[40vh]" : ""
        }`}
      >
        <div className="flex gap-2">
          <Input
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin" />} 
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
      {books && (
        <div className="w-full max-w-xl space-y-4 animate-in fade-in duration-300 ease-in">
          {books.length === 0 && (
            <Alert>
              <AlertDescription>No results found.</AlertDescription>
            </Alert>
          )}
          {books.map((book, idx) => {
            const imageUrl = typeof book.cover_i === 'number'
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
              : 'https://covers.openlibrary.org/static/images/icons/avatar_book-sm.png'

            return (
              <Card key={idx} className="flex gap-4">
                <div className="pl-6">
                  <AspectRatio ratio={16 / 9} className="w-32 bg-muted">
                    <Image
                      src={imageUrl}
                      alt="Book cover"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="flex flex-1 flex-col gap-2 pr-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{book.title}</CardTitle>
                      {book.author && (
                        <CardDescription>{book.author}</CardDescription>
                      )}
                    </div>
                    {book.year && (
                      <Badge variant="secondary" className="ml-2 h-fit">
                        {book.year}
                      </Badge>
                    )}
                  </div>
                  {book.description && (
                    <p className="text-sm text-muted-foreground">
                      {book.description}
                    </p>
                  )}
                  {book.rating && (
                    <Badge variant="outline">Rating: {book.rating.toFixed(1)}</Badge>
                  )}
                  <div className="mt-auto flex gap-2 pt-2">
                    <Button
                      variant={favourites.includes(book.id) ? 'destructive' : 'outline'}
                      onClick={() =>
                        favourites.includes(book.id)
                          ? handleRemove(book.id)
                          : handleAdd(book)
                      }
                    >
                      {favourites.includes(book.id)
                        ? 'Remove from favourites'
                        : 'Add to favourites'}
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href={`/book/${book.id}`}>View details</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
    <Toaster />
    </>
  )
}
