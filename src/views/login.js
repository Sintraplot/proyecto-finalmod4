import { getUsers } from "../api/apiUsers.js";
import { navigate } from "../router.js";
import { loginValidations } from "../utils/validations.js";
import { renderNavbar } from "../utils/navbar.js";
import { showToast } from "../utils/toastify.js";

export function Login(container) {
  container.innerHTML = `
    <form class="login-container" id= "login-form">
            <h2>Login</h2>
            <div class="form-group">
                <label for="loginEmail">Email:</label>
                <input type="text" id="loginEmail" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="loginPassword">password:</label>
                <input type="password" id="loginPassword" placeholder="Enter password">
            </div>
            <button type="submit">Login</button>
        </form>
    `;

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Mostrar loading state
    const submitButton = loginForm.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Logging in...";
    submitButton.disabled = true;

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
        showToast("datos inválidos recibido de la API", 'error')
        throw new Error("Datos inválidos recibidos de la API");
      }

      // Buscar un usuario con email y contraseña que coincidan
      const matchedUser = users.find(
        (user) => user.email === loginEmail && user.password === loginPassword
      );

      if (matchedUser) {
        // Almacenar el usuario que coincide en localStorage
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));

        // Actualizar navbar
        renderNavbar(matchedUser);

        // Navegar inmediatamente
        navigate("/");
      } else {
        // Manejar credenciales inválidas
        // Aquí irá el Toastify para credenciales inválidas
        document.getElementById("loginPassword").value = "";
        console.error("No se encontró un usuario coincidente.");
      }
    } catch (error) {
      // Manejar errores de getUsers o otros problemas
      // Aquí irá el Toastify para errores de conexión
      document.getElementById("loginPassword").value = "";
      console.error("Login error:", error);
    } finally {
      // Restaurar botón
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}
