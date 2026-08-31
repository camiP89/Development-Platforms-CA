import {
  fetchSingleArticleById,
  updateArticleById,
} from "../api/articlesApi.mjs";
import { createHeader } from "../components/header.mjs";
import { showSpinner, hideSpinner } from "../components/loadingSpinner.mjs";
import { displayMessage } from "../components/displayMessage.mjs";
import { checkAuth } from "../api/authApi.mjs";

await checkAuth();

createHeader();

const urlParams = new URLSearchParams(window.location.search);

const articleId = urlParams.get("id");

const editForm = document.getElementById("edit-article-container");

const imageInput = document.getElementById("image-url");

const previewImage = document.getElementById("image-preview");

const cancelBtn = document.querySelector("button[value='Cancel']");

function redirectToArticles() {
  window.location.href = "/articles/index.html";
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    if (confirm("Discard changes?")) {
      redirectToArticles();
    }
  });
}

async function populateForm() {
  try {
    showSpinner();

    const article = await fetchSingleArticleById(articleId);

    if (!article) {
      throw new Error("Article data not found");
    }

    document.getElementById("article-title").value = article.title || "";

    document.getElementById("article-content").value = article.content || "";

    if (imageInput) {
      imageInput.value = article.image_url || "";
    }

    const altInput = document.getElementById("image-alt-text");

    if (altInput) {
      altInput.value = article.image_alt || "";
    }

    if (previewImage && article.image_url) {
      previewImage.src = article.image_url;
      previewImage.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Populate Form Error:", error);

    displayMessage(
      "#message-container",
      "error",
      "Could not find article data.",
    );
  } finally {
    hideSpinner();
  }
}

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const articleData = {
    title: document.getElementById("article-title").value.trim(),

    content: document.getElementById("article-content").value.trim(),

    image_url: imageInput.value.trim() || null,

    image_alt: document.getElementById("image-alt-text").value.trim() || null,
  };

  try {
    showSpinner();

    await updateArticleById(articleId, articleData);

    displayMessage(
      "#message-container",
      "success",
      "Article updated successfully!",
    );

    setTimeout(() => {
      redirectToArticles();
    }, 1500);
  } catch (error) {
    console.error(error);

    displayMessage("#message-container", "error", error.message);
  } finally {
    hideSpinner();
  }
});

populateForm();
