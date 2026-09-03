import { SUPABASE } from "../api/supabase.mjs";
import { createHeader } from "../components/header.mjs";
import { renderArticlesContainer } from "../components/renderArticlesContainer.mjs";
import { initSearch } from "../components/search.mjs";

createHeader();

const heroBanner = document.getElementById("hero-banner");

const {
  data: { user },
} = await SUPABASE.auth.getUser();

if (user && heroBanner) {
  heroBanner.classList.add("hidden");
}

renderArticlesContainer("Latest Articles", 10);

initSearch();