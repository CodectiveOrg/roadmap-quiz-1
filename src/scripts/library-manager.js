export class LibraryManager {
  #books = [];

  constructor(books) {
    books.map((book) => this.#books.add(book));
  }

  get books() {
    return this.#books;
  }

  addBook(book) {
    this.#books.add(book);
  }

  editBook(row, book) {
    this.#books[row - 1] = book;
  }

  removeBook(row) {
    this.#books.delete(row - 1);
  }

  clone() {
    return new LibraryManager(this.#books);
  }
}
