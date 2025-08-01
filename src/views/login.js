import { getUsers } from "../api/apiUsers.js";
import { navigate } from "../router.js";
import { loginValidations } from "../utils/validations.js";
import { renderNavbar } from "../utils/navbar.js";
import { showToast } from "../utils/toastify.js";
import { showSpinner } from "../utils/spinner.js";

export function Login(container) {
  container.innerHTML = `
  <div class= "div-form-login">
    <form class="login-container" id= "login-form">
            <h2 class="login-title">Login</h2>
            <div class="form-group">
                <label for="loginEmail">EMAIL:</label>
                <input type="text" class="login-signup-input" id="loginEmail" placeholder="Enter your email">
                <label for="loginPassword">PASSWORD:</label>
                <input type="password" class="login-signup-input" id="loginPassword" placeholder="Enter your password">
                <button type="submit" class="button-outline button-large">LOGIN</button>
            </div>
            
        </form>
    </div>
    `;

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document
        .getElementById("loginPassword")
        .value.trim();

      // Usar función de validación
      if (!loginValidations(loginEmail, loginPassword)) {
        return;
      }

      // Traer usuarios de la base de datos
      const users = await getUsers();

      // Asegurarse
      if (!Array.isArray(users)) {
        showToast("datos inválidos recibido de la API", "error");
        throw new Error("Datos inválidos recibidos de la API");
      }

      // Buscar un usuario con email y contraseña que coincidan
      const matchedUser = users.find(
        (user) => user.email === loginEmail && user.password === loginPassword
      );

      showSpinner(container, "Logging in...");

      if (matchedUser) {
        // Store the matched user in localStorage
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        renderNavbar(matchedUser);
        navigate("/");
        showToast("Login success", "success");
      } else {
        // Handle invalid credentials
        console.error("No se encontró un usuario coincidente.");
        showToast("Login error: email or password incorrect", "error");
      }
    } catch (error) {
      // Handle errors from getUsers or other issues
      console.error("sigup error:", error);
      showToast("Sigup error", "error");
    }
  });
}
