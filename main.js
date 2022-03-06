document.addEventListener("DOMContentLoaded", function () {
  const submitInputBook = document.getElementById("inputBook");
  submitInputBook.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addToBookshelf();
  });

  button = document.getElementById("searchSubmit");
  button.addEventListener("click", function (ev) {
    ev.preventDefault();
    searchFunction();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBookshelves();
});
