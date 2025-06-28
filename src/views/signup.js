import { createNewUser } from "../api/apiUsers";


const container = document.getElementById ("app");
const newUserdiv = document.createElement ("div");
newUserdiv.classList.add ("divNewUser");
container.appendChild(newUserdiv);
newUserdiv.innerHTML =`
<form id = "divNewUserForm">
    <h2 id="registerFormH2">Register form</h2>
    <input type="text" id="registerFormName" placeholder="Name" required>
    <input type="email" id="registerFormEmail" placeholder="Email" required>
    <input type="password" id="registerFormPassword" placeholder="Password" required>
    <input type="text" id="registerFormCountry" placeholder="Country">
    <button type="submit">Sign up</button>
</form>`

const formNewuser = document.getElementById("divNewUserForm")

formNewuser.addEventListener ("submit", function (event){
    event.preventDefault();
    const name = document.getElementById("registerFormName").value.trim();
    const email = document.getElementById("registerFormEmail").value.trim();
    const password = document.getElementById("registerFormPassword").value.trim();
    const country = document.getElementById("registerFormCountry").value.trim();

    createNewUser({
        name,
        email,
        password,
        country
    })

})

