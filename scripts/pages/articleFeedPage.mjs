import { createHeader } from "../components/header.mjs";
import { renderArticlesContainer } from "../components/renderArticlesContainer.mjs";
import { initSearch } from "../components/search.mjs";
import { checkAuth } from "../api/authApi.mjs";

await checkAuth();

createHeader();

renderArticlesContainer("All Articles", 10);

initSearch();