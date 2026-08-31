import { fetchAllArticles } from "../api/articlesApi.mjs";

import { createArticlesHtml } from "../components/displayArticles.mjs";

import { showSpinner, hideSpinner } from "../components/loadingSpinner.mjs";

const searchInput = document.getElementById("search-input");

const articlesContainer = document.getElementById("articles-container");

let allArticles = [];

export function renderArticles() {
  if (!searchInput || !articlesContainer) return;

  const query = searchInput.value.trim().toLowerCase();

  const filteredArticles = allArticles.filter((article) => {
    return (
      article.title?.toLowerCase().includes(query) ||
      article.content?.toLowerCase().includes(query)
    );
  });

  articlesContainer.innerHTML = "";

  if (filteredArticles.length === 0) {
    articlesContainer.innerHTML = `
      <p class="col-span-full text-center py-10 text-text/60">
        No articles found for "${query}"
      </p>
    `;

    return;
  }

  createArticlesHtml(filteredArticles, "articles-container");
}

export async function initSearch() {
  try {
    showSpinner();

    allArticles = await fetchAllArticles();

    if (searchInput) {
      searchInput.addEventListener("input", renderArticles);
    }
  } catch (error) {
    console.error("Error initializing search:", error);
  } finally {
    hideSpinner();
  }
}
