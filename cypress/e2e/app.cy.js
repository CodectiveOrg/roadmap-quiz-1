// End-to-end tests to validate HTML structure and JS logic (CSS assertions moved to css.cy.js)

describe("Library Management System", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads page with correct basic structure", () => {
    cy.document().its("contentType").should("eq", "text/html");
    cy.get("head title").contains("Library Management System");
    cy.get("header .logo").should("contain.text", "Library Management System");
    cy.get("main form").should("exist");
    cy.get("main table").should("exist");
    cy.get("table thead tr th").should("have.length", 5);
    cy.get("footer").should("contain.text", "codective.ir");
  });

  // Note: CSS-related assertions live in css.cy.js

  it("renders initial books in table from JS", () => {
    // Ensure rows are generated from JS initialBooks (3 rows)
    cy.get("table tbody tr").should("have.length.at.least", 3);

    // Validate some known titles
    cy.contains("table tbody td", "Frontend Roadmap").should("exist");
    cy.contains("table tbody td", "Refactoring UI").should("exist");
    cy.contains("table tbody td", "Clean Code").should("exist");
  });

  it("adds a new book via form submission", () => {
    cy.get("form input[name='title']").type("JavaScript Ninja");
    cy.get("form input[name='author']").type("John Doe");
    cy.get("form textarea[name='description']").type("Advanced JS tips");
    cy.get("form button[type='submit']").click();

    cy.get("table tbody tr").should("have.length.at.least", 4);
    cy.contains("table tbody td", "JavaScript Ninja").should("exist");
    cy.contains("table tbody td", "John Doe").should("exist");
    cy.contains("table tbody td", "Advanced JS tips").should("exist");
  });

  it("edits a book via the edit action", () => {
    // Click first edit icon-button
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button.icon-button").first().click();
      });

    // Form should be populated; change values
    cy.get("form input[name='title']").invoke("val").should("match", /.+/);
    cy.get("form input[name='title']").clear().type("Edited Title");
    cy.get("form input[name='author']").clear().type("Edited Author");
    cy.get("form textarea[name='description']")
      .clear()
      .type("Edited Description");
    cy.get("form button[type='submit']").click();

    // First row should reflect edits after submit
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("td").eq(0).should("contain.text", "Edited Title");
        cy.get("td").eq(1).should("contain.text", "Edited Author");
        cy.get("td").eq(2).should("contain.text", "Edited Description");
      });
  });

  it("removes a book via the remove action", () => {
    cy.get("table tbody tr").then(($rows) => {
      const before = $rows.length;
      cy.wrap($rows)
        .first()
        .within(() => {
          cy.get("button.icon-button").eq(1).click();
        });
      cy.get("table tbody tr").should("have.length", before - 1);
    });
  });
});
