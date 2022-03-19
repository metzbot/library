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
  const titleA = a.title.toUpperCase;
  const titleB = b.title.toUpperCase;
  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;
  return 0;
}

function removeBook(title) {
  this.library = this.myLibrary.filter((book) => book.title !== title)
}

function isInLibrary(newBook) {
  return myLibrary.some((newBook) => Book.title === newBook.title)
}

function isRead(book) {
  if (this.read) return this.read = false;
  return this.read = true;
}

function getBook(title) {
  return this.myLibrary.some((book) => book.title === title);
}

//temporary manual books
// addBookToLibrary('The Naked God', 'Peter Hamilton', 600, true);
// addBookToLibrary('A Feast For Crows', 'Lincoln/Child', 300, true);
// addBookToLibrary('American Gods', 'Neil Gaiman', 200, true);

/* ==
UI/UX
== */

//DOM Elements
const libraryTable = document.getElementById('library-table-body');
const addBookButton = document.getElementById('add-book-button');
const modal = document.querySelector('.modal');
const addBookModal = document.getElementById('add-book-modal');
const addBookForm = document.getElementById('add-book-form');

//Functions
const toggleAddBookModal = () => {
  addBookModal.classList.toggle('active');
  modal.classList.toggle('active');
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
  const read = document.createElement('td');
  const readButton = document.createElement('button');

  title.textContent = `${Book.title}`;
  author.textContent = `${Book.author}`;
  pages.textContent = `${Book.pages} pages`;
  
  if (Book.read) {
    readButton.textContent = 'Read';
  } else {
    readButton.textContent = 'Not read';
  }

  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(pages);
  row.appendChild(read);
  read.appendChild(readButton);
  libraryTable.appendChild(row);
}

const addBook = (e) => {
  e.preventDefault()
  const newBook = getBookFromForm()

  if (isInLibrary(newBook)) {
    errorMessage.textContent = 'You already have this book';
    errorMessage.classList.toggle('active');
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




/* ==========
local storage
========== */