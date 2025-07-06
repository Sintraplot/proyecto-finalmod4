import { createNewUser } from "../api/apiUsers.js";
import { showToast } from "../utils/toastify.js";
import { dataValidations } from "../utils/validations";

export function Signup(container) {
  const newUserdiv = document.createElement("div");
  newUserdiv.classList.add("divNewUser");
  container.appendChild(newUserdiv);
  newUserdiv.innerHTML = `
    <form id = "divNewUserForm">
    <h2 id="registerFormH2">Register form</h2>
    <input type="text" id="registerFormName" placeholder="Name" required>
    <input type="email" id="registerFormEmail" placeholder="Email" required>
    <input type="password" id="registerFormPassword" placeholder="Password" required>
    <input type="password" id="registerFormRepPassword" placeholder="Repeat password" required>
    <label for="registerFormIsland">Island of residence</label>
    <select name="registerFormIsland" id="registerFormIsland">
     <option value="" disabled selected>Select your island</option>
     <option value="Tfe">Tenerife</option>
     <option value="LPa">La Palma</option>
     <option value="Gom">La Gomera</option>
     <option value="Hrr">El Hierro</option>
     <option value="GranC">Gran Canaria</option>
     <option value="Fvra">Fuerteventura</option>
     <option value="Lzte">Lanzarote</option>
     <option value="LGra">La Graciosa</option>
    </select>
    <button type="submit">Sign up</button>
    </form>`;

  const formNewUser = document.getElementById("divNewUserForm");

  formNewUser.addEventListener("submit", async (event) => {
    event.preventDefault();
    const signupName = document.getElementById("registerFormName").value.trim();
    const signupEmail = document
      .getElementById("registerFormEmail")
      .value.trim();
    const signupPassword = document
      .getElementById("registerFormPassword")
      .value.trim();
    const signupRepPassword = document
      .getElementById("registerFormRepPassword")
      .value.trim();
    const signupIsland = document
      .getElementById("registerFormIsland")
      .value;

    const validations = dataValidations({name: signupName, email: signupEmail, password: signupPassword, repeatPassword: signupRepPassword, island: signupIsland});
    
    if(validations) {
      const userData = {
      signupName,
      signupEmail,
      signupPassword,
      signupIsland
    };

    try {
      await createNewUser(userData);
      showToast("sigup successful", "success");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Error de registro", error);
      showToast("Error de registro: No se pudi crear el usuario", "error");
    }   
    }
  });
}
