import { Home } from "./views/home.js";
import { Login } from "./views/login.js";
import { Signup } from "./views/signup.js";
import { Profile } from "./views/profile.js";
import { MovieDetail } from "./views/movieDetail.js";
import { NotFound } from "./views/notFound.js";
import { getCurrentUser } from "./api/apiUsers.js";

const routes = {
  "/": Home,
  "/login": Login,
  "/signup": Signup,
  "/user/:id": Profile,
  "/movies/:id": MovieDetail,
};

//------------------------

const publicPaths = ["/login", "/signup"];

export function router() {
  const path = window.location.pathname;
  const currentUser = getCurrentUser();

  const container = document.getElementById("app");
  container.innerHTML = "";

  // Protecciones y redirecciones
  if (!currentUser && !publicPaths.includes(path)) {
    navigate("/login");
    return;
  }

  if (currentUser && publicPaths.includes(path)) {
    navigate("/");
    return;
  }

  // Rutas estáticas
  if (routes[path]) {
    routes[path](container);
    return;
  }

  // Rutas dinámicas /movie/:id
  if (path.startsWith("/movie/")) {
    const movieId = path.split("/")[2];
    MovieDetail(container, movieId);
    return;
  }

  // Rutas dinámicas /profile/:id
  if (path.startsWith("/profile/")) {
    const userId = path.split("/")[2];
    Profile(container, userId);
    return;
  }

  // Ruta no encontrada
  NotFound(container);
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

//Otra forma de hacerlo más escalable que te coge cualquier ruta dinamica general:

// function matchRoute(pathname) {
//   const pathSplit = pathname.split("/").filter(Boolean);

//   for (const route of routes) {
//     const routeSplit = route.path.split("/").filter(Boolean);

//     if (routeSplit.length !== pathSplit.length) continue;

//     const params = {};

//     const isMatch = routeSplit.every((part, i) => {
//       if (part.startsWith(":")) {
//         const paramName = part.slice(1);
//         params[paramName] = pathSplit[i];
//         return true;
//       } else {
//         return part === pathSplit[i];
//       }
//     });

//     if (isMatch) {
//       return { view: route.view, params };
//     }
//   }

//   return { view: NotFound, params: {} };
// }
