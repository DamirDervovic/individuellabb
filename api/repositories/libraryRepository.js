const libraryBooksModel = require('../models/libraryBooksModel')
const libraryAvailabilityModel = require('../models/libraryAvailabilityModel')
const dbContext = require('../db-context')

async function getAllBooks() {
    let books = []

    let data = await dbContext.getAllBooks()

    data.forEach((book) => {
        books.push(
            new libraryBooksModel(
                book.book_id,
                book.title,
                book.author,
                book.genre,
                book.year_published,
                book.availability
            )
        )
    })
    return books
}

async function getAvailabilityById(bookId) {
    let booksAvailability = []

    let data = await dbContext.getAvailabilityByBookId(bookId)

    data.forEach((availability) => {
        booksAvailability.push(
            new libraryAvailabilityModel(
                availability.id,
                availability.book_id,
                availability.borrowed,
                availability.available
            )
        )
    })
    return booksAvailability
}

async function getBookByKeyword(keyword, column) {
    let books = []
    let data = await dbContext.selectBookByKeyword(keyword, column)

    data.forEach((book) => {
        books.push(
            new libraryBooksModel(
                book.book_id,
                book.title,
                book.author,
                book.genre,
                book.year_published,
                book.availability
            )
        )
    })

    return books
}
async function addBook(title, author, genre, year) {
    dbContext.insertBook(title, author, genre, year)
}

async function editBook(
    bookId,
    title,
    author,
    genre,
    year,
    availability,
    borrowed,
    available
) {
    dbContext.updateBook(
        bookId,
        title,
        author,
        genre,
        year,
        availability,
        borrowed,
        available
    )
}

async function deleteBook(bookId) {
    dbContext.deleteBook(bookId)
}

module.exports = {
    getAllBooks,
    getAvailabilityById,
    getBookByKeyword,
    addBook,
    editBook,
    deleteBook
}
