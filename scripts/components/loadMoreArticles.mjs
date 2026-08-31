import { createArticlesHtml } from "../components/displayArticles.mjs";

export function loadMoreArticles(
  articles,
  currentIndex,
  pageSize = 10,
  containerId = "articles-container",
) {
  const nextArticles = articles.slice(currentIndex, currentIndex + pageSize);

  createArticlesHtml(nextArticles, containerId);

  return currentIndex + pageSize;
}

export function toggleLoadMore(buttonId, currentIndex, totalArticles) {
  const button = document.getElementById(buttonId);

  if (!button) return;

  button.style.display = currentIndex < totalArticles ? "block" : "none";
}

export function setupLoadMoreButton(buttonId, callback) {
  const button = document.getElementById(buttonId);

  if (!button) return;

  button.addEventListener("click", callback);
}
