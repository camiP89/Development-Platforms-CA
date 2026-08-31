import { SUPABASE } from "../api/supabase.mjs";
import { createHeader } from "../components/header.mjs";
import { displayMessage } from "../components/displayMessage.mjs";
import { hideSpinner, showSpinner } from "../components/loadingSpinner.mjs";

createHeader();

const loginForm = document.getElementById("form-container");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const submitButton = loginForm.querySelector("button[type='submit']");

  showSpinner();

  try {
    if (submitButton) submitButton.disabled = true;

    const { data, error } = await SUPABASE.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      displayMessage(
        "#message-container",
        "success",
        "Login successful! Welcome to the Student Express.",
      );

      loginForm.reset();

      setTimeout(() => {
        window.location.href = "/articles/index.html";
      }, 1500);
    }
  } catch (error) {
    displayMessage("#message-container", "error", error.message);
  } finally {
    if (submitButton) submitButton.disabled = false;

    hideSpinner();
  }
});
