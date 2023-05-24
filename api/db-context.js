const pgp = require('pg-promise')()
require('dotenv').config()
const connectionString = process.env.DB_CONNECTION_STRING
const db = pgp(connectionString)

async function getAllBooks() {
    let data = await db.any(`SELECT * FROM books`)
    return data
}

async function getAvailabilityByBookId(bookId) {
    const query = `SELECT * FROM book_availability WHERE book_id = $1`
    const params = [bookId]

    let data = await db.any(query, params)
    return data
}

async function selectBookByKeyword(keyword, column) {
    let data = await db.any(`
      SELECT *
      FROM books
      WHERE ${column} ILIKE '%${keyword}%'
    `)
    return data
}

async function insertBook(title, author, genre, year) {
    const result = await db.one(
        `INSERT INTO books (title, author, genre, year_published, availability)
        VALUES ('${title}', '${author}', '${genre}', '${year}', true)
        RETURNING book_id`
    )

    const bookId = result.book_id

    await db.none(
        `INSERT INTO book_availability (book_id, borrowed, available)
        VALUES ('${bookId}', 0, 1)`
    )
}

async function updateBook(
    bookId,
    title,
    author,
    genre,
    year,
    availability,
    borrowed,
    available
) {
    await db.none(
        `UPDATE books
        SET title = $1, author = $2, genre = $3, year_published = $4, availability = $5
        WHERE book_id = $6;

        UPDATE book_availability
        SET borrowed = $7, available = $8
        WHERE book_id = $6;`,
        [title, author, genre, year, availability, bookId, borrowed, available]
    )
}

async function deleteBook(bookId) {
    await db.none(`DELETE FROM book_availability WHERE book_id = ${bookId}`)

    await db.none(`DELETE FROM books WHERE book_id = ${bookId}`)
}

module.exports = {
    getAllBooks,
    getAvailabilityByBookId,
    selectBookByKeyword,
    insertBook,
    updateBook,
    deleteBook
}
