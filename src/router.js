import { Home } from "./views/home.js";
import { Login } from "./views/login.js";
import { Signup } from "./views/signup.js";
import { Profile } from "./views/profile.js";
import { MovieDetail } from "./views/movieDetail.js";
import { NotFound } from "./views/notFound.js";
import { getCurrentUser } from "./api/apiUsers.js";
import { getUserFavorites } from "./api/apiUsers.js";
import { onToggleFavorite } from "./utils/favorites.js";
import { showSpinner } from "./utils/spinner.js";
import { showToast } from "./utils/toastify.js";

const routes = {
  "/": Login, // Cambiado: ahora '/' muestra Login
  "/login": Login,
  "/signup": Signup,
  "/home": Home, // Añadido: ahora '/home' es una ruta explícita
  "/user/:id": Profile,
  "/movie/:id": MovieDetail,
};

//------------------------

const publicPaths = ["/login", "/signup"]; // páginas publicas con acceso sin estar logeado

export async function router() {
  const path = window.location.pathname;
  const currentUser = getCurrentUser();

  const container = document.getElementById("app");
  container.innerHTML = "";

  // Si la ruta es '/' y el usuario está logueado, ir a Home
  if (path === "/" && currentUser) {
    navigate("/home");
    return;
  }

  // Si la ruta es '/' y el usuario NO está logueado, mostrar Login
  if (path === "/") {
    Login(container);
    return;
  }

  // Ruta Home (solo para usuarios logueados)
  if (path === "/home") {
    if (!currentUser) {
      navigate("/login");
      showToast("You must be logged in to access this page.", "error");
      return;
    }
    showSpinner(container, "Loading...");
    try {
      const favoriteIds = await getUserFavorites(currentUser.id);
      Home(container, favoriteIds, (movieId) =>
        onToggleFavorite(movieId, container)
      );
    } catch (error) {
      console.error("Error loading favorites:", error);
      Home(container, [], (movieId) => onToggleFavorite(movieId, container));
    }
    return;
  }

  // Ruta login
  if (path === "/login") {
    Login(container);
    return;
  }

  // Ruta signup
  if (path === "/signup") {
    Signup(container);
    return;
  }

  // Rutas dinámicas /movie/:id
  if (path.startsWith("/movie/")) {
    if (!currentUser) {
      navigate("/login");
      showToast("You must be logged in to access this page.", "error");
      return;
    }

    const movieId = path.split("/")[2];
    MovieDetail(container, movieId);
    return;
  }

  // Rutas dinámicas /user/:id
  if (path.startsWith("/user/")) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      navigate("/login");
      showToast("You must be logged in to access this page.", "error");
      return;
    }

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
