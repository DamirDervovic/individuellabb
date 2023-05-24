module.exports = class availability {
    constructor(id, bookId, borrowed, available) {
        this.id = id
        this.bookId = bookId
        this.borrowed = borrowed
        this.available = available
    }
}
