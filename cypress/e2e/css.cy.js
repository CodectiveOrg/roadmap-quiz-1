const readCss = (path) =>
  cy.request(path).then((res) => {
    expect(res.status).to.eq(200);
    return res.body;
  });

const expectOnlyVars = (css, props) => {
  props.forEach((prop) => {
    const regex = new RegExp(`${prop}:[^;]*;`, "g");
    const matches = css.match(regex) || [];
    matches.forEach((decl) => {
      // Allowed: var(--...)
      expect(decl).to.match(/:\s*var\(--[a-z0-9-]+\)\s*;/i);
    });
  });
};

const expectHslValues = (css, varNames) => {
  varNames.forEach((name) => {
    const regex = new RegExp(`--${name}:\\s*hsl\\([^)]+\\)\\s*;`, "i");
    expect(css).to.match(regex);
  });
};

describe("CSS design system and usage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("defines color variables in :root using HSL and exact names", () => {
    readCss("/src/styles/shared/colors.css").then((css) => {
      const expected = [
        "color-gray-1",
        "color-gray-3",
        "color-gray-5",
        "color-gray-10",
        "color-blue-1",
        "color-blue-6",
        "color-blue-7",
        "color-red-6",
      ];
      expectHslValues(css, expected);
    });
  });

  it("defines shapes variables (border radius)", () => {
    readCss("/src/styles/shared/shapes.css").then((css) => {
      expect(css).to.match(
        /:root\s*\{[\s\S]*--border-radius:\s*0\.5rem;[\s\S]*\}/,
      );
    });
  });

  it("applies colors via var() in component styles (no raw color literals)", () => {
    const componentSheets = [
      "/src/styles/components/button.css",
      "/src/styles/components/link-button.css",
      "/src/styles/components/icon-button.css",
      "/src/styles/components/header.css",
      "/src/styles/components/form.css",
      "/src/styles/components/table.css",
      "/src/styles/components/footer.css",
      "/src/styles/globals.css",
    ];

    cy.wrap(componentSheets).each((path) => {
      readCss(path).then((css) => {
        // Common color-bearing properties must use CSS vars
        expectOnlyVars(css, [
          "color",
          "background-color",
          "border-color",
          "outline-color",
        ]);

        // Disallow raw hex, rgb, hsl literals except inside var() definitions
        expect(css).to.not.match(/:\s*#([0-9a-f]{3}|[0-9a-f]{6})\b/gi);
        expect(css).to.not.match(/:\s*rgb\s*\(/gi);
        expect(css).to.not.match(/:\s*hsl\s*\(/gi);
      });
    });
  });

  it("uses the correct font-face declarations and font family globally", () => {
    readCss("/src/styles/shared/fonts.css").then((css) => {
      [
        /font-family:\s*Codective;/,
        /src:\s*url\("\/assets\/fonts\/codective\/regular\.ttf"\)/,
        /src:\s*url\("\/assets\/fonts\/codective\/italic\.ttf"\)/,
        /src:\s*url\("\/assets\/fonts\/codective\/bold\.ttf"\)/,
        /src:\s*url\("\/assets\/fonts\/codective\/bold-italic\.ttf"\)/,
      ].forEach((re) => expect(css).to.match(re));
    });

    readCss("/src/styles/globals.css").then((css) => {
      expect(css).to.match(
        /html\s*\{[\s\S]*font-family:\s*Codective,\s*sans-serif;[\s\S]*\}/,
      );
    });
  });

  it("matches key computed style values for layout without enforcing technique", () => {
    // We validate resulting visuals, not whether flex/grid was used.
    // Body
    cy.get("body").then(($el) => {
      const cs = window.getComputedStyle($el[0]);
      expect(cs.backgroundColor).to.eq("rgb(255, 255, 255)");
      expect(cs.color).to.eq("rgb(38, 38, 38)");
      expect(parseFloat(cs.maxInlineSize)).to.be.closeTo(960, 0.5);
      expect(parseFloat(cs.paddingInline)).to.be.greaterThan(0);
    });

    // Header logo font size/weight
    cy.get("header .logo").then(($el) => {
      const cs = window.getComputedStyle($el[0]);
      expect(parseFloat(cs.fontSize)).to.be.closeTo(24, 0.5);
      expect(cs.fontWeight).to.match(/700|bold/);
    });

    // Form grid-like gaps
    cy.get("form .actions").then(($el) => {
      const cs = window.getComputedStyle($el[0]);
      expect(parseFloat(cs.gap || cs.columnGap || 0)).to.be.greaterThan(0);
    });

    // Table header background color
    cy.get("table thead").then(($el) => {
      const cs = window.getComputedStyle($el[0]);
      expect(cs.backgroundColor).to.satisfy((c) =>
        ["rgb(245, 245, 245)", "rgba(245, 245, 245, 1)"].includes(c),
      );
    });
  });
});
