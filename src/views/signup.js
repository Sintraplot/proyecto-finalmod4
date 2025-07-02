import { createNewUser } from "../api/apiUsers.js";
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
    <input type="text" id="registerFormIsland" placeholder="Island">
    <button type="submit">Sign up</button>
    </form>`;

  const formNewUser = document.getElementById("divNewUserForm");

  formNewUser.addEventListener("submit", async (event) => {
    event.preventDefault();
    const signupName = document.getElementById("registerFormName").value.trim();
    const signupEmail = document.getElementById("registerFormEmail").value.trim();
    const signupPassword = document
      .getElementById("registerFormPassword")
      .value.trim();
    const signupRepPassword = document
      .getElementById("registerFormRepPassword")
      .value.trim();
    const signupIsland = document.getElementById("registerFormIsland").value.trim();

    const validations = dataValidations({name: signupName, email: signupEmail, password: signupPassword}); //incluir repeatpassword});
    
    if(validations) {
      const userData = {
      signupName,
      signupEmail,
      signupPassword }; //incluir repeatPassword

      await createNewUser(userData);
}
});
}
