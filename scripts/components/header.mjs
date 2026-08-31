import { SUPABASE } from "../api/supabase.mjs";
import { logout } from "../api/authApi.mjs";

export async function createHeader() {
  const {
    data: { user },
  } = await SUPABASE.auth.getUser();

  const loggedInContainers = [
    document.getElementById("logged-in-nav"),
    document.getElementById("mobile-logged-in-nav"),
    document.getElementById("user-status-bar"),
  ];

  const loggedOutContainers = [
    document.getElementById("logged-out-nav"),
    document.getElementById("mobile-logged-out-nav"),
  ];

  if (user) {
    loggedInContainers.forEach((el) => {
      if (!el) return;

      el.classList.remove("hidden");

      if (el.id === "user-status-bar") {
        el.classList.add("flex");
      }

      if (el.id === "mobile-logged-in-nav") {
        el.classList.add("flex", "flex-col");
      }
    });

    loggedOutContainers.forEach((el) => el?.classList.add("hidden"));

    const welcomeText = document.getElementById("welcome-text");

    if (welcomeText) {
      welcomeText.textContent = `Welcome, ${user.email}!`;
    }
  } else {
    loggedInContainers.forEach((el) => el?.classList.add("hidden"));

    loggedOutContainers.forEach((el) => el?.classList.remove("hidden"));
  }

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.onclick = (event) => {
      event.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    };

    document.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });

    mobileMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  document
    .getElementById("logout-button")
    ?.addEventListener("click", logout);

  document
    .getElementById("mobile-logout-button")
    ?.addEventListener("click", logout);
}