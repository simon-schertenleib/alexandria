'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Book {
  title: string
  link?: string
  source: string
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)

  async function search(q: string) {
    const books: Book[] = []
    try {
      const olRes = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`
      )
      if (olRes.ok) {
        const data = await olRes.json()
        if (Array.isArray(data.docs)) {
          books.push(
            ...data.docs.slice(0, 5).map((d: { title: string; key: string }) => ({
              title: d.title,
              link: `https://openlibrary.org${d.key}`,
              source: 'Open Library',
            }))
          )
        }
      }
    } catch (e) {
      console.error(e)
    }

    try {
      const gbRes = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}`
      )
      if (gbRes.ok) {
        const data = await gbRes.json()
        if (Array.isArray(data.items)) {
          books.push(
            ...data.items
              .slice(0, 5)
              .map((b: { volumeInfo: { title: string; previewLink?: string } }) => ({
                title: b.volumeInfo.title,
                link: b.volumeInfo.previewLink,
                source: 'Google Books',
              }))
          )
        }
      }
    } catch (e) {
      console.error(e)
    }

    setResults(books)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    setLoading(true)
    await search(query)
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-5xl font-semibold">Alexandria</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="w-full max-w-xl mt-6">
        {loading && <p>Loading...</p>}
        {results.map((book, i) => (
          <div key={i} className="mb-3">
            {book.link ? (
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                {book.title}
              </a>
            ) : (
              <span className="font-medium">{book.title}</span>
            )}
            <span className="ml-2 text-sm text-muted-foreground">({book.source})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

