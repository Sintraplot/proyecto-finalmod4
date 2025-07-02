export function Login(container) {

 // Simulación de base de datos con usuarios
const usersDatabase = [
    { useremail: "admin", password: "admin123" },
    { useremail: "user1", password: "password1" },
    { useremail: "user2", password: "password2" }
];
 
const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-container">
            <h2>Login</h2>
            <div class="form-group">
                <label for="useremail">Email:</label>
                <input type="text" id="email" placeholder="Enter your useremail">
                <div id="username-error" class="error"></div>
            </div>
            <div class="form-group">
                <label for="password">password:</label>
                <input type="password" id="password" placeholder="Enter password">
                <div id="password-error" class="error"></div>
            </div>
            <button onclick="validateLogin()">Login</button>
        </div>
    `;



// Función para validar el login
function validateLogin() {
    const useremail = document.getElementById('useremail').value.trim();
    const password = document.getElementById('password').value.trim();
    const useremailError = document.getElementById('useremail-error');
    const passwordError = document.getElementById('password-error');

    // Resetear mensajes de error
    useremailError.style.display = 'none';
    passwordError.style.display = 'none';

    // Validaciones
    let isValid = true;

    if (!useremail) {
        usernameError.textContent = 'User field is required';
        usernameError.style.display = 'block';
        isValid = false;
    }

    if (!password) {
        passwordError.textContent = 'El password field is required';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    // Verificar credenciales contra la base de datos
    const user = usersDatabase.find(user => 
        user.useremail === useremail && user.password === password
    );

    if (user) {
        alert('¡Login successful! Welcome! ' + useremail);
        // Aquí puedes redirigir a otra página o realizar otras acciones
    } else {
        passwordError.textContent = 'Incorrect useremail or password';
        passwordError.style.display = 'block';
    }
  }
} 
