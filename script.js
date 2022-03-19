/* ============
data structures
============ */

let myLibrary = [];

function Book(
  title = 'Unknown',
  author = 'Unknown',
  pages = 0,
  read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(newBook) {
  // let newBook = {
  //   title: title,
  //   author: author,
  //   pages: pages,
  //   read: read
  // }
  myLibrary.push(newBook);
  myLibrary.sort(sortLibrary);
}

function sortLibrary(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;
  return 0;
}

function removeBook(title) {
  myLibrary = myLibrary.filter((book) => book.title !== title)
}

function isInLibrary(newBook) {
  return myLibrary.some((Book) => Book.title == newBook.title)
}

function isRead(book) {
  if (this.read) return this.read = false;
  return this.read = true;
}

function getBook(title) {
  return this.myLibrary.some((book) => book.title === title);
}

/* ==
UI/UX
== */

//DOM Elements
const libraryTable = document.getElementById('library-table-body');
const addBookButton = document.getElementById('add-book-button');
const modal = document.querySelector('.modal');
const addBookModal = document.getElementById('add-book-modal');
const addBookForm = document.getElementById('add-book-form');
const errorMessageAddBook = document.getElementById('add-book-error-message');

//Functions
const toggleAddBookModal = () => {
  addBookModal.classList.toggle('active');
  modal.classList.toggle('active');
  errorMessageAddBook.classList.remove('active');
  addBookForm.reset();
}

const updateLibraryTable = () => {
  libraryTable.innerHTML = '';
  for (let Book of myLibrary) {
    addBookRow(Book);
  }
}

const addBookRow = (Book) => {
  const row = document.createElement('tr');
  const title = document.createElement('td');
  const author = document.createElement('td');
  const pages = document.createElement('td');
  const readButtonCell = document.createElement('td');
  const readButton = document.createElement('button');
  const removeButtonCell = document.createElement('td');
  const removeButton = document.createElement('button');

  title.textContent = `${Book.title}`;
  author.textContent = `${Book.author}`;
  pages.textContent = `${Book.pages} pages`;
  
  if (Book.read) {
    readButton.textContent = 'Read';
  } else {
    readButton.textContent = 'Not read';
  }

  removeButton.classList.add('material-icons');
  removeButton.textContent = 'delete_forever';

  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(pages);

  readButtonCell.appendChild(readButton);
  row.appendChild(readButtonCell);

  removeButtonCell.appendChild(removeButton);
  row.appendChild(removeButtonCell);

  removeButton.addEventListener('click', (e) => {
    let row = e.target.parentNode.parentNode.cells[0].textContent;
    removeBook(row);
    myLibrary.sort(sortLibrary);
    updateLibraryTable();
  });

  readButton.addEventListener('click', (e) => {
    let row = e.target.parentNode.parentNode.cells[0].textContent;
    let readStatus = myLibrary.find(e => e.title == row);

    if (readStatus.read) {
      readButton.textContent = 'Unread';
      myLibrary.find(e => e.title == row).read = false;
    } else {
    readButton.textContent = 'Read';
    myLibrary.find(e => e.title == row).read = true;
    }
  });

  libraryTable.appendChild(row);
}

const addBook = (e) => {
  e.preventDefault()
  const newBook = getBookFromForm()

  if (isInLibrary(newBook)) {
    errorMessageAddBook.textContent = 'You already have this book';
    errorMessageAddBook.classList.add('active');
    return;
  }

  addBookToLibrary(newBook);
  updateLibraryTable();
  toggleAddBookModal();
}

const getBookFromForm = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new Book(title, author, pages, read);
}

addBookForm.onsubmit = addBook;
addBookButton.addEventListener('click', toggleAddBookModal);

//Closes open modal if user clicks outside of it
window.addEventListener('click', function(e) {
  if(e.target == modal) {
    modal.classList.toggle('active');
    addBookModal.classList.toggle('active');
  }
});
window.addEventListener('touchend', function(e) {
  if(e.target == modal) {
    modal.classList.toggle('active');
    addBookModal.classList.toggle('active');
  }
});




/* ==========
local storage
========== */


//testing book entries
myLibrary.push(new Book('A Feast for Crows', 'Lincoln/Child', 350, true));
myLibrary.push(new Book('American Gods', 'Neil Gaiman', 600, true));
myLibrary.push(new Book('The Naked God', 'Peter Hamilton', 1200, true));
myLibrary.sort(sortLibrary);
updateLibraryTable();