export function renderLatestArticle(article) {
  if (!article) return;

  const featuredArticle = document.getElementById("featured-article");
  const featuredImage = document.getElementById("featured-image");
  const featuredTitle = document.getElementById("featured-title");

  const featuredDate = document.getElementById("featured-date");
  const featuredDescription = document.getElementById("featured-description");
  const featuredLink = document.getElementById("featured-link");

  if (!featuredArticle) return;

  if (featuredImage) {
    const imageUrl = article.image_url || "/assets/dp-favicon.png";

    featuredImage.style.backgroundImage = `url('${imageUrl}')`;
  }
  if (featuredTitle) {
    featuredTitle.textContent = article.title || "Untitled Article";
  }

  if (featuredDate) {
    featuredDate.textContent = article.created_at
      ? new Date(article.created_at).toLocaleDateString()
      : "";
  }

  if (featuredDescription) {
    featuredDescription.textContent =
      article.content || "No article content available.";
  }

  if (featuredLink) {
    featuredLink.href = `/articles/article-detail.html?id=${article.id}`;
  }
}
