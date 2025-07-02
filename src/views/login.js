export function Login(container) {
  //Esc
  document.getElementById('app').innerHTML = `
    <div class="login-container">
        <form id="loginForm">
            <h2>Sign In</h2>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required placeholder="Enter your username">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="Enter your password">
            <button type="submit">Sign In</button>
            <p id="errorMessage" class="error-message"></p>
        </form>
    </div>
`;

// Añade un manejador de eventos al formulario para procesar el envío
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el envío predeterminado del formulario

    // Obtiene los valores de los campos y elimina espacios en blanco
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Valida campos y credenciales, muestra error o redirige
    errorMessage.style.display = 'block';
    errorMessage.textContent = username && password 
        ? username === 'admin' && password === 'password123' 
            ? (alert('Login successful!'), window.location.href = '/', '') 
            : 'Invalid username or password'
        : 'Please fill in all fields';
});



}
