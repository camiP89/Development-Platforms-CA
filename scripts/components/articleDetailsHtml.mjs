export function createArticleDetailsHtml(articleData) {
  const template = document.querySelector("#article-template");

  if (!template) {
    console.error("Template #article-template not found!");
    return null;
  }

  const clone = template.content.cloneNode(true);

  const titleEl = clone.querySelector(".js-title");

  if (titleEl) {
    titleEl.textContent = articleData.title || "No title available";
  }

  const imageEl = clone.querySelector(".js-image");

  if (imageEl) {
    const imageUrl = articleData.image_url || "/assets/dp-logo.png";

    imageEl.style.backgroundImage = `url('${imageUrl}')`;

    imageEl.setAttribute(
      "aria-label",
      articleData.image_alt || articleData.title || "Article image",
    );
  }

  const dateEl = clone.querySelector(".js-date");

  if (dateEl) {
    dateEl.textContent = articleData.created_at
      ? new Date(articleData.created_at).toLocaleDateString()
      : "Date unavailable";
  }

  const contentEl = clone.querySelector(".js-content");

  if (contentEl) {
    contentEl.textContent =
      articleData.content || "No article content available.";
  }

  return clone.firstElementChild;
}
