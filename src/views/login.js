import { getUsers } from "../api/apiUsers";
import { navigate } from "../router";
import { loginValidations } from "../utils/validations";

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
        throw new Error("Datos inválidos recibidos de la API");
      }

      // Buscar un usuario con email y contraseña que coincidan
      const matchedUser = users.find(
        (user) => user.email === loginEmail && user.password === loginPassword
      );

      if (matchedUser) {
        // Almacenar el usuario que coincide en localStorage
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        console.log(
          "Login successful! User stored in localStorage:",
          matchedUser
        );
        navigate("/");
      } else {
        // Manejar credenciales inválidas
        // Aquí irá el Toastify para credencia  les inválidas
        document.getElementById("loginPassword").value = "";
        console.error("No se encontró un usuario coincidente.");
      }
    } catch (error) {
      // Manejar errores de getUsers o otros problemas
      // Aquí irá el Toastify para errores de conexión
      document.getElementById("loginPassword").value = "";
      console.error("Login error:", error);
    }
  });
}
