import { editUser, getCurrentUser, updateFavoritesBackend } from "../api/apiUsers";
import { getAllMovies } from "../api/apiTMDB";
import { renderMovies } from "../utils/render.js";
import { dataValidations } from "../utils/validations.js";
import { showToast } from "../utils/toastify.js";
import defaultAvatar from "../assets/images/default-avatar.png";
import avatar1 from "../assets/images/cat-avatar.png";
import avatar2 from "../assets/images/chicken-avatar.png";
import avatar3 from "../assets/images/dog-avatar.png";
import avatar4 from "../assets/images/panda-avatar.png"

export async function Profile(container) {
  const currentUser = getCurrentUser();

  if (!currentUser) {    
    showToast("You are not logged in. Please return to login.", 'error');
    return;
  }

  const profileSection = document.createElement("section");
  profileSection.className = "profile-section";

  const profileContainer = document.createElement("div");
  profileContainer.className = "profile-container";

  const welcomeMessage = document.createElement("h2");
  welcomeMessage.textContent = `Welcome ${currentUser.name}! Enjoy your films.`;

  const profileImage = document.createElement("img");
  profileImage.className = "profile-image";

  const avatarOptions = [avatar1, avatar2, avatar3, avatar4];

  const isValidAvatar = avatarOptions.includes(currentUser.imageURL);
  const imageToUse = isValidAvatar ? currentUser.imageURL : defaultAvatar;

  profileImage.src = imageToUse;
  profileImage.alt = "Profile image";

  const avatarOptionsContainer = document.createElement("div");
  avatarOptionsContainer.className = "avatar-options hidden";
  
  avatarOptions.forEach(avatar => {
    const option = document.createElement("img");
    option.className = "profile-option";
    option.src = avatar;
    option.alt = "Profile image option";
    
    option.addEventListener("click", async () => {
      profileImage.src = avatar;
      currentUser.imageURL = avatar;
      
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      try {
        await editUser(currentUser.id, { imageURL: avatar });
      } catch (error) {
        console.error("Error al actualizar avatar en backend:", error);
      }
    });
    
    avatarOptionsContainer.appendChild(option);
  });
  
  const changeAvatarButton = document.createElement("button");
  changeAvatarButton.textContent = "Change avatar";
  changeAvatarButton.type = "button";
  changeAvatarButton.className = "avatar button-primary";

  changeAvatarButton.addEventListener("click", () => {
    avatarOptionsContainer.classList.toggle("hidden");
  });
  
  const userInfo = document.createElement("div");
  userInfo.innerHTML = `<div class="profile-info">
    <p>Nombre: ${currentUser.name}</p>
    <p>Email: ${currentUser.email}</p>
    </div>`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit profile";
  editButton.className = "edit button-primary";

  const editForm = document.createElement("form");
  editForm.classList.add("hidden", "profile-form");

  const editName = document.createElement("input");
  editName.type = "text";
  editName.id = "edit-name";
  editName.value = currentUser.name;
  editName.className = "profile-input";

  const editEmail = document.createElement("input");
  editEmail.type = "email";
  editEmail.id = "edit-email";
  editEmail.value = currentUser.email;
  editEmail.className = "profile-input";

  const editPassword = document.createElement("input");
  editPassword.type = "password";
  editPassword.id = "edit-password";
  editPassword.className = "profile-input";
  editPassword.placeholder = "New password";
  
  const repeatPasswordInput = document.createElement("input");
  repeatPasswordInput.type = "password";
  repeatPasswordInput.id = "repeat-password";
  repeatPasswordInput.className = "profile-input";
  repeatPasswordInput.placeholder = "Repeat password";
  
  const editIslandSelect = document.createElement("select");
  editIslandSelect.id = "edit-island";
  editIslandSelect.className = "profile-select";
  
  const editIslands = [
    {label: "Select your island", value: ""},
    {label: "Tenerife", value: "Tfe"},
    {label: "La Palma", value: "LPa"},
    {label: "La Gomera", value: "Gom"},
    {label: "El Hierro", value: "Hrr"},
    {label: "Gran Canaria", value: "GranC"},
    {label: "Fuerteventura", value: "Fvra"},
    {label: "Lanzarote", value: "Lzte"},
    {label: "La Graciosa", value: "LGra"},
  ];
  
  editIslands.forEach((islandOption) => {
    const option = document.createElement("option");
    option.value = islandOption.value;
    option.textContent = islandOption.label;
    
    if (islandOption.value === currentUser.island) {
      option.selected = true;
    }
    
    editIslandSelect.appendChild(option);
  });

  const saveButton = document.createElement("button");
  saveButton.textContent = "Update profile";
  saveButton.type = "submit";
  saveButton.className = "save button-secondary";

  editButton.addEventListener("click", () => {
    editForm.classList.toggle("hidden");
  });

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const saveButton = editForm.querySelector("button[type='submit']");
    const originalText = saveButton.textContent;
    saveButton.textContent = "Updating...";
    saveButton.disabled = true;
    
    const name = editName.value.trim();
    const email = editEmail.value.trim();
    const password = editPassword.value;
    const repeatPassword = repeatPasswordInput.value;
    const island = editIslandSelect.value;
    
    const updatedUser = {};
    if (name && name !== currentUser.name) updatedUser.name = name;
    if (email && email !== currentUser.email) updatedUser.email = email;
    if (password) {
      updatedUser.password = password;
      updatedUser.repeatPassword = repeatPassword;
    }
    if (island !== currentUser.island) updatedUser.island = island;
    
    const isValid = dataValidations({
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      repeatPassword: updatedUser.repeatPassword,
    });
    
    if (!isValid) {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
      return;
    }
    
    await editUser(currentUser.id, updatedUser);    
    
    const newUser = {
      ...currentUser,
      ...updatedUser,
    };
    
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    showToast("Profile updated", 'success');
    setTimeout(() => {
      window.location.reload();
    },1000);
  });
  
  profileContainer.appendChild(welcomeMessage);
  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(changeAvatarButton);
  profileContainer.appendChild(avatarOptionsContainer);
  profileContainer.appendChild(userInfo);
  profileContainer.appendChild(editButton);
  profileContainer.appendChild(editForm);
  editForm.appendChild(editName);
  editForm.appendChild(editEmail);
  editForm.appendChild(editPassword);
  editForm.appendChild(repeatPasswordInput);
  editForm.appendChild(editIslandSelect);
  editForm.appendChild(saveButton);
  profileSection.appendChild(profileContainer);
  
  const userFavoriteIds = currentUser.favorites || [];
  console.log("Favorite IDs:", userFavoriteIds);

  try {
    const allMovies = await getAllMovies();
    console.log("All Movies:", allMovies);

    const favoriteMovies = allMovies.filter(movie =>
      userFavoriteIds.includes(movie.id)
    );
     
    console.log("Matched favorite movies:", favoriteMovies);
    
    const favoritesSection = document.createElement("div");
    favoritesSection.className = "favorites-section";
    
    const favTitle = document.createElement("h3");
    favTitle.textContent = "Your favorite movies:";
    favoritesSection.appendChild(favTitle);

    const favoritesCards = document.createElement("div");
    favoritesCards.className = "movie-list";
    favoritesSection.appendChild(favoritesCards);

    renderMovies(favoritesCards, favoriteMovies, userFavoriteIds, async (movieId) => {
      currentUser.favorites = currentUser.favorites.filter(id => id !== movieId);
      await updateFavoritesBackend(currentUser.id, currentUser.favorites);
      
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
     
      container.innerHTML = "";
      Profile(container);
    });
    
    const moviesGridSection = favoritesCards.querySelector(".movies-grid");
    if (moviesGridSection) {
      moviesGridSection.classList.add("favorites-cards");
    }
    
    profileContainer.appendChild(favoritesSection);

  } catch (error) {
    showToast("Failed to load favorite movies.", "error");
  }
  container.appendChild(profileSection);
}