// These tests validate public asset and file paths by requesting them via HTTP.
// They enforce folder and file names remain unchanged.

const pathsMustExist = [
  "/assets/icons/github.svg",
  "/assets/icons/edit.svg",
  "/assets/icons/remove.svg",
  "/assets/fonts/codective/regular.ttf",
  "/assets/fonts/codective/italic.ttf",
  "/assets/fonts/codective/bold.ttf",
  "/assets/fonts/codective/bold-italic.ttf",
  "/src/scripts/master.js",
  "/src/scripts/data.js",
  "/src/scripts/book.js",
  "/src/scripts/library-manager.js",
  "/src/styles/globals.css",
  "/src/styles/shared/colors.css",
  "/src/styles/shared/shapes.css",
  "/src/styles/shared/fonts.css",
  "/src/styles/components/button.css",
  "/src/styles/components/link-button.css",
  "/src/styles/components/icon-button.css",
  "/src/styles/components/header.css",
  "/src/styles/components/form.css",
  "/src/styles/components/table.css",
  "/src/styles/components/footer.css",
];

describe("Filesystem and paths integrity", () => {
  before(() => {
    cy.visit("/");
  });

  it("keeps the expected folder/file structure accessible via HTTP", () => {
    cy.wrap(pathsMustExist).each((p) => {
      cy.request(p).its("status").should("eq", 200);
    });
  });

  it("references images with exact src and alt values in the DOM", () => {
    // GitHub icon
    cy.get("header a.link-button .icon")
      .should("have.attr", "src", "/assets/icons/github.svg")
      .and("have.attr", "alt", "");

    // First row action icons
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get(".actions .icon-button img.icon")
          .eq(0)
          .should("have.attr", "src", "/assets/icons/edit.svg")
          .and("have.attr", "alt", "Edit Icon");
        cy.get(".actions .icon-button img.icon")
          .eq(1)
          .should("have.attr", "src", "/assets/icons/remove.svg")
          .and("have.attr", "alt", "Remove Icon");
      });
  });
});
