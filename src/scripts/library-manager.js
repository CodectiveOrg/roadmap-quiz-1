export class LibraryManager {
    #books;

    constructor(books) {
        this.#books = [...books];
    }

    get books () {
        return this.#books;
    }

    addBook (book) {
        this.#books = [...this.#books , book];
    }

    editBook(row, book) {
        this.#books[row - 1] = book;
    }

    removeBook(row) {
        const tempBooks = this.#books;
        tempBooks.splice(row - 1 , 1);
        this.#books = tempBooks;
    }

    clone() {

    }
}