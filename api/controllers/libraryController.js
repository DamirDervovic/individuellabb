const {
    getAllBooks,
    getAvailabilityById,
    addBook,
    getBookByKeyword,
    editBook,
    deleteBook
} = require('../repositories/libraryRepository')

async function getBookAvailability(req, res) {
    let data = await getAvailabilityById(req.params.bookId)

    return res.json(data)
}

async function search(req, res) {
    let keyword = req.query.keyword
    let column = req.query.column || 'title'
    let data = await getBookByKeyword(keyword, column)

    return res.json(data)
}
async function add(req, res) {
    await addBook(
        req.body.title,
        req.body.author,
        req.body.genre,
        req.body.year
    )
}

async function edit(req, res) {
    await editBook(
        req.body.bookId,
        req.body.title,
        req.body.author,
        req.body.genre,
        req.body.year,
        req.body.availability,
        req.body.borrowed,
        req.body.available
    )
}

async function remove(req, res) {
    await deleteBook(req.body.bookId)
}

async function getAll(req, res) {
    let data = await getAllBooks(req)

    return res.json(data)
}

module.exports = {
    getAll,
    getBookAvailability,
    search,
    add,
    edit,
    remove
}
