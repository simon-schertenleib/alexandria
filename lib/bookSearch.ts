export interface Book {
  id: number
  title: string
  author?: string
  year?: number
  description?: string
  rating?: number
}

/**
 * Search third-party websites for books. This currently returns a
 * static list but can be extended to call external APIs via HTTP.
 */
export const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    description:
      "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan during the Roaring Twenties.",
    rating: 4.4,
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    description:
      "A romantic novel that charts the emotional development of Elizabeth Bennet, who learns about the repercussions of hasty judgments.",
    rating: 4.6,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    description:
      "A novel about the serious issues of rape and racial inequality told through the eyes of a young girl in the Deep South.",
    rating: 4.8,
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    description:
      "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
    rating: 4.7,
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    year: 1851,
    description:
      "The narrative of Captain Ahab's obsessive quest to seek revenge on the white whale that bit off his leg.",
    rating: 4.2,
  },
  {
    id: 6,
    title: "War and Peace",
    author: "Leo Tolstoy",
    year: 1869,
    description:
      "An epic novel that intertwines the lives of private and public individuals during the time of the Napoleonic wars.",
    rating: 4.5,
  },
]

export async function searchBooks(query: string): Promise<Book[]> {
  // TODO: replace with real HTTP call to a third-party API

  if (!query) {
    return books
  }

  return books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  )
}

export async function getBook(id: number): Promise<Book | undefined> {
  return books.find((b) => b.id === id)
}
