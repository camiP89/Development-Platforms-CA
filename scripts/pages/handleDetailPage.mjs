import { fetchSingleArticleById } from "../api/articlesApi.mjs";
import { createArticleDetailsHtml } from "../components/articleDetailsHtml.mjs";
import { showSpinner, hideSpinner } from "../components/loadingSpinner.mjs";
import { createHeader } from "../components/header.mjs";

createHeader();

const articleDetailsContainer = document.querySelector("#articles-container");

export function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);

  return {
    articleId: params.get("id"),
  };
}

export async function mainId() {
  const { articleId } = getIdFromURL();

  if (!articleId) {
    if (articleDetailsContainer) {
      articleDetailsContainer.innerHTML =
        "<p class='p-4 text-center'>No article ID found in URL.</p>";
    }

    console.error("Missing article ID.");

    return;
  }

  showSpinner();

  try {
    const articleData = await fetchSingleArticleById(articleId);

    if (!articleData) {
      throw new Error("Article data is empty.");
    }

    const singleArticleHtml = createArticleDetailsHtml(articleData);

    articleDetailsContainer.innerHTML = "";

    articleDetailsContainer.appendChild(singleArticleHtml);

    document.title = `${articleData.title} | Student Express`;
  } catch (error) {
    console.error("Error fetching article details:", error);

    if (articleDetailsContainer) {
      articleDetailsContainer.innerHTML =
        "<p class='p-4 text-center'>Error loading article.</p>";
    }
  } finally {
    hideSpinner();
  }
}

mainId();
