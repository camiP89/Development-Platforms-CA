import { fetchAllArticles } from "../api/articlesApi.mjs";
import { showSpinner, hideSpinner } from "./loadingSpinner.mjs";
import {
  loadMoreArticles,
  toggleLoadMore,
  setupLoadMoreButton,
} from "./loadMoreArticles.mjs";
import { sortArticles, setupSortDropdown } from "./sortArticles.mjs";
import { renderLatestArticle } from "./latestArticle.mjs";

/**
 * Renders the articles feed with a heading and pagination.
 * @param {string} headingText - The text for the page H1.
 * @param {number} pageSize - How many articles to show per page.
 */
export async function renderArticlesContainer(headingText, pageSize = 10) {
  let allArticles = [];
  let sortedArticles = [];
  let currentIndex = 0;
  let latestArticle = null;

  const heading = document.querySelector("h1");

  if (heading) {
    heading.textContent = headingText;
  }

  showSpinner();

  try {
    allArticles = await fetchAllArticles();

    sortedArticles = sortArticles(allArticles, "newest");

    latestArticle = sortedArticles[0];

    if (latestArticle) {
      renderLatestArticle(latestArticle);
    }

    sortedArticles = sortedArticles.slice(1);

    currentIndex = loadMoreArticles(sortedArticles, currentIndex, pageSize);

    toggleLoadMore("load-more-button", currentIndex, sortedArticles.length);

    setupLoadMoreButton("load-more-button", () => {
      currentIndex = loadMoreArticles(sortedArticles, currentIndex, pageSize);

      toggleLoadMore("load-more-button", currentIndex, sortedArticles.length);
    });

    setupSortDropdown("sort-dropdown", (sortType) => {
      currentIndex = 0;

      const remainingArticles = latestArticle
        ? allArticles.filter((article) => article.id !== latestArticle.id)
        : allArticles;

      sortedArticles = sortArticles(remainingArticles, sortType);

      const articlesContainer = document.getElementById("articles-container");

      if (articlesContainer) {
        articlesContainer.innerHTML = "";
      }

      currentIndex = loadMoreArticles(sortedArticles, currentIndex, pageSize);

      toggleLoadMore("load-more-button", currentIndex, sortedArticles.length);
    });
  } catch (error) {
    const articleContainer = document.getElementById("articles-container");

    if (articleContainer) {
      articleContainer.innerHTML = `
        <p class="text-red-500">
          Error loading articles: ${error.message}
        </p>
      `;
    }
  } finally {
    hideSpinner();
  }
}
