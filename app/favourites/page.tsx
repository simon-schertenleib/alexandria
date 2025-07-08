"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronDownIcon } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import Link from 'next/link'
import type { Book } from '@/lib/bookSearch'

export default function FavouritesPage() {
  const [books, setBooks] = useState<Book[] | null>(null)
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('all')
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    async function fetchFavourites() {
      const res = await fetch('/api/favourites')
      const data = await res.json()
      setBooks(data.favourites)
    }
    fetchFavourites()
  }, [])

  const genres = useMemo(
    () =>
      Array.from(
        new Set((books ?? []).map((b) => b.genre).filter(Boolean) as string[])
      ),
    [books]
  )

  const filteredBooks = useMemo(() => {
    if (!books) return []
    return books.filter((b) => {
      const matchTitle = b.title.toLowerCase().includes(search.toLowerCase())
      const matchGenre = genre === 'all' || b.genre === genre
      return matchTitle && matchGenre
    })
  }, [books, search, genre])

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
          <div className="w-full max-w-3xl space-y-4">
            {books.length === 0 && (
              <Alert>
                <AlertDescription>No favourites yet.</AlertDescription>
              </Alert>
            )}
            {books.length > 0 && (
              <>
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <Input
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger className="sm:w-48">
                      <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All genres</SelectItem>
                      {genres.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-4" />
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.map((book) => (
                      <React.Fragment key={book.id}>
                        <TableRow
                          className="cursor-pointer"
                          onClick={() =>
                            setExpanded((prev) =>
                              prev === book.id ? null : book.id
                            )
                          }
                        >
                          <TableCell>
                            <ChevronDownIcon
                              className={`size-4 transition-transform ${
                                expanded === book.id ? 'rotate-180' : ''
                              }`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {book.title}
                          </TableCell>
                          <TableCell>{book.author ?? '-'}</TableCell>
                          <TableCell>{book.year ?? '-'}</TableCell>
                        </TableRow>
                        {expanded === book.id && (
                          <TableRow>
                            <TableCell colSpan={4} className="p-4">
                              {book.description && (
                                <p className="mb-2 text-sm text-muted-foreground">
                                  {book.description}
                                </p>
                              )}
                              {book.rating && (
                                <Badge variant="outline" className="mr-2">
                                  Rating: {book.rating.toFixed(1)}
                                </Badge>
                              )}
                              <div className="mt-2 flex gap-2">
                                <Button
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemove(book.id)
                                  }}
                                >
                                  Remove
                                </Button>
                                <Button asChild variant="ghost">
                                  <Link href={`/book/${book.id}`}>View details</Link>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                    {filteredBooks.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="py-6 text-center">
                          No favourites match your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </>
  )
}
