import { editUser, getCurrentUser } from "../api/apiUsers";
import defaultAvatar from "../assets/images/default-avatar.png";
import avatar1 from "../assets/images/avatar1.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.png";

export function Profile(container, params) {
  const userId = params.id; //user.id de localstorage
  container.innerHTML = `<h1>Perfil del usuario ${userId}</h1>`;
  
  userProfile(container);
}

function userProfile(container) {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    alert("You are not logged in. Please return to login.")
    return;
  }

  const profileContainer = document.createElement("div");

  const welcomeMessage = document.createElement("h2");
  welcomeMessage.textContent = `Welcome ${currentUser.name}! Enjoy your films.`;

  // Foto de perfil:
  const profileImage = document.createElement("img");
  profileImage.className = "profile-image";
  profileImage.src = currentUser.avatar || defaultAvatar;
  profileImage.alt = "Profile image";

  const imageSelectorContainer = document.createElement("div");
  imageSelectorContainer.className = "image-selector-container";

  const changeAvatarButton = document.createElement("button");
  changeAvatarButton.textContent = "Change avatar";
  changeAvatarButton.type = "button";

  const avatarOptionsContainer = document.createElement("div");
  avatarOptionsContainer.className = "avatar-options";

  const avatarOptions = [avatar1, avatar2, avatar3];

  avatarOptions.forEach(avatar => {
    const option = document.createElement("img");
    option.className = "profile-option";
    option.src = avatar;
    option.alt = "Profile image option";

    option.addEventListener("click", () => {
      profileImage.src = avatar;
      currentUser.avatar = avatar;
      localStorage.setItem("current-user", JSON.stringify(currentUser));
    });

    avatarOptionsContainer.appendChild(option);
  });

// Mostrar/Ocultar al hacer click
changeAvatarButton.addEventListener("click", () => {
  avatarOptionsContainer.classList.toggle("hidden");
});

  const userInfo = document.createElement("div");
  userInfo.innerHTML = `
    <p>Nombre: ${currentUser.name}</p>
    <p>Email: ${currentUser.email}</p>`;

  //Editar usuario

  const editButton = document.createElement("button");
  editButton.textContent = "Edit profile";
  editButton.className = "edit-profile-button";

  const editForm = document.createElement("form");
  editForm.classList.add("hidden");

  const editName = document.createElement("input");
  editName.type = "text";
  editName.id = "edit-name";
  editName.value = currentUser.name;

  const editEmail = document.createElement("input");
  editEmail.type = "email";
  editEmail.id = "edit-email";
  editEmail.value = currentUser.email;

  const editPassword = document.createElement("input");
  editPassword.type = "password";
  editPassword.id = "edit-password";
  editPassword.placeholder = "New password";

  const repeatPasswordInput = document.createElement("input");
  repeatPasswordInput.type = "password";
  repeatPasswordInput.id = "repeat-password";
  repeatPasswordInput.placeholder = "Repeat password";

  const editIslandSelect = document.createElement("select");
  editIslandSelect.id = "edit-island";
  const editIslands = [
    "Tenerife", "La Palma", "La Gomera", "El Hierro", "Gran Canaria", "Fuerteventura", "Lanzarote", "La Graciosa"
  ];

  editIslands.forEach(editIsland => {
    const option = document.createElement("option");
    option.value = editIsland;
    option.textContent = editIsland;
    if (editIsland === currentUser.island) {
      option.selected = true;
    }
    editIslandSelect.appendChild(option);
  });

  //Guardar cambios

  const saveButton = document.createElement("button");
  saveButton.textContent = "Update profile";
  saveButton.type = "submit";

  editButton.addEventListener("click", () => {
    editForm.classList.toggle("hidden");
  });
  
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
  //   if (passwordInput.value !== repeatPasswordInput.value) {
  //     alert("Repeat password must be the same password");
  //   return;
  // }
  
  const updatedUser = {
    name: editName.value,
    email: editEmail.value,
    password: editPassword.value,
    island: editIslandSelect.value
  };

  await editUser(currentUser.id, updatedUser);

  const newUser = {
    ...currentUser,
    ...updatedUser,
  };
  localStorage.setItem("current-user", JSON.stringify(newUser));
  window.location.reload();
});

  profileContainer.appendChild(welcomeMessage);
  profileContainer.appendChild(profileImage);
  // profileContainer.appendChild(imageSelector);

  imageSelectorContainer.appendChild(changeAvatarButton);
  imageSelectorContainer.appendChild(avatarOptionsContainer);
  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(imageSelectorContainer);

  profileContainer.appendChild(userInfo);
  profileContainer.appendChild(editButton);
  profileContainer.appendChild(editForm);
  editForm.appendChild(editName);
  editForm.appendChild(editEmail);
  editForm.appendChild(editPassword);
  editForm.appendChild(repeatPasswordInput);
  editForm.appendChild(editIslandSelect);
  editForm.appendChild(saveButton);

  container.appendChild(profileContainer);
}