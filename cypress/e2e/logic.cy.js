describe("JavaScript logic: initial render, add, edit, remove", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders initial books from data.js", () => {
    cy.get("table tbody tr").should("have.length.at.least", 3);
    ["Frontend Roadmap", "Refactoring UI", "Clean Code"].forEach((title) =>
      cy.contains("table tbody td", title).should("exist"),
    );
  });

  it("adds a new book via form", () => {
    cy.get("form input[name='title']").type("JS Patterns");
    cy.get("form input[name='author']").type("Jane Roe");
    cy.get("form textarea[name='description']").type("Patterns and practices");
    cy.get("form button[type='submit']").click();

    cy.contains("table tbody td", "JS Patterns").should("exist");
    cy.contains("table tbody td", "Jane Roe").should("exist");
    cy.contains("table tbody td", "Patterns and practices").should("exist");
  });

  it("edits a book using the first row's edit action and persists changes", () => {
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button.icon-button").first().click();
      });

    cy.get("form input[name='title']").clear().type("Edited Title");
    cy.get("form input[name='author']").clear().type("Edited Author");
    cy.get("form textarea[name='description']").clear().type("Edited Desc");
    cy.get("form button[type='submit']").click();

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("td").eq(0).should("contain.text", "Edited Title");
        cy.get("td").eq(1).should("contain.text", "Edited Author");
        cy.get("td").eq(2).should("contain.text", "Edited Desc");
      });
  });

  it("removes a book via the remove action and updates indices", () => {
    cy.get("table tbody tr").then(($rows) => {
      const before = $rows.length;
      const firstTitle = $rows.eq(0).find("td").eq(0).text();
      cy.wrap($rows)
        .first()
        .within(() => {
          cy.get("button.icon-button").eq(1).click();
        });
      cy.get("table tbody tr").should("have.length", before - 1);
      cy.contains("table tbody td", firstTitle).should("not.exist");
      // First row index cell should be 1
      cy.get("table tbody tr")
        .first()
        .find("th.row")
        .should("contain.text", "1");
    });
  });
});
