import { getUsers } from "../api/apiUsers";
import { navigate } from "../router";
import { loginValidations } from "../utils/validations";
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

    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    // Usar función de validación
    if (!loginValidations(loginEmail, loginPassword)) {
        return;
    }

    try {
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
        console.log("Login successful! User stored in localStorage:", matchedUser
        );
        // Actualizar navbar
        renderNavbar(matchedUser);
        showToast("login successful", 'success');
        navigate("/");
      } else {
        // Manejar credenciales inválidas                     
        showToast("login error: email or password incorrect", 'error');
      }
    } catch (error) {
      // Manejar errores de getUsers o otros problemas       
        console.error("Login error:", error);
         showToast("login error", 'error');
    }
  });
}
