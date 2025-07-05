// src/utils/favorites.js
import { getCurrentUser } from "../api/apiUsers.js";
import { updateFavoritesBackend } from "../api/apiUsers.js";
import { Home } from "../views/home.js";

export async function onToggleFavorite(movieId, container) {
  const user = getCurrentUser();
  if (!user || !Array.isArray(user.favorites)) {
    throw new Error("Invalid user state before calling backend");
  }

  const isFavorite = user.favorites.includes(movieId);
  const oldFavorites = [...user.favorites];

  // Actualizar localStorage primero
  if (isFavorite) {
    user.favorites = user.favorites.filter((id) => id !== movieId);
  } else {
    user.favorites.push(movieId);
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  // Renderizar la vista
  Home(container, user.favorites, onToggleFavorite);

  // Actualizar backend
  try {
    await updateFavoritesBackend(user.id, user.favorites);
  } catch (error) {
    console.error("Error al sincronizar favoritos con backend", error);

    // Revertir cambios locales si el backend falla
    user.favorites = oldFavorites;
    localStorage.setItem("currentUser", JSON.stringify(user));
    Home(container, user.favorites, onToggleFavorite);
  }
}
