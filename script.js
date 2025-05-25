const myLibrary = [];

function Book(id, title, author, pages, haveRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function () {
    const readStatus = this.haveRead ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  };
}

function addBookToLibrary(title, author, pages, haveRead) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, haveRead);
  myLibrary.push(book);
}

// create some books for array
addBookToLibrary("The Hobbit", "JRR Tolkien", 300, true);
addBookToLibrary("The House of the Spirits", "Isabelle Allende", 488, true);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 460, false);

function displayBooks() {
  const booksDiv = document.querySelector("#books > tbody");

  // clear the table, first
  booksDiv.textContent = "";

  function createCell(content) {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
  }
  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");
    tr.appendChild(createCell(book.title));
    tr.appendChild(createCell(book.author));
    tr.appendChild(createCell(book.pages));
    tr.appendChild(createCell(book.haveRead));
    booksDiv.append(tr);
  });
}

displayBooks();

const newBookBtn = document.querySelector("#new-book-btn");
const newBookDialog = document.querySelector("#new-book");
newBookBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});

function submitNewBook(e) {
  e.preventDefault();
  const inputs = document.querySelectorAll("input");
  let title, author, pages, haveRead;
  inputs.forEach((input) => {
    switch (input.name) {
      case "title":
        title = input.value;
        break;
      case "author":
        author = input.value;
        break;
      case "pages":
        pages = input.value;
        break;
      case "haveRead":
        if (input.checked) haveRead = input.value;
        break;
    }
  });

  addBookToLibrary(title, author, pages, haveRead);
  displayBooks();
}

const submitBookBtn = document.querySelector("#submit-book-btn");
submitBookBtn.addEventListener("click", (e) => submitNewBook(e));
