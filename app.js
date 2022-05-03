const content = document.getElementById('content');
let myLibrary = [];

const Book = function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

const addBookToLibrary = function addBookToLibrary(book) {
  myLibrary.push(book);
};


// for (let x = 0; x < 3; x++) {
//   const div = document.createElement('div');
//   div.classList.add('card');

//   content.appendChild(div);
// }
