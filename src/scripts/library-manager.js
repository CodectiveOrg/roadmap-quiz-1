class LibraryManager {
  #books = [];

  constructor(books) {
    for (const book of books) {
      this.#books.push(this.clone(book));
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
    this.#books[index] = this.clone(book);
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
