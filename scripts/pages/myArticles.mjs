import { SUPABASE } from "../api/supabase.mjs";
import { deleteArticle, fetchArticlesByUser } from "../api/articlesApi.mjs";
import { createHeader } from "../components/header.mjs";
import { showSpinner, hideSpinner } from "../components/loadingSpinner.mjs";
import { displayMessage } from "../components/displayMessage.mjs";
import { checkAuth } from "../api/authApi.mjs";

await checkAuth();

createHeader();

const articlesContainer = document.getElementById("my-articles-container");

const noArticlesMessage = document.getElementById("no-articles-message");

export async function initMyArticles() {
  showSpinner();

  try {
    const {
      data: { user },
    } = await SUPABASE.auth.getUser();

    if (!user) {
      window.location.href = "/account/login.html";
      return;
    }

    const articles = await fetchArticlesByUser(user.id);

    renderMyArticles(articles);
  } catch (error) {
    console.error("My Articles Error:", error);

    displayMessage(
      "#message-container",
      "error",
      "Could not load your articles.",
    );
  } finally {
    hideSpinner();
  }
}

function renderMyArticles(articles) {
  articlesContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    noArticlesMessage?.classList.remove("hidden");
    return;
  }

  noArticlesMessage?.classList.add("hidden");

  articles.forEach((article) => {
    const template = document.querySelector("#my-article-card-template");

    if (!template) return;

    const clone = template.content.cloneNode(true);

    const card = clone.querySelector("article");

    const titleEl = clone.querySelector(".js-title");

    const dateEl = clone.querySelector(".js-date");

    const contentEl = clone.querySelector(".js-content");

    const imageEl = clone.querySelector(".js-image");

    const viewBtn = clone.querySelector(".js-view-btn");

    const editBtn = clone.querySelector(".js-edit-btn");

    const deleteBtn = clone.querySelector(".js-delete-btn");

    if (titleEl) {
      titleEl.textContent = article.title || "No title available";
    }

    if (dateEl) {
      dateEl.textContent = article.created_at
        ? new Date(article.created_at).toLocaleDateString()
        : "Date unavailable";
    }

    if (contentEl) {
      contentEl.textContent = article.content || "No content available.";
    }

    if (imageEl) {
      const imageUrl = article.image_url || "/assets/dp-favicon.png";

      imageEl.style.backgroundImage = `url('${imageUrl}')`;

      imageEl.setAttribute(
        "aria-label",
        article.image_alt || article.title || "Article image",
      );
    }

    if (viewBtn) {
      viewBtn.href = `/articles/article-detail.html?id=${article.id}`;
    }

    if (editBtn) {
      editBtn.addEventListener("click", () => {
        window.location.href = `/articles/edit.html?id=${article.id}`;
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", async () => {
        const confirmed = confirm(
          `Delete "${article.title}"? This cannot be undone.`,
        );

        if (!confirmed) return;

        try {
          await deleteArticle(article.id);

          card.remove();

          displayMessage(
            "#message-container",
            "success",
            "Article deleted successfully!",
          );
          setTimeout(() => {
            const messageContainer =
              document.querySelector("#message-container");

            if (messageContainer) {
              messageContainer.textContent = "";
              messageContainer.className = "";
            }
          }, 2000);

          const remainingCards = articlesContainer.querySelectorAll("article");

          if (remainingCards.length === 0) {
            noArticlesMessage?.classList.remove("hidden");
          }
        } catch (error) {
          console.error(error);

          displayMessage("#message-container", "error", error.message);
        }
      });
    }

    articlesContainer.appendChild(clone);
  });
}

initMyArticles();
