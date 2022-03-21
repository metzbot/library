/* ============
data structures
============ */

let myLibrary = [];
let currentSort = 'title';
let deleteMe = '';

//constructor function for Book objects
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

//pushes new Book objects into library array, then sorts it
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  sortArray(currentSort);
}

//Base sort function, sorts and sets sort-type identifier
function sortArray(sortType) {
  switch (sortType) {
    case 'title':
      myLibrary.sort(sortLibraryTitle);
      currentSort = 'title';
      break;
    case 'titleBackward':
      myLibrary.sort(sortLibraryTitle).reverse();
      currentSort = 'titleBackward';
      break;
    case 'author':
      myLibrary.sort(sortLibraryAuthor);
      currentSort = 'author';
      break;
    case 'authorBackward':
      myLibrary.sort(sortLibraryAuthor).reverse();
      currentSort = 'authorBackward';
      break;
    case 'pages':
      myLibrary.sort(sortLibraryPages);
      currentSort = 'pages';
      break;
    case 'pagesBackward':
      myLibrary.sort(sortLibraryPages).reverse();
      currentSort = 'pagesBackward';
      break;
    case 'read':
      myLibrary.sort(sortLibraryRead);
      currentSort = 'read';
      break;
    default:
      myLibrary.sort(sortLibraryRead).reverse();
      currentSort = 'readBackward';
  }
}

//Sorts library array alphabetically by title properties of Book objects
function sortLibraryTitle(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;
  return 0;
}

//Sorts library array alphabetically by author properties of Book objects
function sortLibraryAuthor(a, b) {
  const authorA = a.author.toUpperCase();
  const authorB = b.author.toUpperCase();
  if (authorA < authorB) return -1;
  if (authorA > authorB) return 1;
  return 0;
}

//Sorts library array numerically by page count
function sortLibraryPages(a, b) {
  if (a.pages < b.pages) return -1;
  if (a.pages > b.pages) return 1;
  return 0;
}

//Sorts library array by read status
function sortLibraryRead(a, b) {
  return (a.read === b.read) ? 0 : a.read ? -1 : 1;
}

function removeBook(title) {
  myLibrary = myLibrary.filter((book) => book.title !== title)
}

function isInLibrary(newBook) {
  return myLibrary.some((Book) => Book.title == newBook.title)
}

//Not being used at all. Useless?
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

//DOM Element Queries
const libraryTable = document.getElementById('library-table-body');
const addBookButton = document.getElementById('add-book-button');
const modal = document.getElementById('modal-add-book');
const removeBookBackgroundModal = document.getElementById('modal-remove-book');
const modalContent = document.querySelector('.modal-content');
const removeModal = document.getElementById('remove-entry-modal');
const addBookForm = document.getElementById('add-book-form');
const errorMessageAddBook = document.getElementById('add-book-error-message');
const sortTitleButton = document.getElementById('sort-title-button');
const sortAuthorButton = document.getElementById('sort-author-button');
const sortPagesButton = document.getElementById('sort-pages-button');
const sortReadButton = document.getElementById('sort-read-button');
const yesRemove = document.getElementById('yes-remove');
const noRemove = document.getElementById('no-remove');

//Toggles visibility and active state of form modal
const toggleAddBookModal = () => {
  modalContent.classList.toggle('active');
  modal.classList.toggle('active');
  errorMessageAddBook.classList.remove('active');
  addBookForm.reset();
}

//Toggles visibility and active state of remove book modal
const toggleRemoveBookModal = () => {
  removeBookBackgroundModal.classList.toggle('active');
  removeModal.classList.toggle('active');
}

//Resets table and then adds a row for each Book in the array
const updateLibraryTable = () => {
  libraryTable.innerHTML = '';
  for (let Book of myLibrary) {
    addBookRow(Book);
  }
}

//Sorting buttons on table headers
sortTitleButton.addEventListener('click',() => {
  currentSort === 'title' ? sortArray('titleBackward') : sortArray('title');
  updateLibraryTable();
});
sortAuthorButton.addEventListener('click',() => {
  currentSort === 'author' ? sortArray('authorBackward') : sortArray('author');
  updateLibraryTable();
});
sortPagesButton.addEventListener('click',() => {
  currentSort === 'pages' ? sortArray('pagesBackward') : sortArray('pages');
  updateLibraryTable();
});
sortReadButton.addEventListener('click',() => {
  currentSort === 'read' ? sortArray('readBackward') : sortArray('read');
  updateLibraryTable();
});

/* ========================================
Sprawling function. Needs to be refactored.
Creates new rows in the DOM library table,
adds event listeners for created buttons.
Can these be relocated?
=========================================*/
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
  pages.textContent = `${Book.pages}`;
  readButton.classList.add('read-button');
  removeButton.classList.add('remove-button');
  
  Book.read ? readButton.textContent = 'Read' : readButton.textContent = 'Unread';

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
    removeButtonFunc(e);
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

//remove button handler
const removeButtonFunc = (e) => {
  let row = e.target.parentNode.parentNode.cells[0].textContent;
  toggleRemoveBookModal();
  document.getElementById('book-delete').innerHTML = row;
  deleteMe = row;
}

//Calls getBookFromForm, checks if it exists in array, and
//adds it if it doesn't exist. Then updates library table
//in the DOM, and hides the form modal.
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

//Gets user input in form modal and returns new Book object
const getBookFromForm = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new Book(title, author, pages, read);
}

//Global event listeners
addBookForm.onsubmit = addBook;
addBookButton.addEventListener('click', toggleAddBookModal);
yesRemove.addEventListener('click', () => {
  removeBook(deleteMe);
  sortArray(currentSort);
  updateLibraryTable();
  toggleRemoveBookModal();
});
noRemove.addEventListener('click', () => toggleRemoveBookModal());


//Closes open modal if user clicks outside of it
window.addEventListener('click', function(e) {
  if (modalContent.classList.contains('active') && e.target == modal) {
    modal.classList.remove('active');
    modalContent.classList.remove('active');
  }
  if (removeModal.classList.contains('active') && ((e.target == modal) || (e.target == removeBookBackgroundModal))) {
    removeBookBackgroundModal.classList.remove('active');
    removeModal.classList.remove('active');
  }
});
window.addEventListener('touchend', function(e) {
  if (modalContent.classList.contains('active') && e.target == modal) {
    modal.classList.remove('active');
    modalContent.classList.remove('active');
  }
  if (removeModal.classList.contains('active') && ((e.target == modal) || (e.target == removeBookBackgroundModal))) {
    removeBookBackgroundModal.classList.remove('active');
    removeModal.classList.remove('active');
  }
});




/* ==========
local storage
========== */


//testing book entries
myLibrary.push(new Book('Still Life With Crows', 'Preston/Child', 480, true));
myLibrary.push(new Book('American Gods', 'Neil Gaiman', 465, true));
myLibrary.push(new Book('The Naked God', 'Peter Hamilton', 1174, true));
myLibrary.push(new Book (`The Hitchhiker's Guide to the Galaxy
`, 'Douglas Adams', 208, true));
sortArray(currentSort);
updateLibraryTable();