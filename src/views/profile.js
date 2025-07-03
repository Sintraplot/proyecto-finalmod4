// import { getCurrentUser, editUser } from "./api/apiUsers.js";

export function Profile(container, params) {
  const userId = params.id;
  container.innerHTML = `<h1>Perfil del usuario ${userId}</h1>`;

  // userProfile(container);
}

// function userProfile(container) {
// let currentUser = localStorage.getItem("Current user");
// currentUser = JSON.parse(currentUser);

// const profileContainer = document.createElement("div");
// profileContainer.id = "profile-container";

// const welcomeMessage = document.createElement("h2");
// welcomeMessage.textContent = `Welcome ${currentUser.name}, enjoy your films!`;


// // Imagen de perfil por defecto o guardada previamente:
// const profileImage = document.createElement("img");
// profileImage.alt = "Profile image";
// profileImage.className = "profile-picture";

// // Revisar localStorage o usar imagen por defecto:
// const currentUserImage = localStorage.getItem("current-user-image");
// profileImage.src = currentUserImage || currentUser.imageURL || "/assets/default-profile.jpg";

// // Input para subir imágenes:
// const newImageInput = document.createElement("input");
// newImageInput.type = "file";
// newImage.accept = "image/*";
// newImageInput.id = "image-upload";

// // Label estilizada (opcional pero recomendado):
// const uploadLabel = document.createElement("label");
// uploadLabel.setAttribute("for", "image-upload");
// uploadLabel.className = "upload-label";
// uploadLabel.textContent = "Cambiar foto";

// // Evento para manejar subida de imagen:
// imageUploadInput.addEventListener("change", (event) => {
//   const file = event.target.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       // Actualiza la imagen inmediatamente:
//       profileImage.src = e.target.result;

//       // Guarda la imagen seleccionada en localStorage:
//       localStorage.setItem("current-user-photo", e.target.result);
//     };

//     reader.readAsDataURL(file);
//   }
// });

// // Añadir elementos al DOM:
// profileContainer.appendChild(profileImage);
// profileContainer.appendChild(imageUploadInput);
// profileContainer.appendChild(uploadLabel);


// //Editar perfil

// const editButton = document.createElement("button");
// editButton.textContent = "Edit profile";

  
// //Cerrar sesión

// const logOutButton = document.createElement("button");
// logOutButton.textContent = "Log out";

// logOutButton.addEventListener("click", () => {
//   localStorage.removeItem("current-user");
//   navigate("/login");
// });


// container.appendChild(profileContainer);
// profileContainer.appendChild(welcomeMessage);
// profileContainer.appendChild(editButton)
// profileContainer.appendChild(logOutButton);
  
// }