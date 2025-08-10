class LibraryManager {
  #books;

  constructor(books) {
    this.#books = this.clone(books);
  }

  get books() {
    return this.#books;
  }

  addBook(book) {
    this.#books.push(book);
  }

  editBook(row, book) {
    const index = row - 1;
    this.#books[index] = structuredClone(book);
  }

  removeBook(row) {
    const index = row - 1;
    this.#books.splice(index, 1);
  }

  clone(books) {
    return structuredClone(books);
  }
}

export { LibraryManager };
