import { createNewUser } from "../api/apiUsers.js";
import { dataValidations } from "../utils/validations.js";
import { navigate } from "../router.js";

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

    // Mostrar loading state
    const submitButton = formNewUser.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Creating account...";
    submitButton.disabled = true;

    try {
      const signupName = document
        .getElementById("registerFormName")
        .value.trim();
      const signupEmail = document
        .getElementById("registerFormEmail")
        .value.trim();
      const signupPassword = document
        .getElementById("registerFormPassword")
        .value.trim();
      const signupRepPassword = document
        .getElementById("registerFormRepPassword")
        .value.trim();
      const signupIsland = document.getElementById("registerFormIsland").value;

      const validations = dataValidations({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        repeatPassword: signupRepPassword,
        island: signupIsland,
      });

      if (validations) {
        const userData = {
          signupName,
          signupEmail,
          signupPassword,
          signupIsland,
        };

        await createNewUser(userData);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      // Restaurar botón
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}
