"use strict";
document.documentElement.classList.add("js");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton?.addEventListener("click", () => {
  const open = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});
navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
const dialog = document.querySelector("#photo-dialog");
if (dialog && typeof dialog.showModal === "function") {
  document.querySelectorAll("[data-lightbox]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const photo = link.querySelector("img");
      dialog.querySelector("img").src = link.href;
      dialog.querySelector("img").alt = photo.alt;
      dialog.querySelector("p").textContent = photo.alt;
      dialog.showModal();
    });
  });
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    }
  });
}
const form = document.querySelector("#contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const body = [
    "Name: " + values.get("name").trim(),
    "Email: " + values.get("email").trim(),
    "",
    values.get("message").trim(),
  ].join("\n");
  const url =
    "mailto:computeinitiative@gmail.com?subject=" +
    encodeURIComponent(values.get("subject")) +
    "&body=" +
    encodeURIComponent(body);
  document.querySelector("#form-status").textContent =
    "Your email app should open with a draft. Review and send it there. If it doesn’t open, email computeinitiative@gmail.com directly.";
  window.location.href = url;
});
