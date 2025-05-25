function Book(title, author, pages, haveRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function () {
    const readStatus = this.haveRead ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${pages} pages, ${readStatus}`;
  };
}
