import { editUser, getCurrentUser } from "../api/apiUsers";
import { dataValidations } from "../utils/validations.js";
import defaultAvatar from "../assets/images/default-avatar.png";
import avatar1 from "../assets/images/avatar1.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.png";
import { getAllMovies } from "../api/apiTMDB";
import { showToast } from "../utils/toastify.js";

export function Profile(container, params) {
  const userId = params.id; //user.id de localstorage
  container.innerHTML = `<h1>Perfil del usuario ${userId}</h1>`;

  userProfile(container);
}

function userProfile(container) {
  const currentUser = getCurrentUser();

  if (!currentUser) {    
    showToast("You are not logged in. Please return to login.", 'error');
    return;
  }

  const profileContainer = document.createElement("div");

  const welcomeMessage = document.createElement("h2");
  welcomeMessage.textContent = `Welcome ${currentUser.name}! Enjoy your films.`;

  const profileImage = document.createElement("img");
  profileImage.className = "profile-image";

  profileImage.src = currentUser.imageURL || defaultAvatar;
  profileImage.alt = "Profile image";
  
  const avatarOptionsContainer = document.createElement("div");
  avatarOptionsContainer.className = "avatar-options hidden";
  
  const avatarOptions = [avatar1, avatar2, avatar3];
  
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
        await editUser(currentUser.id, {imageURL: avatar});
      } catch (error) {
        console.error("Error al actualizar avatar en backend:", error);
      }
    });
    
    avatarOptionsContainer.appendChild(option);
  });
  
  const changeAvatarButton = document.createElement("button");
  changeAvatarButton.textContent = "Change avatar";
  changeAvatarButton.type = "button";
  
  changeAvatarButton.addEventListener("click", () => {
    avatarOptionsContainer.classList.toggle("hidden");
  });
  
  const userInfo = document.createElement("div");
  userInfo.innerHTML = `
    <p>Nombre: ${currentUser.name}</p>
    <p>Email: ${currentUser.email}</p>`;

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
  

  const userFavoriteIds = currentUser.favorites || [];
  console.log("Favorite IDs:", userFavoriteIds);

  getAllMovies().then((allMovies) => {
    console.log("All Movies:", allMovies);

    const favoriteMovies = allMovies.filter(movie =>
      userFavoriteIds.includes(movie.id)
    );

    console.log("Matched favorite movies:", favoriteMovies);

    const favoritesSection = document.createElement("div");
    favoritesSection.className = "favorites-section";
    favoritesSection.innerHTML = `
      <h3>Your favorite movies:</h3>
      <section class="movies-grid">
        ${renderMovieCards(favoriteMovies, userFavoriteIds)}
      </section>
    `;

    profileContainer.appendChild(favoritesSection);

    const favButtons = favoritesSection.querySelectorAll(".fav-btn");
    favButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const movieId = parseInt(button.getAttribute("data-id"), 10);
        currentUser.favorites = currentUser.favorites.filter(id => id !== movieId);
        
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        
        container.innerHTML = "";
        userProfile(container);
      });
    });
  });
  container.appendChild(profileContainer);
}

function renderMovieCards(movies, favoriteIds = []) {
  return movies
    .map((movie) => {
      const isFavorite = favoriteIds.includes(movie.id);
      const heartIcon = isFavorite ? "❤️" : "🤍";

      return `
        <div class="movie-wrapper">
          <a href="/movie/${movie.id}" data-link class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>${movie.release_date}</p>
              <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            </div>
          </a>
          <button class="fav-btn" data-id="${movie.id}" title="Toggle favorite">
            ${heartIcon}
          </button>
        </div>
      `;
    })
    .join("");
}