import { createNewUser } from "../api/apiUsers.js";
import { dataValidations } from "../utils/validations.js";
import { navigate } from "../router.js";
import { showToast } from "../utils/toastify.js";
import { showSpinner } from "../utils/spinner.js";

export function Signup(container) {
  container.innerHTML = "";
  const newUserdiv = document.createElement("div");
  newUserdiv.classList.add("divNewUser");
  container.appendChild(newUserdiv);
  newUserdiv.innerHTML = `
    <div class="div-form-sign-up">
       <form id = "divNewUserForm">
         <h2 id="registerFormH2" class="sign-up-title">Register form</h2>
         <input type="text" class= "signup-input" id="registerFormName" placeholder="(*)Name" required>
         <input type="email" id="registerFormEmail"class="signup-input" placeholder="(*)Email" required>
         <input type="password" id="registerFormPassword" class= "signup-input" placeholder="(*)Password" required>
         <input type="password" id="registerFormRepPassword" class= "signup-input"placeholder="(*)Repeat password" required>
         <label for="registerFormIsland" class="sign-up-text-label">(*)Island of residence</label>
         <select name="registerFormIsland" id="registerFormIsland"  class= "signup-input">
            <option value="" disabled selected>Select your island</option>
            <option value="Tfe" >Tenerife</option>
            <option value="LPa">La Palma</option>
            <option value="Gom">La Gomera</option>
            <option value="Hrr">El Hierro</option>
            <option value="GranC">Gran Canaria</option>
            <option value="Fvra">Fuerteventura</option>
            <option value="Lzte">Lanzarote</option>
            <option value="LGra">La Graciosa</option>
         </select>
         <small class="small-sign-up">(*)All fields are required.</small>
         <button type="submit" class= "button-large button-outline">SIGN UP</button>
       </form>
     </div>`;

  const formNewUser = document.getElementById("divNewUserForm");

  formNewUser.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const signupNameInput = document.getElementById("registerFormName");
      const signupEmailInput = document.getElementById("registerFormEmail");
      const signupPasswordInput = document.getElementById(
        "registerFormPassword"
      );
      const signupRepPasswordInput = document.getElementById(
        "registerFormRepPassword"
      );
      const signupIslandInput = document.getElementById("registerFormIsland");

      const signupName = signupNameInput.value.trim();
      const signupEmail = signupEmailInput.value.trim();
      const signupPassword = signupPasswordInput.value.trim();
      const signupRepPassword = signupRepPasswordInput.value.trim();
      const signupIsland = signupIslandInput.value;

      const validations = dataValidations({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        repeatPassword: signupRepPassword,
        island: signupIsland,
      });

      showSpinner(container, "Creating account...");

      if (validations) {
        const userData = {
          signupName,
          signupEmail,
          signupPassword,
          signupIsland,
        };
        showToast("Registered User", "success");

        await createNewUser(userData);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });
}
