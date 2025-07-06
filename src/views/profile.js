import { editUser, getCurrentUser } from "../api/apiUsers.js";

export function Profile(container, params) {
  const userId = params.id; //user.id de localstorage
  container.innerHTML = `<h1>Perfil del usuario ${userId}</h1>`;

  userProfile(container);
}

function userProfile(container) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    alert("You are not logged in. Please return to login.");
    return;
  }

  const profileContainer = document.createElement("div");

  const welcomeMessage = document.createElement("h2");
  welcomeMessage.textContent = `Welcome ${currentUser.name}! Enjoy your films.`;

  // Foto de perfil:
  const profileImage = document.createElement("img");
  profileImage.className = "profile-image";
  profileImage.src =
    currentUser.imageURL || "/assets/images/icons8-user-64.png";
  profileImage.alt = "Profile image";

  const imageOptions = [
    "/assets/images/Avatar1.png",
    "/assets/images/Avatar2.png",
    "/assets/images/Avatar3.png",
  ];

  const imageSelector = document.createElement("div");
  imageSelector.className = "image-selector";

  imageOptions.forEach((imageUrl) => {
    const option = document.createElement("img");
    option.className = "profile-option";
    option.src = imageUrl;
    option.alt = "Profile image option";

    option.addEventListener("click", () => {
      profileImage.src = imageUrl;
      currentUser.imageURL = imageUrl;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    });

    imageSelector.appendChild(option);
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
    "Tenerife",
    "La Palma",
    "La Gomera",
    "El Hierro",
    "Gran Canaria",
    "Fuerteventura",
    "Lanzarote",
    "La Graciosa",
  ];

  editIslands.forEach((editIsland) => {
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

    // Mostrar loading state
    const saveButton = editForm.querySelector("button[type='submit']");
    const originalText = saveButton.textContent;
    saveButton.textContent = "Updating...";
    saveButton.disabled = true;

    try {
      //   if (passwordInput.value !== repeatPasswordInput.value) {
      //     alert("Repeat password must be the same password");
      //   return;
      // }

      const updatedUser = {
        name: editName.value,
        email: editEmail.value,
        password: editPassword.value,
        island: editIslandSelect.value,
      };

      await editUser(currentUser.id, updatedUser);

      const newUser = {
        ...currentUser,
        ...updatedUser,
      };
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      // Restaurar botón
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    }
  });

  // Botón Logout:
  // const logOutButton = document.createElement("button");
  // logOutButton.textContent = "Log out";
  // logOutButton.addEventListener("click", () => {
  //   localStorage.removeItem("current-user");
  //   navigate("/login");
  // });
  // profileContainer.appendChild(logOutButton);

  profileContainer.appendChild(welcomeMessage);
  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(imageSelector);
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
