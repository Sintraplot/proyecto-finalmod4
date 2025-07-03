import { editUser } from "./api/apiUsers.js";
import { getCurrentUser } from "./api/apiUsers.js";

export function Profile(container, params) {
  const userId = params.id; //user.id de localstorage
  container.innerHTML = `<h1>Perfil del usuario ${userId}</h1>`;



function userProfile() {
  let currentUser = localStorage.getItem("Current user");
  currentUser = JSON.parse(currentUser); 

const welcomeMessage = document.createElement("h2");
welcomeMessage.textContent = `Welcome ${currentUser.name}, enjoy your films!`;

//Editar perfil

const editButton = document.createElement("button");
editButton.textContent = "Edit profile";

  
//Cerrar sesión

const logOutButton = document.createElement("button");
logOutButton.textContent = "Log out";

logOutButton.addEventListener("click", () => {
  localStorage.removeItem("current-user");

  //¿Llevar a login de nuevo?
});

container.appendChild(welcomeMessage);
container.appendChild(editButton)
container.appendChild(logOutButton);
  
}
}
