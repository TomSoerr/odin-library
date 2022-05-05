/* eslint-disable no-param-reassign */
const content = document.getElementById('content');
const btnPopupForm = document.getElementById('add');
const overlayPopupForm = document.getElementById('add-overlay');
const btnCancelBook = document.getElementById('cancel-book');
const input = {
  title: document.getElementById('book-title'),
  author: document.getElementById('book-author'),
  pages: document.getElementById('book-pages'),
  checkbox: document.getElementById('book-read'),
};
const btnAddBook = document.getElementById('add-book');
const myLibrary = [];

const Book = function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

const addBookToLibrary = function addBookToLibrary(book) {
  myLibrary.push(book);
};

const buildLibraryOnPage = function buildLibrary() {
  // clear content for new build
  document.querySelectorAll('.book').forEach((book) => book.remove());
  document.querySelectorAll('#content hr:not(:first-of-type)').forEach(
    (hr) => hr.remove(),
  );
  const addBookToPage = function addBook(read, title, author, pages) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = read;
    const pTitle = document.createElement('p');
    pTitle.textContent = title;
    const pAuthor = document.createElement('p');
    pAuthor.textContent = author;
    const pPages = document.createElement('p');
    pPages.textContent = pages;
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Delete';

    const div = document.createElement('div');
    div.classList.add('book');
    div.append(checkbox, pTitle, pAuthor, pPages, btnDel);

    const hr = document.createElement('hr');
    content.append(div, hr);
  };

  myLibrary.forEach((book) => {
    addBookToPage(book.read, book.title, book.author, book.pages);
  });
};

// add example books to library

addBookToLibrary(
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
);
addBookToLibrary(
  new Book('The Catcher in the Rye', 'J.D. Salinger', 220, false),
);

buildLibraryOnPage();

btnPopupForm.addEventListener('click', () => {
  overlayPopupForm.style.display = 'grid';
});

btnCancelBook.addEventListener('click', () => {
  overlayPopupForm.style.display = null;
});

btnAddBook.addEventListener('click', () => {
  if (!input.title.value) {
    input.title.placeholder = 'Please enter title';
  } else if (!input.author.value) {
    input.author.placeholder = 'Please enter author';
  } else if (!input.pages.value) {
    input.pages.placeholder = 'Please enter pages';
  } else if (Number.isNaN(input.pages.value)) {
    input.pages.placeholder = 'Please enter number';
  } else if (input.pages.value < 0) {
    input.pages.placeholder = 'Please enter positive number';
  } else {
    const book = new Book(
      input.title.value,
      input.author.value,
      input.pages.value,
      input.checkbox.checked,
    );
    addBookToLibrary(book);
    buildLibraryOnPage();
    Object.values(input).forEach((x) => {
      if (x !== input.checkbox) {
        x.value = '';
        x.placeholder = '';
      } else {
        x.checked = false;
      }
    });
    overlayPopupForm.style.display = null;
  }
});
