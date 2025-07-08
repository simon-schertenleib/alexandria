export interface Book {
  title: string;
  author?: string;
  year?: number;
}

/**
 * Search third-party websites for books. This currently returns a
 * static list but can be extended to call external APIs via HTTP.
 */
export async function searchBooks(query: string): Promise<Book[]> {
  // TODO: replace with real HTTP call to a third-party API
  const sample: Book[] = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  ];

  // Pretend we filtered by the query
  if (!query) {
    return sample;
  }

  return sample.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
}
