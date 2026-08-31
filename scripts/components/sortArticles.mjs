export function sortArticles(articles, sortType) {
  const sortedArticles = [...articles];

  if (sortType === "newest") {
    sortedArticles.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }

  if (sortType === "oldest") {
    sortedArticles.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at),
    );
  }

  return sortedArticles;
}

export function setupSortDropdown(dropdownId, callback) {
  const dropdown = document.getElementById(dropdownId);

  if (!dropdown) return;

  dropdown.addEventListener("change", (event) => {
    callback(event.target.value);
  });
}