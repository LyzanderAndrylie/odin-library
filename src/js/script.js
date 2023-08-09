const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function getBookInfo() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "has been read" : "not read yet"
  }`;
};

Book.prototype.toggleStatus = function changeBookStatus() {
  this.read = !this.read;
};

function createBookCardComponent(book) {
  const bookCardHtml = `
  <article
      class="book-card grid w-64 grid-cols-2 grid-rows-[auto_1fr_auto] gap-4 rounded-xl border border-tussock-400 bg-tussock-50 p-4">
      <hgroup class="col-span-2">
        <h1 class="text-center text-xl font-bold"></h1>
        <p class="text-center font-bold"></p>
      </hgroup>
      <div class="text-center">
        <svg class="mx-auto mb-2 block w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>book-open-page-variant-outline</title>
          <path
            d="M19 1L14 6V17L19 12.5V1M21 5V18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5M10 18.41C8.75 18.09 7.5 18 6.5 18C5.44 18 4.18 18.19 3 18.5V7.13C3.91 6.73 5.14 6.5 6.5 6.5C7.86 6.5 9.09 6.73 10 7.13V18.41Z" />
        </svg>
        <p class="text-sm">
          Total Pages:<br />
          <span class="book-total-pages"></span>
        </p>
      </div>
      <div class="text-center">
        <svg class="mx-auto mb-2 block w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>read</title>
          <path
            d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" />
        </svg>
        <p class="text-sm">
          Read Status:<br />
          <span class="book-read-status inline-block w-full rounded-xl p-1 text-white">
            <button class="rounded-full border border-white"></button>
          </span>
        </p>
      </div>
      <button class="toggle-btn rounded-xl bg-tussock-500 p-2 text-white hover:bg-tussock-600 active:bg-tussock-700"
        type="button">
        Toggle Status
      </button>
      <button
        class="delete-btn rounded-xl border bg-white border-tussock-700 p-1 text-tussock-700 hover:bg-tussock-50 active:bg-tussock-100"
        type="button">
        Delete Book
      </button>
    </article>
  `;

  const template = document.createElement("template");
  template.innerHTML = bookCardHtml;

  // Set the content of the book
  const h1 = template.content.querySelector(".book-card > hgroup > h1");
  h1.textContent = book.title;

  const p = template.content.querySelector(".book-card > hgroup > p");
  p.textContent = `By: ${book.author}`;

  const totalPagesSpan = template.content.querySelector(".book-total-pages");
  totalPagesSpan.textContent = book.pages;

  const readStatusSpan = template.content.querySelector(".book-read-status");
  readStatusSpan.textContent = book.read ? "Done" : "Not Done";
  readStatusSpan.classList.add(book.read ? "bg-emerald-600" : "bg-red-600");

  // Set toggle and delete buttons
  const bookIndex = myLibrary.indexOf(book);

  const toggleButton = template.content.querySelector(".toggle-btn");
  toggleButton?.addEventListener("click", () => {
    book.read = !book.read;
    readStatusSpan.textContent = book.read ? "Done" : "Not Done";
    readStatusSpan.classList.remove("bg-emerald-600");
    readStatusSpan.classList.remove("bg-red-600");
    readStatusSpan.classList.add(book.read ? "bg-emerald-600" : "bg-red-600");
  });

  const deleteButton = template.content.querySelector(".delete-btn");
  deleteButton?.addEventListener("click", () => {
    removeBook(bookIndex);
  });

  return template.content.firstElementChild;
}

function removeDisplayAllBooks() {
  const main = document.querySelector("main");
  main.innerHTML = "";
}

function displayAllBooks() {
  const main = document.querySelector("main");

  myLibrary.forEach((book) => {
    const bookCard = createBookCardComponent(book);
    main?.appendChild(bookCard);
  });
}

function refreshDisplayBook() {
  removeDisplayAllBooks();
  displayAllBooks();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function addBook(book) {
  addBookToLibrary(book);
  refreshDisplayBook();
}

function removeBook(bookIndex) {
  removeBookFromLibrary(bookIndex);
  refreshDisplayBook();
}

function createBookFromForm(form) {
  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read") === "done";

  return new Book(title, author, pages, read);
}

function setAddBookModal() {
  const addBookButton = document.getElementById("add-book-btn");
  const addBookDialog = document.getElementById("add-book-dialog");

  addBookButton?.addEventListener("click", () => {
    addBookDialog?.showModal();
  });

  addBookDialog?.addEventListener("click", (e) => {
    const dialogDimensions = addBookDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      addBookDialog.close();
    }
  });
}

function setAddBookForm() {
  const addBookForm = document.getElementById("add-book-form");
  const addBookDialog = document.getElementById("add-book-dialog");

  addBookForm?.addEventListener("submit", (e) => {
    const formMethod = e.submitter?.getAttribute("formmethod");
    if (formMethod === "dialog") return;

    e.preventDefault();
    const newBook = createBookFromForm(addBookForm);
    addBook(newBook);

    addBookForm.reset();
    addBookDialog.close();
  });
}

function initBook() {
  const readBook = new Book("The Title", "Author", 100, true);
  const notReadBook = new Book("The Title", "Author", 100, false);

  addBook(readBook);
  addBook(notReadBook);
}

function main() {
  setAddBookModal();
  setAddBookForm();
  initBook();
}

main();
