import { renderNavbar } from "./utils/navbar.js";
import { router, handleLinks } from "./router.js";
import { getCurrentUser } from "./api/apiUsers.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  renderNavbar(currentUser);
  handleLinks();
  router();
});
//Este evento hace que espere a que todo el contenido del DOM se cargue antes de mostrar y redirigir
