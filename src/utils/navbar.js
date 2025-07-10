import { navigate } from "../router.js";
import { clearMovieCache } from "./movieCache.js";

export function renderNavbar(user) {
  const navbar = document.querySelector("nav");
  if (user) {
    navbar.innerHTML = `
      <nav class="navbar-nav">
        <span class="navbar-logo">MovieTime</span>
        <button id="navbar-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navbar-list">
          <span></span><span></span><span></span>
        </button>
        <ul id="navbar-list">
          <li><a href="/home" data-link>Home</a></li>
          <li><a href="/user/${user.id}" data-link>Profile</a></li>
          <li><a href="" id="logout">Logout</a></li>
        </ul>
      </nav>
    `;

    // Hamburguesa toggle
    const toggleBtn = document.getElementById("navbar-toggle");
    const navList = document.getElementById("navbar-list");
    toggleBtn.addEventListener("click", () => {
      navList.classList.toggle("open");
      const expanded = navList.classList.contains("open");
      toggleBtn.setAttribute("aria-expanded", expanded);
      toggleBtn.classList.toggle("open", expanded);
      // Elimina el cambio de innerHTML, siempre muestra los tres spans
    });
    // Cerrar menú al hacer click en cualquier enlace
    navList.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navList.classList.remove("open");
        toggleBtn.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", false);
      }
    });

    // Añadir event listener al botón de logout
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      // Limpiar localStorage
      localStorage.removeItem("currentUser");
      //Limpiar el cache de pelis
      clearMovieCache();
      // Actualizar navbar
      renderNavbar(null);
      // Redirigir al login
      navigate("/login");
    });
  } else {
    navbar.innerHTML = `
      <nav class="navbar-nav">
        <span class="navbar-logo">MovieTime</span>
        <button id="navbar-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navbar-list">
          <span></span><span></span><span></span>
        </button>
        <ul id="navbar-list">
          <li><a href="/home" data-link>Home</a></li>
          <li><a href="/login" data-link>Login</a></li>
          <li><a href="/signup" data-link>Sign up</a></li>
        </ul>
      </nav>
    `;
    // Hamburguesa toggle
    const toggleBtn = document.getElementById("navbar-toggle");
    const navList = document.getElementById("navbar-list");
    toggleBtn.addEventListener("click", () => {
      navList.classList.toggle("open");
      const expanded = navList.classList.contains("open");
      toggleBtn.setAttribute("aria-expanded", expanded);
      toggleBtn.classList.toggle("open", expanded);
      // Elimina el cambio de innerHTML, siempre muestra los tres spans
    });
    // Cerrar menú al hacer click en cualquier enlace
    navList.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navList.classList.remove("open");
        toggleBtn.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", false);
      }
    });
  }
}
