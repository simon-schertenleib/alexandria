import Database from 'better-sqlite3'
import path from 'path'
import type { Book } from './bookSearch'

const db = new Database(path.join(process.cwd(), 'data.db'))

// initialize table
const init = `
CREATE TABLE IF NOT EXISTS favourites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  book_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  author TEXT,
  year INTEGER,
  description TEXT,
  rating REAL,
  UNIQUE(username, book_id)
)`

db.exec(init)

export function addFavourite(username: string, book: Book) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO favourites (username, book_id, title, author, year, description, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  stmt.run(
    username,
    book.id,
    book.title,
    book.author ?? null,
    book.year ?? null,
    book.description ?? null,
    book.rating ?? null
  )
}

export function removeFavourite(username: string, bookId: number) {
  const stmt = db.prepare(
    `DELETE FROM favourites WHERE username = ? AND book_id = ?`
  )
  stmt.run(username, bookId)
}

export function getFavourites(username: string): Book[] {
  const stmt = db.prepare(
    `SELECT book_id as id, title, author, year, description, rating FROM favourites WHERE username = ?`
  )
  return stmt.all(username) as Book[]
}
