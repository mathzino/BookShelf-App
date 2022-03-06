const STORAGE_KEY = "BOOKSHELVES_APP";

let bookshelves = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(bookshelves);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}
function loadDataFromStorage() {
  const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) bookshelves = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookshelfObject(bookTitle, author, year, isComplete) {
  return {
    id: +new Date(),
    bookTitle,
    author,
    year,
    isComplete,
  };
}

function findBookshelf(bookshelfId) {
  for (bookshelf of bookshelves) {
    if (bookshelf.id === bookshelfId) return bookshelf;
  }

  return null;
}

function findBookshelfIndex(bookshelfId) {
  let index = 0;
  for (bookshelf of bookshelves) {
    if (bookshelf.id === bookshelfId) return index;

    index++;
  }

  return -1;
}
