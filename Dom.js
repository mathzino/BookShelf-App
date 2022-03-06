const UNCOMPLETED_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOKSHELF_ITEMID = "itemId";

function makeBookshelfList(bookTitle, author, year, isComplete) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookTitle;

  let textAuthor = document.createElement("p");
  let authorName = document.createElement("span");
  authorName.setAttribute("id", "author");
  authorName.innerText = author;
  textAuthor.innerText = "penulis: ";
  textAuthor.append(authorName);

  let textYear = document.createElement("p");
  let pblcYear = document.createElement("span");
  pblcYear.setAttribute("id", "year");
  pblcYear.innerText = year;
  textYear.innerText = "Tahun : ";
  textYear.append(pblcYear);

  let article = document.createElement("article");
  article.classList.add("book_item");
  article.append(textTitle, textAuthor, textYear);

  if (isComplete === true) {
    article.append(makeButtonContainer(true));
  } else {
    article.append(makeButtonContainer(false));
  }
  console.log(article);
  return article;
}
function addToBookshelf() {
  let textTitle = document.getElementById("inputBookTitle").value;
  let textAuthor = document.getElementById("inputBookAuthor").value;
  let textYear = document.getElementById("inputBookYear").value;
  let isComplete = tes();
  const completedList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
  const uncompletedList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
  const bookshelfList = makeBookshelfList(textTitle, textAuthor, textYear, isComplete);

  if (isComplete === true) {
    completedList.append(bookshelfList);
  } else {
    uncompletedList.append(bookshelfList);
  }

  const bookshelfObject = composeBookshelfObject(textTitle, textAuthor, textYear, isComplete);
  bookshelfList[BOOKSHELF_ITEMID] = bookshelfObject.id;
  bookshelves.push(bookshelfObject);
  updateDataToStorage(); //-
}

function tes() {
  const checkbox = document.getElementById("inputBookIsComplete");
  if (checkbox.checked === true) {
    return true;
  }
  return false;
}
function createButton(buttonTypeClass, text, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = text;
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function createDoneButton() {
  return createButton("green", "selesai dibaca", function (event) {
    addBookToCompletedList(event.target.parentElement.parentElement);
  });
}

function createDeleteButton() {
  return createButton("red", "hapus buku", function (event) {
    removeBookFromBookdhelf(event.target.parentElement.parentElement);
  });
}
function createUndoButton() {
  return createButton("green", "belum dibaca", function (event) {
    addBookToUncompletedList(event.target.parentElement.parentElement);
  });
}
function addBookToCompletedList(bookElement) {
  const completedList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
  let textTitle = bookElement.querySelector(".book_item > h3").innerText;
  let textAuthor = bookElement.querySelector("#author").innerText;
  let textYear = bookElement.querySelector("#year").innerText;

  const newBook = makeBookshelfList(textTitle, textAuthor, textYear, true);
  console.log(textTitle, textAuthor, textYear, true);

  completedList.append(newBook);
  //
  const bookshelf = findBookshelf(bookElement[BOOKSHELF_ITEMID]);
  bookshelf.isComplete = true;

  newBook[BOOKSHELF_ITEMID] = bookshelf.id;
  bookElement.remove();
  updateDataToStorage(); //-
}

function removeBookFromBookdhelf(bookElement) {
  if (confirm("yakin hapus buku?")) {
    const bookshelfPosition = findBookshelfIndex(bookElement[BOOKSHELF_ITEMID]);
    bookshelves.splice(bookshelfPosition, 1);
    bookElement.remove();
    updateDataToStorage();
  } else {
    alert("anda tidak jadi menghapus buku");
  }
}

function addBookToUncompletedList(bookElement) {
  const uncompletedList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
  let textTitle = bookElement.querySelector(".book_item > h3").innerText;
  let textAuthor = bookElement.querySelector("#author").innerText;
  let textYear = bookElement.querySelector("#year").innerText;

  const newBook = makeBookshelfList(textTitle, textAuthor, textYear, false);
  console.log(textTitle, textAuthor, textYear, false);

  const bookshelf = findBookshelf(bookElement[BOOKSHELF_ITEMID]);
  bookshelf.isComplete = false;
  newBook[BOOKSHELF_ITEMID] = bookshelf.id;

  uncompletedList.append(newBook);
  bookElement.remove();
  updateDataToStorage();
}

function makeButtonContainer(value) {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");
  if (value === true) {
    buttonContainer.append(createUndoButton(), createDeleteButton());
  } else {
    buttonContainer.append(createDoneButton(), createDeleteButton());
  }

  return buttonContainer;
}

function searchFunction() {
  var input, filter, ul, artcl, h, i, txtValue;

  input = document.getElementById("searchBookTitle");
  filter = input.value.toUpperCase();
  artcl = document.getElementsByTagName("article");
  for (i = 0; i < artcl.length; i++) {
    h = artcl[i].getElementsByTagName("h3")[0];
    txtValue = h.textContent || h.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      artcl[i].style.display = "";
    } else {
      artcl[i].style.display = "none";
    }
  }
}

function refreshDataFromBookshelves() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);

  for (bookshelf of bookshelves) {
    const newBook = makeBookshelfList(bookshelf.bookTitle, bookshelf.author, bookshelf.year, bookshelf.isComplete);
    newBook[BOOKSHELF_ITEMID] = bookshelf.id;

    if (bookshelf.isComplete) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}
