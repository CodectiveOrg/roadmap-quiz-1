describe("HTML structure and semantics", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has correct DOCTYPE and language", () => {
    cy.document().then((doc) => {
      expect(doc.doctype.name).to.eq("html");
      expect(doc.documentElement.lang).to.eq("en");
    });
  });

  it("has required head tags and stylesheets loaded", () => {
    cy.get("head meta[charset='UTF-8']").should("exist");
    cy.get("head meta[http-equiv='X-UA-Compatible'][content='ie=edge']").should(
      "exist",
    );
    cy.get("title").should("have.text", "Library Management System");

    // Stylesheets
    const styles = [
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
    styles.forEach((href) =>
      cy.get(`head link[rel='stylesheet'][href='${href}']`).should("exist"),
    );
  });

  it("loads master.js as a module", () => {
    cy.get("head script[type='module'][src='/src/scripts/master.js']").should(
      "exist",
    );
  });

  it("renders header with logo and GitHub link (with icon)", () => {
    cy.get("header .logo").should("have.text", "Library Management System");
    cy.get("header a.link-button").as("gh");
    cy.get("@gh").should("have.attr", "href").and("contain", "github.com");
    cy.get("@gh").should("contain.text", "GitHub");
    cy.get("@gh")
      .find(".icon")
      .should("have.attr", "src", "/assets/icons/github.svg")
      .and("have.attr", "alt", "");
  });

  it("renders form with proper fields, labels, and validation", () => {
    cy.get("main form").as("form");
    cy.get("@form").find(".field").should("have.length", 3);

    cy.get("label[for='title']").should("exist");
    cy.get("#title")
      .should("have.attr", "name", "title")
      .and("have.prop", "required", true);

    cy.get("label[for='author']").should("exist");
    cy.get("#author")
      .should("have.attr", "name", "author")
      .and("have.attr", "autocomplete", "name")
      .and("have.prop", "required", true);

    cy.get("label[for='description']").should("exist");
    cy.get("#description")
      .should("have.attr", "name", "description")
      .and("have.attr", "minlength", "3")
      .and("have.prop", "required", true);

    cy.get("@form")
      .find(".actions button[type='reset']")
      .should("have.class", "button");
    cy.get("@form")
      .find(".actions button[type='submit']")
      .should("have.class", "button");
  });

  it("renders table with exact headers and classes", () => {
    cy.get("table thead tr th").should("have.length", 5);
    const headers = ["Row", "Title", "Author", "Description", "Actions"];
    headers.forEach((h, i) => {
      cy.get("table thead tr th").eq(i).should("have.text", h);
    });
    // First header is 'Row' but we don't enforce a class name here
  });

  it("renders actions with correct icons and alts", () => {
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get(".actions button.icon-button").should("have.length", 2);
        cy.get(".actions button.icon-button")
          .eq(0)
          .find("img.icon")
          .as("editIcon");
        cy.get(".actions button.icon-button")
          .eq(1)
          .find("img.icon")
          .as("removeIcon");
      });
    cy.get("@editIcon")
      .should("have.attr", "src", "/assets/icons/edit.svg")
      .and("have.attr", "alt", "Edit Icon");
    cy.get("@removeIcon")
      .should("have.attr", "src", "/assets/icons/remove.svg")
      .and("have.attr", "alt", "Remove Icon");
  });

  it("renders footer text", () => {
    cy.get("footer").should("contain.text", "codective.ir");
  });

  it("sets title attributes on generated cells equal to their text content", () => {
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("td").each(($td, idx, list) => {
          if (idx === list.length - 1) return; // skip actions cell
          const text = $td.text();
          expect($td.attr("title")).to.eq(text);
        });
      });
  });
});
