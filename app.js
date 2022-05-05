const content = document.getElementById('content');
const listHeader = {
  read: document.getElementById('read'),
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  pages: document.getElementById('pages'),
  added: document.getElementById('added'),
};
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
let sortBy = ['added', 'desc']; // read, title, author, pages, added || asc and desc

// book constructor
const Book = function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = idCounter;
  idCounter += 1;
};

// sort myLibrary
const sortLibrary = function sortLibrary() {
  if (sortBy[0] === 'added') { // ascending
    myLibrary.sort((a, b) => b.id - a.id);
  } else if (sortBy[0] === 'pages') {
    myLibrary.sort((a, b) => a.pages - b.pages);
  } else if (sortBy[0] === 'author') {
    myLibrary.sort((a, b) => (
      (a.author.toLowerCase() > b.author.toLowerCase()) ? 1 : -1
    ));
  } else if (sortBy[0] === 'title') {
    myLibrary.sort((a, b) => (
      (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1
    ));
  } else if (sortBy[0] === 'read') {
    // for the case that all book are read
    // let allTheSame = true;
    // myLibrary.reduce((previous, current) => {
    //   if (current.read !== previous) allTheSame = false;
    //   return current.read;
    // });
    ///////////
    myLibrary.sort((a, b) => ((a.read > b.read) ? -1 : 1));
  }
  if (sortBy[1] === 'desc') myLibrary.reverse();
};

// remove all checked classes
const rmvAll = function removeAllCheckedClasses(id) {
  document.querySelectorAll('#content label + button').forEach((btn) => {
    if (btn.id !== id) btn.className = '';
  });
};

// display library if something changed
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
      sortLibrary();
      displayLibrary();
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

// sort list header
Object.values(listHeader).forEach((header) => {
  header.addEventListener('click', (e) => {
    rmvAll(e.target.id);
    if (!e.target.classList.value) {
      e.target.className = 'checked-1';
      sortBy = [e.target.id, 'desc'];
    } else if (e.target.className === 'checked-1') {
      e.target.className = 'checked-2';
      sortBy = [e.target.id, 'asc'];
    } else if (e.target.className === 'checked-2') {
      e.target.className = 'checked-1';
      sortBy = [e.target.id, 'desc'];
    } else {
      console.error('error');
    }
    sortLibrary();
    displayLibrary();
  });
});

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
