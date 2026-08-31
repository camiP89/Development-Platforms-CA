import { deleteArticle } from "../api/articlesApi.mjs";

export function createSingleArticleHtml(article) {
  const template = document.querySelector("#article-card-template");

  if (!template) {
    console.error("Template #article-card-template not found!");
    return null;
  }

  const clone = template.content.cloneNode(true);

  const card = clone.querySelector("article");

  const createdDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString()
    : "N/A";

  const dateEl = clone.querySelector(".js-date");

  if (dateEl) {
    dateEl.textContent = createdDate;
  }

  const titleEl = clone.querySelector(".js-title");

  if (titleEl) {
    titleEl.textContent = article.title || "No Title Provided";
  }

  const contentEl = clone.querySelector(".js-description");

  if (contentEl) {
    contentEl.textContent = article.content || "No content available.";
  }

  const imageEl = clone.querySelector(".js-image");

  if (imageEl) {
    const imageUrl = article.image_url || "/assets/dp-favicon.png";

    imageEl.style.backgroundImage = `url('${imageUrl}')`;
  }

  const articleLink = clone.querySelector(".js-link");

  if (articleLink) {
    articleLink.href = `/articles/article-detail.html?id=${article.id}`;
  }

  const deleteBtn = clone.querySelector(".js-delete-btn");

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (confirm(`Delete "${article.title}"? This cannot be undone.`)) {
        try {
          await deleteArticle(article.id);

          card.remove();
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  const editBtn = clone.querySelector(".js-edit-btn");

  if (editBtn) {
    editBtn.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.href = `/articles/edit.html?id=${article.id}`;
    });
  }

  return card;
}
