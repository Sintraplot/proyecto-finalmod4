import { Home } from "./views/home.js";
import { Login } from "./views/login.js";
import { Signup } from "./views/signup.js";
import { Profile } from "./views/profile.js";
import { MovieDetail } from "./views/movieDetail.js";
import { NotFound } from "./views/notFound.js";
import { getCurrentUser } from "./api/apiUsers.js";

const routes = [
  { path: "/", view: Home },
  { path: "/login", view: Login },
  { path: "/signup", view: Signup },
  { path: "/profile/:id", view: Profile },
  { path: "/movies/:movieId", view: MovieDetail },
];

//-------------------------

function matchRoute(pathname) {
  const pathSplit = pathname.split("/").filter(Boolean);

  for (const route of routes) {
    const routeSplit = route.path.split("/").filter(Boolean);

    if (routeSplit.length !== pathSplit.length) continue;

    const params = {};

    const isMatch = routeSplit.every((part, i) => {
      if (part.startsWith(":")) {
        const paramName = part.slice(1);
        params[paramName] = pathSplit[i];
        return true;
      } else {
        return part === pathSplit[i];
      }
    });

    if (isMatch) {
      return { view: route.view, params };
    }
  }

  return { view: NotFound, params: {} };
}

//-------------------------
const publicPaths = ["/login", "/signup"];

export function router() {
  const path = window.location.pathname;
  const currentUser = getCurrentUser();

  // Si no hay usuario y la ruta no es pública, redirige a login
  if (!currentUser && !publicPaths.includes(path)) {
    navigate("/login");
    return; // Salimos para que no renderice nada más
  }

  // Si hay usuario y quiere ir a login o signup, redirige a home
  if (currentUser && (path === "/login" || path === "/signup")) {
    navigate("/");
    return;
  }

  // Si todo bien, hacemos el match y mostramos vista
  const { view, params } = matchRoute(path);
  const container = document.getElementById("app");
  container.innerHTML = "";
  view(container, params);
}

//-------------------------

export function navigate(path) {
  window.history.pushState({}, "", path);
  router(); // vuelve a evaluar la ruta y carga la nueva vista
}
// Cambia la URL sin recargar la página.
// Usa history.pushState(...) para que el navegador piense que cambió de página.
// Luego llama a router() para renderizar la vista correspondiente.
// Se usa para hacer navegación progamada, por ejemplo después de un login o signup

//-------------------------

export function handleLinks() {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (link) {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    }
  });

  //Escucha los clicks en enlaces (a) que tengan el atributo data-link
  // Previene el comportamiento por defecto (<a href>) que sí recargaría la página.
  // Llama a navigate(...) para hacer la navegación vía JS.

  // Esto hace que funcione el botón "atrás" del navegador
  window.addEventListener("popstate", router);
}

//-------------------------
