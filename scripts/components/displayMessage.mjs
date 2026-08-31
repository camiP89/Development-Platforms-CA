export function displayMessage(selector, type, message) {
  const container = document.querySelector(selector);

  if (!container) return;

  container.textContent = message;

  if (type === "error") {
    container.className =
      "rounded-lg bg-red-100 p-3 text-center text-sm text-red-700";
  }

  if (type === "success") {
    container.className =
      "rounded-lg bg-green-100 p-3 text-center text-sm text-green-700";
  }
}