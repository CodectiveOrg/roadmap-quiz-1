import { LibraryManager } from "./library-manager.js";
import { initialBooks } from "./data.js";

class Master {
  #libraryManager = new LibraryManager(initialBooks);
  #bookOfInterestIndex = null;

  init() {
    this.#render();
  }

  #render() {
    this.#renderForm();
    this.#renderTable();
  }

  #renderForm() {
    this.#fillForm();
    this.#addFormEventListeners();
  }

  #fillForm() {
    if (typeof this.#bookOfInterestIndex !== "number") {

      return;
    }

    const book = this.#libraryManager.books[this.#bookOfInterestIndex];

    document.querySelector(`form input[name="title"]`).value = book.title;
    document.querySelector(`form input[name="author"]`).value = book.author;
    document.querySelector(`form textarea`).value = book.description;

  }

  #addFormEventListeners() {
    const form = document.querySelector("form");
    form.onsubmit = (e) => this.#handleFormSubmit(e);
    form.onreset = (e) => this.#handleFormReset(e);
  }


  #handleFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const titleInput = form.querySelector('input[name="title"]');
    const authorInput = form.querySelector('input[name="author"]');
    const descInput  = form.querySelector('textarea');


    [titleInput, authorInput, descInput].forEach(inp => {
      inp.classList.remove('error');
    });

    let hasError = false;

    if (!titleInput.value.trim()) {
      titleInput.classList.add('error');
      hasError = true;
    }
    if (!authorInput.value.trim()) {
      authorInput.classList.add('error');
      hasError = true;
    }
    if (!descInput.value.trim()) {
      descInput.classList.add('error');
      hasError = true;
    }

    if (hasError) return;

    const book = {
      title: titleInput.value.trim(),
      author: authorInput.value.trim(),
      description: descInput.value.trim()
    };

    if (typeof this.#bookOfInterestIndex === 'number') {
      this.#libraryManager.editBook(this.#bookOfInterestIndex + 1, book);
    } else {
      this.#libraryManager.addBook(book);
    }

    form.reset();
    this.#bookOfInterestIndex = null;
    this.#render();
  }

  #handleFormReset() {
    this.#bookOfInterestIndex = null;
  }

  #renderTable() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    this.#libraryManager.books.forEach((book, index) => {
      tbody.append(this.#generateTr(book, index));
    });
  }

  #generateTr(book, index) {
    const tr = document.createElement("tr");

    tr.append(this.#generateCell(index + 1, "th"));
    tr.append(this.#generateCell(book.title));
    tr.append(this.#generateCell(book.author));
    tr.append(this.#generateCell(book.description));
    tr.append(this.#generateCell(this.#generateActions(book, index)));

    return tr;
  }

  #generateCell(content, tag = "td") {
    const cell = document.createElement(tag);
    cell.append(content);
    cell.title = content;
    return cell;
  }

  #generateActions(book, index) {
    const actions = document.createElement("div");
    actions.className = "actions";

    const editAction = this.#generateAction("edit.svg", "Edit Icon", (e) => {
      this.#bookOfInterestIndex = index;
      this.#render();
    });

    const removeAction = this.#generateAction(
      "remove.svg",
      "Remove Icon",
      () => {
        if (this.#bookOfInterestIndex === index) {
          this.#bookOfInterestIndex = null;
          document.querySelector("form").reset();
        } else if (this.#bookOfInterestIndex > index) {
          this.#bookOfInterestIndex--;
        }

        this.#libraryManager.removeBook(index + 1);
        this.#render();
      },
    );

    actions.append(editAction);
    actions.append(removeAction);

    return actions;
  }

  #generateAction(iconSrc, iconAlt, listener) {
    const action = document.createElement("button");
    action.className = "icon-button";

    const icon = document.createElement("img");
    icon.className = "icon";
    icon.src = `/assets/icons/${iconSrc}`;
    icon.alt = iconAlt;
    action.append(icon);

    action.addEventListener("click", listener);

    return action;
  }
}

const master = new Master();
master.init();
