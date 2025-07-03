export function Login(container) {
  container.innerHTML = `
    <div class="login-container">
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
        </div>
    `; //Da error, cambiar <div class="login-container"> por un <form> con un id y luego hacer un evento del formulario------------------------------------

  // Función para validar el login
  function validateLogin() {
    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();
    const loginEmailError = document.getElementById("loginEmailError");
    const loginPasswordError = document.getElementById("loginPasswordError");

    // Resetear mensajes de error
    loginEmailError.style.display = "none";
    loginPasswordError.style.display = "none";

    //METER VALIDACIONES EN VALIDATIONS.JS--------------------
    // Validaciones
    let isValid = true;

    if (!loginEmail) {
      loginEmailError.textContent = "User field is required";
      loginEmailError.style.display = "block";
      isValid = false;
    }

    if (!loginPassword) {
      loginPasswordError.textContent = "El password field is required";
      loginPasswordError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // Verificar credenciales contra la base de datos
    const user = usersDatabase.find(
      (user) => user.email === loginEmail && user.password === loginPassword
    );

    if (user) {
      alert("¡Login successful! Welcome! " + loginEmail);
      // Aquí puedes redirigir a otra página o realizar otras acciones
    } else {
      passwordError.textContent = "Incorrect useremail or password";
      passwordError.style.display = "block";
    }
  }
}
