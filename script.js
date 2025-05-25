const myLibrary = [];
const booksDiv = document.querySelector("#books > tbody");

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
  // clear the table, first
  booksDiv.textContent = "";

  function createCell(content) {
    const td = document.createElement("td");
    // handle both text content and DOM elements
    if (
      typeof content === "string" ||
      typeof content === "number" ||
      typeof content === "boolean"
    ) {
      td.textContent = content;
    } else {
      td.appendChild(content);
    }
    return td;
  }

  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");
    tr.setAttribute("id", book.id);

    // delete button stuff
    const deleteLink = document.createElement("a");
    deleteLink.classList.add("delete-btn");
    deleteLink.textContent = "❌";
    deleteLink.setAttribute("href", "#");

    tr.appendChild(createCell(book.title));
    tr.appendChild(createCell(book.author));
    tr.appendChild(createCell(book.pages));
    tr.appendChild(createCell(book.haveRead));
    tr.appendChild(createCell(deleteLink));

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
        if (input.checked) {
          haveRead = input.value === "true";
        }
    }
  });

  addBookToLibrary(title, author, pages, haveRead);
  displayBooks();
  const form = document.querySelector("form");
  form.reset();
  newBookDialog.close();
}

const submitBookBtn = document.querySelector("#submit-book-btn");
submitBookBtn.addEventListener("click", (e) => submitNewBook(e));

const deleteBookBtn = document.querySelectorAll(".delete-btn");
deleteBookBtn.forEach((button) => {
  console.log("hi");
});

function deleteBook(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayBooks();
}

booksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.preventDefault();
    const bookId = e.target.closest("tr").id;
    deleteBook(bookId);
  }
});
