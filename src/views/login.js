import { getUsers } from "../api/apiUsers";
import { navigate} from "../router";
export function Login(container) {
  container.innerHTML = `
    <form class="login-container" id= "login-form">
            <h2>Login</h2>
            <div class="form-group">
                <label for="loginEmail">Email:</label>
                <input type="text" id="loginEmail" placeholder="Enter your email">
                <div id="loginEmailError" class="error"></div>
            </div>
            <div class="form-group">
                <label for="loginPassword">password:</label>
                <input type="password" id="loginPassword" placeholder="Enter password">
                <div id="loginPasswordError" class="error"></div>
            </div>
            <button type="submit">Login</button>
        </form>
    `; 

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document.getElementById("loginPassword").value.trim();

    if (!loginEmail || !loginPassword) {
        document.getElementById("loginEmailError").textContent = !loginEmail ? "El email es requerido" : "";
        document.getElementById("loginPasswordError").textContent = !loginPassword ? "La contraseña es requerida" :"";
        return;
    }

    try {
        // Fetch users from the database
        const users = await getUsers();

        // Asegurarse 
        if (!Array.isArray(users)) {
            throw new Error("Datos inválidos recibidos de la API");
        }

        // Find a user with matching email and password
        const matchedUser = users.find(user => 
            user.email === loginEmail && user.password === loginPassword
        );

        if (matchedUser) {
            // Store the matched user in localStorage
            localStorage.setItem("usuario", JSON.stringify(matchedUser));
            console.log("Login successful! User stored in localStorage:", matchedUser);
            // Optionally redirect or perform other actions
            // window.location.href = '/dashboard.html';
            navigate("/");
        } else {
            // Handle invalid credentials
            document.getElementById("loginEmailError").textContent = "Email o contraseña inválidos";
            document.getElementById("loginPasswordError").textContent = "Email o contraseña inválidos";
            document.getElementById("loginPassword").value = "";
            console.error("No se encontró un usuario coincidente.");
        }
    } catch (error) {
        // Handle errors from getUsers or other issues
        document.getElementById("loginEmailError").textContent = "An error occurred during login. Try again.";
        document.getElementById("loginPassword").value = "";
        console.error("Login error:", error);
    }
  
  });
}
