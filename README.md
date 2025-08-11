### Roadmap Quiz 1 — Build the Library Management System ✅

Welcome! Your goal is to rebuild the UI and logic so that all automated tests pass locally and in CI. You’ll start from a minimal starter and must implement the full structure, styling, and logic exactly as specified below.

Use this guide carefully. It tells you exactly what to build, where to put files, how to style things, and how to verify your solution.

### What you get in the starter

- `index.html` with a minimal skeleton and one example table row
- `assets/` containing fonts and icons
- `src/scripts/master.js` and `src/scripts/data.js`, plus a script link to `master.js` in `index.html`
- Test setup (Cypress + `package.json`) so you can run tests locally
- `.gitignore` (ignore it)
- A screenshot of the final UI (will be added later)

Everything else you must create.

### How your submission is graded

- Automated Cypress tests run locally and on GitHub pull requests.
- Tests verify:
  - HTML structure and semantics
  - CSS design tokens and usage, including computed visuals
  - JS logic for listing, adding, editing, and removing books
  - Files/folders and asset paths
- The layout method (flex vs grid) doesn’t matter. Visual outcome, naming, and structure do.

### Project structure you must create

Use these exact paths and names. Tests rely on them.

```
assets/
  icons/
    edit.svg
    remove.svg
    github.svg
  fonts/
    codective/
      regular.ttf
      italic.ttf
      bold.ttf
      bold-italic.ttf
src/
  scripts/
    book.js
    library-manager.js
    data.js      # provided
    master.js    # provided
  styles/
    globals.css
    shared/
      colors.css
      fonts.css
      shapes.css
    components/
      button.css
      link-button.css
      icon-button.css
      header.css
      form.css
      table.css
      footer.css
```

Do not rename or move these files. Tests also request these resources over HTTP to ensure they exist and are linked.

### HTML requirements

Implement the following in `index.html`:

- Document setup
  - DOCTYPE present
  - `<html lang="en">`
  - `<meta charset="UTF-8">` and `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
  - `<title>Library Management System</title>`

- Load styles with exact hrefs (order doesn’t matter; names and paths do):
  - `/src/styles/globals.css`
  - `/src/styles/shared/colors.css`
  - `/src/styles/shared/shapes.css`
  - `/src/styles/shared/fonts.css`
  - `/src/styles/components/button.css`
  - `/src/styles/components/link-button.css`
  - `/src/styles/components/icon-button.css`
  - `/src/styles/components/header.css`
  - `/src/styles/components/form.css`
  - `/src/styles/components/table.css`
  - `/src/styles/components/footer.css`

- Load JS
  - `<script type="module" src="/src/scripts/master.js"></script>`

- Header
  - A `<header>` with `<h1 class="logo">Library Management System</h1>`
  - A GitHub link: `<a class="link-button" href="...github.com...">`
    - Contains an `<img class="icon" src="/assets/icons/github.svg" alt="">`
    - Contains the text “GitHub”

- Main: Form + Table
  - A `<form>` with:
    - Title field: `<label for="title">Title</label>` + `<input id="title" name="title" required>`
    - Author field: `<label for="author">Author</label>` + `<input id="author" name="author" autocomplete="name" required>`
    - Description field: `<label for="description">Description</label>` + `<textarea id="description" name="description" minlength="3" required></textarea>`
    - Actions: `<div class="actions">`
      - `<button class="button" type="reset">Cancel</button>`
      - `<button class="button" type="submit">Submit</button>`
  - A `<table>` with:
    - `<thead><tr>` containing these exact headers in order:
      - Row, Title, Author, Description, Actions
    - `<tbody>` is filled by JavaScript from `initialBooks`

- Footer
  - `<footer>` contains “codective.ir” somewhere in the text

Note:
- The table’s data cells should have a `title` attribute equal to their text content. This is handled by `master.js` when rendering.

### CSS requirements

- Design tokens in `:root` with exact names and HSL values in `/src/styles/shared/colors.css`:

```css
:root {
  --color-gray-1: hsl(0, 0%, 100%);
  --color-gray-3: hsl(0, 0%, 96%);
  --color-gray-5: hsl(0, 0%, 85%);
  --color-gray-10: hsl(0, 0%, 15%);

  --color-blue-1: hsl(199, 100%, 95%);
  --color-blue-6: hsl(209, 100%, 55%);
  --color-blue-7: hsl(211, 92%, 44%);

  --color-red-6: hsl(357, 91%, 55%);
}
```

- Shapes in `/src/styles/shared/shapes.css`:

```css
:root {
  --border-radius: 0.5rem;
}
```

- Fonts in `/src/styles/shared/fonts.css`:

```css
@font-face {
  font-family: Codective;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/fonts/codective/regular.ttf");
}
@font-face {
  font-family: Codective;
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/fonts/codective/italic.ttf");
}
@font-face {
  font-family: Codective;
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/assets/fonts/codective/bold.ttf");
}
@font-face {
  font-family: Codective;
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url("/assets/fonts/codective/bold-italic.ttf");
}

html {
  font-family: Codective, sans-serif;
}
```

- Variable usage rule (critical):
  - In component CSS (`button.css`, `link-button.css`, `icon-button.css`, `header.css`, `form.css`, `table.css`, `footer.css`, `globals.css`), any color-bearing property must use CSS variables:
    - `color`, `background-color`, `border-color`, `outline-color`
  - Do NOT use raw color values (hex, rgb, hsl) in component rules. Only values in `:root` are allowed to use HSL.
  - Allowed keywords for these props: `transparent`, `currentColor`, `inherit`, `initial`, `unset`.

- Visual outcomes to match:
  - Body text and background must compute to:
    - body background: `rgb(255, 255, 255)` (var(--color-gray-1))
    - body color: `rgb(38, 38, 38)` (var(--color-gray-10))
  - Table header background computes to light gray (`rgb(245, 245, 245)`, var(--color-gray-3))
  - Buttons should look clickable; hover should shift to a different blue (use `var(--color-blue-6)` and `var(--color-blue-7)`)
  - Layout specifics (flex vs grid) are not enforced; spacing, padding, font sizing, and alignment should match the screenshot visually.

Tip:
- Keep a clean separation: globals in `globals.css`, tokens in `shared/*`, component-specific styles in `components/*`.

### JavaScript requirements

- You are given:
  - `src/scripts/master.js` — wires up the UI and handles DOM rendering and events
  - `src/scripts/data.js` — exports `initialBooks` as an array of Book instances
- You must implement:

`src/scripts/book.js`
```js
export class Book {
  title;
  author;
  description;

  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.description = description;
  }

  clone() {
    return new Book(this.title, this.author, this.description);
  }
}
```

`src/scripts/library-manager.js`
```js
export class LibraryManager {
  #books;

  constructor(books) {
    this.#books = books.map((book) => book.clone());
  }

  get books() {
    return this.#books;
  }

  addBook(book) {
    this.#books.push(book);
  }

  editBook(row, book) {
    this.#books[row - 1] = book;
  }

  removeBook(row) {
    this.#books.splice(row - 1, 1);
  }

  clone() {
    return new LibraryManager(this.#books);
  }
}
```

- Behavior that must work end-to-end:
  - On load: table renders the initial books (at least 3 rows) from `initialBooks`
  - Add: submitting the form appends a new row
  - Edit: clicking the first icon-button in a row (Edit) loads values into the form and submitting saves them back into the table
  - Remove: clicking the second icon-button removes that row and reindexes the Row column starting at 1
  - The action buttons must have the correct icons and alts:
    - Edit: src `/assets/icons/edit.svg`, alt `Edit Icon`
    - Remove: src `/assets/icons/remove.svg`, alt `Remove Icon`

### How to run and test locally

- Install dependencies:
  - `npm install`
- Start tests (headless):
  - `npm test`
- Open Cypress (optional):
  - `npx cypress open`
- The tests will:
  - Serve your app locally
  - Run end-to-end tests in Electron headless

### CI on GitHub (automatic)

- When you open a pull request, GitHub Actions run the same Cypress tests automatically.
- Make sure your branch includes all required files and exact paths so CI can fetch them.

### Passing checklist ✅

- HTML
  - DOCTYPE + `lang="en"`
  - Title exactly “Library Management System”
  - All stylesheet links with exact hrefs (see list above)
  - Script: `<script type="module" src="/src/scripts/master.js">`
  - Header with `.logo`, GitHub link with icon and text “GitHub”
  - Form fields with labels, names, validation attributes, and actions
  - Table headers: Row, Title, Author, Description, Actions (in this order)
  - Footer contains “codective.ir”

- CSS
  - Colors declared in `:root` via HSL with exact variable names (no other formats for tokens)
  - Border radius variable present: `--border-radius: 0.5rem`
  - Font-face sources point to `assets/fonts/codective/...`
  - Global font-family: `Codective, sans-serif`
  - In components, use only `var(...)` for color/outline/border colors; no hard-coded colors
  - Visuals match: body colors, table head bg, button hover, spacing

- JS behavior
  - `Book` and `LibraryManager` implemented exactly as above
  - Add/Edit/Remove work; indices reflow to start at 1
  - Image src and alt texts match exactly for action buttons

- Files and structure
  - All files exist at exact paths
  - Do not rename or move files/folders

### Troubleshooting 🧩

- Color-related test fails
  - Check component CSS for raw hex/rgb/hsl values. Replace with `var(--...)`
  - Only tokens in `:root` should contain HSL color values
- Missing asset/path test
  - Confirm all required files exist and are linked in `<head>`
- Header icon or alt failure
  - Ensure header anchor contains `<img class="icon" src="/assets/icons/github.svg" alt="">` and the text “GitHub”
- Row index test fails after removing
  - Ensure `removeBook(row)` removes correctly and table re-renders

### Submission tips

- Keep naming consistent with this guide
- Use Prettier to keep formatting clean
- Run tests locally before pushing
- Once everything is green locally, open a PR to trigger CI

Good luck! You’ve got this 🚀
