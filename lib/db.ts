import Database from 'better-sqlite3'
import path from 'path'
import type { Book } from './bookSearch'

const db = new Database(path.join(process.cwd(), 'data.db'))

// initialize table
const init = `
CREATE TABLE IF NOT EXISTS favourites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT,
  year INTEGER,
  description TEXT,
  rating REAL
)`

db.exec(init)

export function addFavourite(username: string, book: Book) {
  const stmt = db.prepare(
    `INSERT INTO favourites (username, title, author, year, description, rating) VALUES (?, ?, ?, ?, ?, ?)`
  )
  stmt.run(
    username,
    book.title,
    book.author ?? null,
    book.year ?? null,
    book.description ?? null,
    book.rating ?? null
  )
}

export function getFavourites(username: string): Book[] {
  const stmt = db.prepare(
    `SELECT title, author, year, description, rating FROM favourites WHERE username = ?`
  )
  return stmt.all(username) as Book[]
}
