class Book {
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

  clone() {
    return structuredClone({
      title: this.title,
      author: this.author,
      description: this.description,
    });
  }
}

export { Book };
