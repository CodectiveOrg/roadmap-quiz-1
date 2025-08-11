### Roadmap Quiz 1 — Build the Library Management System ✅

Welcome! Your goal is to rebuild the UI and logic so that all automated tests pass locally and in CI. You’ll start from a minimal starter and must implement the full structure, styling, and logic exactly as specified below.

Use this guide carefully. It tells you exactly what to build, where to put files, how to style things, and how to verify your solution — without giving away the full code.

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

### Required project structure (must match exactly)

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

### HTML requirements (what to build)

- [ ] DOCTYPE present
- [ ] `<html lang="en">`
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
- [ ] `<title>Library Management System</title>`
- [ ] Link all stylesheets (exact hrefs):
  - [ ] `/src/styles/globals.css`
  - [ ] `/src/styles/shared/colors.css`
  - [ ] `/src/styles/shared/shapes.css`
  - [ ] `/src/styles/shared/fonts.css`
  - [ ] `/src/styles/components/button.css`
  - [ ] `/src/styles/components/link-button.css`
  - [ ] `/src/styles/components/icon-button.css`
  - [ ] `/src/styles/components/header.css`
  - [ ] `/src/styles/components/form.css`
  - [ ] `/src/styles/components/table.css`
  - [ ] `/src/styles/components/footer.css`
- [ ] Load JS with `<script type="module" src="/src/scripts/master.js"></script>`
- [ ] Header includes:
  - [ ] `<h1 class="logo">Library Management System</h1>`
  - [ ] GitHub link: `<a class="link-button" href="https://github.com/...">`
    - [ ] Contains `<img class="icon" src="/assets/icons/github.svg" alt="">`
    - [ ] Contains the text `GitHub`
- [ ] Form includes:
  - [ ] Title: `<label for="title">` + `<input id="title" name="title" required>`
  - [ ] Author: `<label for="author">` + `<input id="author" name="author" autocomplete="name" required>`
  - [ ] Description: `<label for="description">` + `<textarea id="description" name="description" minlength="3" required></textarea>`
  - [ ] Actions: `<div class="actions">` with
    - [ ] `<button class="button" type="reset">Cancel</button>`
    - [ ] `<button class="button" type="submit">Submit</button>`
- [ ] Table includes:
  - [ ] `<thead>` headers in order: `Row`, `Title`, `Author`, `Description`, `Actions`
  - [ ] `<tbody>` is populated by JS
  - [ ] For data cells, `title` attribute equals the cell text (actions cell excluded)
- [ ] Footer contains the text `codective.ir`

### CSS requirements (design tokens and usage)

Design tokens — define these in `:root` in `/src/styles/shared/colors.css` using HSL (HSL only):

| Variable name      | Value (HSL only)       |
| ------------------ | ---------------------- |
| `--color-gray-1`   | `hsl(0, 0%, 100%)`     |
| `--color-gray-3`   | `hsl(0, 0%, 96%)`      |
| `--color-gray-5`   | `hsl(0, 0%, 85%)`      |
| `--color-gray-10`  | `hsl(0, 0%, 15%)`      |
| `--color-blue-1`   | `hsl(199, 100%, 95%)`  |
| `--color-blue-6`   | `hsl(209, 100%, 55%)`  |
| `--color-blue-7`   | `hsl(211, 92%, 44%)`   |
| `--color-red-6`    | `hsl(357, 91%, 55%)`   |

Shapes — in `/src/styles/shared/shapes.css`:

- [ ] `--border-radius: 0.5rem`

Fonts — in `/src/styles/shared/fonts.css` (declare 4 @font-face rules that map to the assets below and set the global family):

- [ ] `font-family: Codective` (normal 400) → `/assets/fonts/codective/regular.ttf`
- [ ] `font-family: Codective` (italic 400) → `/assets/fonts/codective/italic.ttf`
- [ ] `font-family: Codective` (normal 700) → `/assets/fonts/codective/bold.ttf`
- [ ] `font-family: Codective` (italic 700) → `/assets/fonts/codective/bold-italic.ttf`
- [ ] `html { font-family: Codective, sans-serif }`

Usage rules — in component styles (`globals.css`, `components/*.css`):

- [ ] For `color`, `background-color`, `border-color`, `outline-color` use only `var(--...)`
- [ ] Do not use raw color values in declarations (no hex, rgb, hsl). Allowed keywords: `transparent`, `currentColor`, `inherit`, `initial`, `unset`

Computed visual outcomes (don’t care how you implement, only the result):

- [ ] Body background computes to `rgb(255, 255, 255)` and text color to `rgb(38, 38, 38)`
- [ ] Header logo font-size is about `1.5rem` (≈24px) and font-weight is bold/700
- [ ] Form actions (`.actions`) have a positive gap between children
- [ ] Table header background computes to `rgb(245, 245, 245)`

### JavaScript requirements (what to implement)

You are given `master.js` (renders UI, wires events) and `data.js` (provides `initialBooks`). You must implement the following modules with the exact names and behaviors. Do not paste large code from elsewhere — write these yourself.

`src/scripts/book.js` — required fields and behavior

- [ ] Class name: `Book`
- [ ] Public fields: `title`, `author`, `description`
- [ ] Constructor accepts `(title, author, description)` and assigns to fields
- [ ] Instance method: `clone()` returns a new `Book` with the same field values

`src/scripts/library-manager.js` — required fields and behavior

- [ ] Class name: `LibraryManager`
- [ ] Private field: `#books`
- [ ] Constructor accepts an array of `Book` and stores a cloned copy (not the same references)
- [ ] Getter: `books` returns the internal array
- [ ] Method: `addBook(book)` appends a book
- [ ] Method: `editBook(row, book)` replaces the book at 1-based index `row`
- [ ] Method: `removeBook(row)` removes the book at 1-based index `row`
- [ ] Method: `clone()` returns a deep copy (new `LibraryManager` with cloned books)

End-to-end behaviors (what must work in the UI):

- [ ] On load, the table shows at least the 3 books from `initialBooks`
- [ ] Submitting the form adds a new row with the provided title/author/description
- [ ] Clicking a row’s first action (Edit) loads that row into the form; submitting saves the changes back to the table
- [ ] Clicking a row’s second action (Remove) deletes the row and the first column reindexes starting at `1`
- [ ] Row actions use exact icons and `alt`:
  - [ ] Edit: `src="/assets/icons/edit.svg"`, `alt="Edit Icon"`
  - [ ] Remove: `src="/assets/icons/remove.svg"`, `alt="Remove Icon"`

### How to run and test locally

- [ ] Install dependencies: `npm install`
- [ ] Run tests (headless): `npm test`
- [ ] Optional: open the runner UI: `npx cypress open`

The tests will start a local server and run end-to-end checks automatically.

### CI on GitHub (automatic)

- When you open a pull request, GitHub Actions run the same Cypress tests automatically.
- Ensure your branch includes all required files and exact paths so CI can fetch them.

### Troubleshooting 🧩

- Color-related test fails
  - Check component CSS for raw hex/rgb/hsl values. Replace with `var(--...)`
  - Only tokens in `:root` should contain HSL color values
- Missing asset/path test
  - Confirm all required files exist and are linked in `<head>`
- Header icon or alt failure
  - Ensure header anchor contains `<img class="icon" src="/assets/icons/github.svg" alt="">` and the text `GitHub`
- Row index test fails after removing
  - Ensure `removeBook(row)` removes correctly and table re-renders

### Submission tips

- Keep naming consistent with this guide
- Use Prettier to keep formatting clean
- Run tests locally before pushing
- Once everything is green locally, open a PR to trigger CI

Good luck! You’ve got this 🚀
