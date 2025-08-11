export class Book {
    title;
    author;
    description;

    constructor(title , author , description) {
        this.title = title;
        this.author = author;
        this.description = description;
    }

    clone() {
        return this;
    }
}