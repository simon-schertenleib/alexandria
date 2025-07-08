"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import type { Book } from "@/lib/bookSearch"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = React.useState("")
  const [books, setBooks] = React.useState<Book[] | null>(null)
  const [loading, setLoading] = React.useState(false)

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

  async function handleAdd(book: Book) {
    await fetch('/api/favourites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
    toast('Added to favourites')
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
    <div
      className={`flex min-h-screen flex-col items-center p-8 ${
        books ? "pt-12" : "justify-center"
      }`}
    >
      <h1 className="mb-6 text-3xl font-semibold">Book Search</h1>
      <form onSubmit={handleSearch} className="w-full max-w-md mb-8 space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
      {books && (
        <div className="w-full max-w-xl space-y-4">
          {books.length === 0 && (
            <Alert>
              <AlertDescription>No results found.</AlertDescription>
            </Alert>
          )}
          {books.map((book, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {book.title}
                  {book.year && (
                    <Badge variant="secondary" className="ml-2">
                      {book.year}
                    </Badge>
                  )}
                </CardTitle>
                {book.author && (
                  <CardDescription>{book.author}</CardDescription>
                )}
              </CardHeader>
              {book.description && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    {book.description}
                  </p>
                </CardContent>
              )}
              {book.rating && (
                <CardContent className="pt-2">
                  <Badge variant="outline">Rating: {book.rating.toFixed(1)}</Badge>
                </CardContent>
              )}
              <CardContent className="flex gap-2">
                <Button variant="outline" onClick={() => handleAdd(book)}>
                  Add to favourites
                </Button>
                <Button asChild variant="ghost">
                  <Link href={`/book/${book.id}`}>View details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    <Toaster />
    </>
  )
}
