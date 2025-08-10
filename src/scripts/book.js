class Book {
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

  clone(title, author, description) {
    return structuredClone(new Book(title, author, description));
  }
}

export { Book };
