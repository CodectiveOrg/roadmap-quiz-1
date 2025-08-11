export class LibraryManager {
  #books = [];
  constructor(books) {
    this.#books = [...this.#books, ...books];
  }

  get books() {
    return this.#books;
  }

  addBook(book) {
    this.#books.push(book);
  }

  editBook(row, book) {
    this.#books.splice(row, 1, book);
  }

  removeBook(row) {
    this.#books.splice(row, 1);
  }

  clone() {
    return new LibraryManager(this.#books);
  }
}
