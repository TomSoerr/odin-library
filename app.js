const content = document.getElementById('content');
const popup = {
  showBtn: document.getElementById('show'),
  overlay: document.getElementById('overlay'),
  closeBtn: document.getElementById('close'),
  addBtn: document.getElementById('add'),
  input: {
    title: document.getElementById('book-title'),
    author: document.getElementById('book-author'),
    pages: document.getElementById('book-pages'),
    checkbox: document.getElementById('book-read'),
  },
};
let idCounter = 0;
let myLibrary = [];

const Book = function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = idCounter;
  idCounter += 1;
};

const displayLibrary = function displayLibraryOnPage() {
  // clear content for new build
  document.querySelectorAll('.book').forEach((book) => book.remove());
  document.querySelectorAll('#content hr:not(:first-of-type)').forEach(
    (hr) => hr.remove(),
  );

  // loop through myLibrary and display each book
  myLibrary.forEach((book) => {
    const div = document.createElement('div');
    div.classList.add('book');
    div.id = book.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = book.read;
    const pTitle = document.createElement('p');
    pTitle.textContent = book.title;
    const pAuthor = document.createElement('p');
    pAuthor.textContent = book.author;
    const pPages = document.createElement('p');
    pPages.textContent = book.pages;
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Delete';

    div.append(checkbox, pTitle, pAuthor, pPages, btnDel);
    const hr = document.createElement('hr');
    content.append(div, hr);
  });

  // checkbox listener
  const readCheckbox = [...document.querySelectorAll('.book input')];
  readCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      myLibrary = myLibrary.map((book) => {
        if (book.id === Number(e.target.parentNode.id)) {
          book.read = e.target.checked;
        }
        return book;
      });
    });
  });

  // delete book button listener
  const deleteBtn = [...document.querySelectorAll('.book button')];
  deleteBtn.forEach((btn) => btn.addEventListener('click', (e) => {
    myLibrary = myLibrary.filter(
      (book) => book.id !== Number(e.target.parentElement.id),
    );
    displayLibrary();
  }));
};

// add example books to library
myLibrary.push(
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
);
myLibrary.push(
  new Book('The Catcher in the Rye', 'J.D. Salinger', 220, false),
);

displayLibrary();

// add new book to library
popup.showBtn.addEventListener('click', () => {
  popup.overlay.style.display = 'grid';
});

popup.closeBtn.addEventListener('click', () => {
  popup.overlay.style.display = null;
});

popup.addBtn.addEventListener('click', () => {
  let valid = true;
  if (!popup.input.title.value) {
    popup.input.title.parentElement.dataset.msg = 'Please enter a title';
    valid = false;
  } else {
    popup.input.title.parentElement.dataset.msg = '';
  }
  if (!popup.input.author.value) {
    popup.input.author.parentElement.dataset.msg = 'Please enter a author';
    valid = false;
  } else {
    popup.input.author.parentElement.dataset.msg = '';
  }
  if (!popup.input.pages.value) {
    popup.input.pages.parentElement.dataset.msg = 'Please enter a page number';
    valid = false;
  } else if (isNaN(popup.input.pages.value)) {
    popup.input.pages.parentElement.dataset.msg = 'Please enter valid number';
    valid = false;
  } else if (popup.input.pages.value < 0) {
    popup.input.pages.parentElement.dataset.msg = 'Please enter positive number';
    valid = false;
  } else {
    popup.input.pages.parentElement.dataset.msg = '';
  }
  if (valid) {
    const book = new Book(
      popup.input.title.value,
      popup.input.author.value,
      popup.input.pages.value,
      popup.input.checkbox.checked,
    );
    myLibrary.push(book);
    displayLibrary();
    Object.values(popup.input).forEach((x) => {
      if (x !== popup.input.checkbox) {
        x.value = '';
        x.parentElement.dataset.msg = '';
      } else {
        x.checked = false;
      }
    });
    popup.overlay.style.display = null;
  }
});

