"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { OpenLibraryDoc } from "@/lib/bookSearch"
import { Icon } from "@/components/ui/icon"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = React.useState("")
  const [books, setBooks] = React.useState<OpenLibraryDoc[] | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [favourites, setFavourites] = React.useState<string[]>([])

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
        const ids = (data.favourites as OpenLibraryDoc[]).map((b) => b.key)
        setFavourites(ids)
      })
      .catch((err) => console.error(err))
  }, [])

  async function handleAdd(book: OpenLibraryDoc) {
    await fetch('/api/favourites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
    setFavourites((prev) =>
      prev.includes(book.key) ? prev : [...prev, book.key]
    )
    toast('Added to favourites')
  }

  async function handleRemove(id: string) {
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
    setLoading(true)
    router.push(`/?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-8 pt-12">
        <h1 className="mb-6 text-3xl font-semibold">Alexandria</h1>
        <form
          onSubmit={handleSearch}
          className={`w-full max-w-md mb-8 space-y-2 transition-transform duration-300 ease-out ${books === null && !loading ? "translate-y-[40vh]" : ""
            }`}
        >
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
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
        {loading && (
          <div className="flex items-center justify-center w-full max-w-md space-y-4 animate-in fade-in duration-300 ease-in pt-10">
            <Loader2 className="size-24 animate-spin" />
          </div>
        )}
        {(books && !loading) && (
          <div className="w-full max-w-xl space-y-4 animate-in fade-in duration-300 ease-in">
            {books.length === 0 && (
              <Alert>
                <AlertDescription>No results found.</AlertDescription>
              </Alert>
            )}
            {books.map((book, idx) => {
              console.log(book);
              const imageUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
                : 'https://covers.openlibrary.org/static/images/icons/avatar_book-sm.png'

              return (
                <div
                  key={idx}
                  className="flex h-56 gap-4"
                >
                  <Link href={`/book/${book.key}`}>
                    <div style={{ position: 'relative', zIndex: 99 }}>
                      <Button
                        className="absolute top-1 right-1 bg-[#171717]/85 hover:bg-[#171717] transition-colors"
                        variant={'default'}
                        onClick={(e) => {
                          e.preventDefault();
                          favourites.includes(book.key)
                            ? handleRemove(book.key)
                            : handleAdd(book)
                        }
                        }
                      >
                        {favourites.includes(book.key)
                          ? <Icon icon="unheart" fill="#100000" stroke="none" />
                          : <Icon icon="heart" fill="#a24547" stroke="none" />}
                      </Button>
                    </div>
                    <Image
                      src={imageUrl}
                      alt="Book cover"
                      width={146}
                      height={176}
                      className="h-full w-[146px] rounded-md object-cover"
                      placeholder="blur"
                      blurDataURL="https://covers.openlibrary.org/static/images/icons/avatar_book-sm.png"
                      loading="lazy"
                    />
                  </Link>

                  <Card className="flex-1 overflow-hidden">
                    <CardContent className="flex h-full flex-col gap-2 overflow-y-auto">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{book.title}</CardTitle>
                          {book.author_name && (
                            <CardDescription>{book.author_name.join(", ")}</CardDescription>
                          )}
                        </div>
                        {book.first_publish_year && (
                          <Badge variant="secondary" className="ml-2 h-fit">
                            {book.first_publish_year}
                          </Badge>
                        )}
                      </div>
                      <div className="overflow-scroll">
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {book.number_of_pages_median && <p>Pages: {book.number_of_pages_median}</p>}
                          {book.publisher && <p>Publisher: {book.publisher[0]}</p>}
                          {book.isbn && <p>ISBN: {book.isbn[0]}</p>}
                        </div>
                        {book.first_sentence && (
                          <p className="text-sm text-muted-foreground line-clamp-2 pb-2">
                            {book.first_sentence.join(" ")}
                          </p>
                        )}
                      </div>
                      <div className="mt-auto flex gap-2 pt-2 justify-between">
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          {book.subject && <p>{book.subject.slice(0, 3).map(g => {
                            return (
                              <Badge variant="secondary" className="mr-2 h-fit">
                                {g}
                              </Badge>
                            )
                          })}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <Toaster />
    </>
  )
}
