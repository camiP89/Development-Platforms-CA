import { createSingleArticleHtml } from "../components/createSingleArticle.mjs";

export function createArticlesHtml(
  articles,
  containerId = "articles-container",
) {
  const articlesContainer = document.getElementById(containerId);

  if (!articlesContainer) return;

  if (!Array.isArray(articles)) {
    articlesContainer.innerHTML = "<p>Could not load articles.</p>";
    return;
  }

  if (articles.length === 0) {
    articlesContainer.innerHTML = "<p>No articles available.</p>";
    return;
  }

  articles.forEach((article) => {
    try {
      const articleHtml = createSingleArticleHtml(article);

      articlesContainer.appendChild(articleHtml);
    } catch (error) {
      const errorMsg = document.createElement("p");

      errorMsg.textContent = "Error displaying an article.";
      errorMsg.style.color = "red";

      articlesContainer.appendChild(errorMsg);
    }
  });
}
