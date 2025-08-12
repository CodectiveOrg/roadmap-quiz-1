// Unit-like tests for the pure JavaScript modules (no DOM involved)

const importModules = () =>
  cy
    .window()
    .then(() =>
      Promise.all([
        import("/src/scripts/book.js"),
        import("/src/scripts/library-manager.js"),
      ]).then(([bookMod, lmMod]) => ({
        Book: bookMod.Book,
        LibraryManager: lmMod.LibraryManager,
      })),
    );

describe("Pure JS modules: Book and LibraryManager", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Book: constructor assigns fields and clone returns a distinct instance", () => {
    importModules().then(({ Book }) => {
      const original = new Book("Title", "Author", "Desc");
      expect(original.title).to.eq("Title");
      expect(original.author).to.eq("Author");
      expect(original.description).to.eq("Desc");

      const copy = original.clone();
      expect(copy).to.not.equal(original);
      expect(copy).to.deep.include({
        title: "Title",
        author: "Author",
        description: "Desc",
      });

      // Mutating the clone must not affect original
      copy.title = "Changed";
      expect(original.title).to.eq("Title");
    });
  });

  it("LibraryManager: constructor clones input books and preserves order", () => {
    importModules().then(({ Book, LibraryManager }) => {
      const a = new Book("A", "AA", "AAA");
      const b = new Book("B", "BB", "BBB");
      const manager = new LibraryManager([a, b]);

      // Preserves order
      expect(manager.books.map((x) => x.title)).to.deep.eq(["A", "B"]);

      // Constructor must clone input (changing original should not affect manager)
      a.title = "A*";
      expect(manager.books[0].title).to.eq("A");

      // Items in manager should be instances of Book
      expect(manager.books[0]).to.be.instanceOf(Book);
      expect(manager.books[1]).to.be.instanceOf(Book);
    });
  });

  it("LibraryManager: addBook accepts plain objects and appends correctly", () => {
    importModules().then(({ Book, LibraryManager }) => {
      const manager = new LibraryManager([new Book("X", "Y", "Z")]);
      manager.addBook({ title: "T", author: "A", description: "D" });
      expect(manager.books).to.have.length(2);
      expect(manager.books[1]).to.include({
        title: "T",
        author: "A",
        description: "D",
      });
    });
  });

  it("LibraryManager: editBook uses 1-based index and replaces item", () => {
    importModules().then(({ Book, LibraryManager }) => {
      const manager = new LibraryManager([
        new Book("One", "A", "D1"),
        new Book("Two", "B", "D2"),
      ]);
      manager.editBook(2, { title: "Two*", author: "B*", description: "D2*" });
      expect(manager.books[1]).to.deep.include({
        title: "Two*",
        author: "B*",
        description: "D2*",
      });
      expect(manager.books[0].title).to.eq("One");
    });
  });

  it("LibraryManager: removeBook uses 1-based index and reorders naturally", () => {
    importModules().then(({ Book, LibraryManager }) => {
      const manager = new LibraryManager([
        new Book("One", "A", "D1"),
        new Book("Two", "B", "D2"),
        new Book("Three", "C", "D3"),
      ]);
      manager.removeBook(2);
      expect(manager.books.map((x) => x.title)).to.deep.eq(["One", "Three"]);
    });
  });

  it("LibraryManager: clone returns a deep copy (mutations do not leak)", () => {
    importModules().then(({ Book, LibraryManager }) => {
      const manager = new LibraryManager([
        new Book("One", "A", "D1"),
        new Book("Two", "B", "D2"),
      ]);

      const managerCopy = manager.clone();
      // Mutate clone's book
      managerCopy.books[0].title = "Changed";

      // Original remains intact
      expect(manager.books[0].title).to.eq("One");
      // And arrays are different references
      expect(managerCopy.books).to.not.equal(manager.books);

      // Items in the clone should be instances of Book
      expect(managerCopy.books[0]).to.be.instanceOf(Book);
      expect(managerCopy.books[1]).to.be.instanceOf(Book);
    });
  });
});
