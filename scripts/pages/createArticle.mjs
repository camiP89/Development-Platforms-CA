import { createArticle } from "../api/articlesApi.mjs";
import { displayMessage } from "../components/displayMessage.mjs";
import { createHeader } from "../components/header.mjs";
import { hideSpinner, showSpinner } from "../components/loadingSpinner.mjs";
import { checkAuth } from "../api/authApi.mjs";

await checkAuth();

createHeader();

const articleForm = document.getElementById("create-article-container");

articleForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const articleTitle = document.getElementById("article-title").value.trim();

  const articleContent = document
    .getElementById("article-content")
    .value.trim();

  const articleImage = document.getElementById("image-url").value.trim();

  const imageAlt = document.getElementById("image-alt-text").value.trim();

  const submitButton = articleForm.querySelector("button[type='submit']");

  showSpinner();

  try {
    if (submitButton) submitButton.disabled = true;

    const articleData = {
      title: articleTitle,
      content: articleContent,
      image_url: articleImage || null,
      image_alt: imageAlt || null,
    };

    await createArticle(articleData);

    displayMessage(
      "#message-container",
      "success",
      "Article created successfully!",
    );
    setTimeout(() => {
      window.location.href = "/articles/index.html";
    }, 1500);
  } catch (error) {
    console.error(error);

    displayMessage("#message-container", "error", error.message);
  } finally {
    if (submitButton) submitButton.disabled = false;

    hideSpinner();
  }
});
