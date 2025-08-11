class LibraryManager {
  #books = [];

  constructor(books) {
    for (const book in books) {
      this.#books.push(clone(book));
    }
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

  clone(book) {
    return structuredClone(book);
  }
}

export { LibraryManager };
