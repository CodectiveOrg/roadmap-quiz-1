export class LibraryManager {
  #books;
  constructor(books) {
    this.#books = books.map((book) => book.clone());
  }

  get books() {
    return this.#books;
  }

  addBook(book) {
    this.#books.push(book);
  }

  editBook(row, book) {
    this.#books[row - 1] = book;
  }

  removeBook(row) {
    this.#books.splice(row - 1, 1);
  }

  clone() {
    return new LibraryManager(this.#books);
  }
}
