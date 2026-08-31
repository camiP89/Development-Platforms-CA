import { SUPABASE } from "../api/supabase.mjs";
import { createHeader } from "../components/header.mjs";
import { displayMessage } from "../components/displayMessage.mjs";
import { hideSpinner, showSpinner } from "../components/loadingSpinner.mjs";

createHeader();

const registrationForm = document.getElementById("form-container");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const submitButton = registrationForm.querySelector("button[type='submit']");

  showSpinner();

  try {
    if (submitButton) submitButton.disabled = true;

    const { data, error } = await SUPABASE.auth.signUp({
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
        "Registration submitted! Please check your email to confirm your account.",
      );

      registrationForm.reset();
      setTimeout(() => {
        window.location.href = "/account/login.html";
      }, 1500);
    }
  } catch (error) {
    displayMessage("#message-container", "error", error.message);
  } finally {
    if (submitButton) submitButton.disabled = false;

    hideSpinner();
  }
});
