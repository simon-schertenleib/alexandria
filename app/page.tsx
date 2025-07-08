"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Book } from "@/lib/bookSearch"

export default function Home() {
  const [query, setQuery] = React.useState("")
  const [books, setBooks] = React.useState<Book[] | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setBooks(data.books)
    } catch (err) {
      console.error(err)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center p-8 ${
        books ? "pt-12" : "justify-center"
      }`}
    >
      <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
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
        <div className="w-full max-w-md space-y-4">
          {books.length === 0 && <p>No results found.</p>}
          {books.map((book, idx) => (
            <div key={idx} className="border rounded-md p-4">
              <p className="font-semibold">{book.title}</p>
              {book.author && (
                <p className="text-sm text-muted-foreground">{book.author}</p>
              )}
              {book.year && (
                <p className="text-sm text-muted-foreground">{book.year}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
