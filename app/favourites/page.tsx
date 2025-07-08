"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import Link from 'next/link'
import type { Book } from '@/lib/bookSearch'

export default function FavouritesPage() {
  const [books, setBooks] = useState<Book[] | null>(null)

  useEffect(() => {
    async function fetchFavourites() {
      const res = await fetch('/api/favourites')
      const data = await res.json()
      setBooks(data.favourites)
    }
    fetchFavourites()
  }, [])

  async function handleRemove(id: number) {
    await fetch('/api/favourites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setBooks((prev) => prev ? prev.filter((b) => b.id !== id) : prev)
    toast('Removed from favourites')
  }

  return (
    <>
    <div className="flex min-h-screen flex-col items-center p-8 pt-12">
      <h1 className="mb-6 text-3xl font-semibold">Favourites</h1>
      {books && (
        <div className="w-full max-w-xl space-y-4">
          {books.length === 0 && (
            <Alert>
              <AlertDescription>No favourites yet.</AlertDescription>
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
                <Button variant="destructive" onClick={() => handleRemove(book.id)}>
                  Remove
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
