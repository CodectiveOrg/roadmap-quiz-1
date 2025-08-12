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
  editBook(row, book) {}
  removeBook(row) {}
  clone() {
    return new LibraryManager(this.#books);
  }
}
