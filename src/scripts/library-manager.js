export class LibraryManager {
  #books;

  constructor(books) {
    books.map((book) => this.#books.add(book));
  }

  get books() {
    return this.#books;
  }

  addBook(book) {}

  editBook(row, book) {}

  removeBook(row) {}

  clone() {}
}
