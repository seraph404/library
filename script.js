const myLibrary = [];

class Book {
  constructor(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  toggleRead() {
    this.haveRead = !this.haveRead;
  }
}
function addBookToLibrary(title, author, pages, haveRead) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, haveRead);
  myLibrary.push(book);
}

function displayBooks() {
  const booksDiv = document.querySelector("#books > tbody");
  booksDiv.textContent = ""; // clear table first

  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");
    tr.setAttribute("id", book.id);

    // create table cells
    const createCell = (content) => {
      const td = document.createElement("td");
      td.textContent = content;
      return td;
    };
    // add book info to row
    tr.appendChild(createCell(book.title));
    tr.appendChild(createCell(book.author));
    tr.appendChild(createCell(book.pages));
    if (book.haveRead === true) {
      tr.appendChild(createCell("Yes"));
    } else {
      tr.appendChild(createCell("No"));
    }

    // add delete button
    const deleteLink = document.createElement("a");
    deleteLink.textContent = "❌";
    deleteLink.classList.add("delete-btn");
    deleteLink.setAttribute("href", "#");

    // add read button
    const readBtn = document.createElement("button");
    readBtn.textContent = "Mark read";
    readBtn.classList.add("read-btn");

    // append read button
    const readCell = document.createElement("td");
    readCell.appendChild(readBtn);
    tr.appendChild(readCell);

    // append delete button
    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteLink);
    tr.appendChild(deleteCell);

    booksDiv.append(tr);
  });
}

const newBookBtn = document.querySelector("#new-book-btn");
const newBookDialog = document.querySelector("#new-book");

newBookBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});

function submitNewBook(e) {
  e.preventDefault();
  const form = e.target;

  const title = form.title.value;
  const author = form.author.value;
  const pages = form.pages.value;

  const haveReadValue = form.haveRead.value;
  const haveRead = haveReadValue === "true";

  addBookToLibrary(title, author, pages, haveRead);

  displayBooks();

  form.reset();
  newBookDialog.close();
}

function deleteBook(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayBooks();
}

document.querySelector("#cancel-btn").addEventListener("click", (e) => {
  document.querySelector("#book-form").reset();
  newBookDialog.close();
});

document.querySelector("#book-form").addEventListener("submit", submitNewBook);

const deleteBookBtn = document.querySelectorAll(".delete-btn");
deleteBookBtn.forEach((button) => {
  console.log("hi");
});

document.querySelector("#books > tbody").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.preventDefault();
    const bookId = e.target.closest("tr").id;
    deleteBook(bookId);
  } else if (e.target.classList.contains("read-btn")) {
    const bookId = e.target.closest("tr").id;
    const book = myLibrary.find((book) => book.id === bookId);
    if (book) {
      book.toggleRead();
      displayBooks();
    }
  }
});

// create some books for array
addBookToLibrary("The Hobbit", "JRR Tolkien", 300, true);
addBookToLibrary("The House of the Spirits", "Isabelle Allende", 488, true);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 460, false);

displayBooks();
