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
[
  {
    "fecha": "2024-06-12",
    "escuela": "Escuela Primaria N° 12",
    "ciudad": "La Plata",
    "anio": 2024
  },
  {
    "fecha": "2023-09-03",
    "escuela": "Colegio San Martín",
    "ciudad": "CABA",
    "anio": 2023
  },
  {
    "fecha": "2022-04-18",
    "escuela": "Instituto General Paz",
    "ciudad": "Córdoba",
    "anio": 2022
  }
]
// =========================
// Escuelas visitadas (instituciones)
// =========================
async function cargarEscuelasVisitadas() {
  const tbody = document.getElementById("visitsTbody");
  const search = document.getElementById("visitsSearch");

  // Si no estamos en instituciones.html, no hacer nada
  if (!tbody) return;

  try {
    const res = await fetch("data/escuelas.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar data/escuelas.json");

    let items = await res.json();

    // Orden: más reciente primero (por fecha)
    items.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));

    const formatearFecha = (yyyy_mm_dd) => {
      if (!yyyy_mm_dd) return "";
      const [y, m, d] = yyyy_mm_dd.split("-");
      if (!y || !m || !d) return yyyy_mm_dd;
      return `${d}/${m}/${y}`;
    };

    const render = (lista) => {
      if (!lista.length) {
        tbody.innerHTML = `<tr><td colspan="4">No hay resultados.</td></tr>`;
        return;
      }

      tbody.innerHTML = lista.map((it) => {
        const fecha = formatearFecha(it.fecha);
        const escuela = it.escuela ?? "";
        const ciudad = it.ciudad ?? "";
        const anio = it.anio ?? "";

        return `
          <tr>
            <td>${fecha}</td>
            <td>${escuela}</td>
            <td>${ciudad}</td>
            <td><span class="badge">${anio}</span></td>
          </tr>
        `;
      }).join("");
    };

    render(items);

    // Búsqueda en vivo
    if (search) {
      search.addEventListener("input", (e) => {
        const q = e.target.value.trim().toLowerCase();

        const filtrados = items.filter((it) => {
          const fecha = (it.fecha ?? "").toLowerCase();
          const escuela = (it.escuela ?? "").toLowerCase();
          const ciudad = (it.ciudad ?? "").toLowerCase();
          const anio = String(it.anio ?? "").toLowerCase();

          return (
            fecha.includes(q) ||
            escuela.includes(q) ||
            ciudad.includes(q) ||
            anio.includes(q)
          );
        });

        render(filtrados);
      });
    }
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="4">Error cargando el listado.</td></tr>`;
  }
}

// Ejecutar al cargar
cargarEscuelasVisitadas();