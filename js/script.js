// Año dinámico
const yearSpan = document.getElementById("y");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
// Marcar link activo en la navegación
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((a) => {
  const href = a.getAttribute("href");
  if (href === currentPage) {
    a.classList.add("is-active");
    a.setAttribute("aria-current", "page");
  }
});
// Año dinámico (footer)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
