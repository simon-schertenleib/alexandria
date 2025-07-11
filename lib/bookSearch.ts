export interface OpenLibraryDoc {
  key: string
  title?: string
  author_name?: string[]
  first_publish_year?: number
  publisher?: string[]
  isbn?: string[]
  language?: string[]
  number_of_pages_median?: number
  subject?: string[]
  ratings_average?: number
  first_sentence?: string
  cover_i?: string
}

const fields = [
  "key", 
  "title", 
  "author_name", 
  "first_publish_year", 
  "publisher", 
  "isbn", 
  "language", 
  "number_of_pages_median", 
  "subject", 
  "ratings_average", 
  "first_sentence", 
  "cover_i"
]

export async function searchBooks(query: string): Promise<OpenLibraryDoc[]> {
  const url =
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10&fields=${fields.join(',')}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error(
        `OpenLibrary request failed: ${res.status} ${res.statusText}`
      )
      return []
    }
    const data = await res.json()
    const docs: OpenLibraryDoc[] = Array.isArray(data.docs) ? data.docs : []
    return docs.map((doc) => {
      doc.key = doc.key ? doc.key.replace('works/', '') : '';
      return doc;
    });
  } catch (err) {
    console.error('Failed to search books from OpenLibrary', err)
    return []
  }
}

export async function getBook(key: string): Promise<OpenLibraryDoc | undefined> {
  return searchBooks(key).then((docs) => {
    if (docs.length > 0) {
      return docs[0]
    }
    return undefined
  })
}
