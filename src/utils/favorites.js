// src/utils/favorites.js
import { getCurrentUser } from "../api/apiUsers.js";
import { updateFavoritesBackend } from "../api/apiUsers.js";

export async function onToggleFavorite(movieId, container) {
  const user = getCurrentUser();
  if (!user || !Array.isArray(user.favorites)) {
    throw new Error("Invalid user state before calling backend");
  }

  const isFavorite = user.favorites.includes(movieId);
  const oldFavorites = [...user.favorites];

  // Mostrar loading state en el botón
  const favButton = container.querySelector(`[data-id="${movieId}"]`);
  if (favButton) {
    favButton.disabled = true;
    favButton.innerHTML = "⏳";
  }

  // Actualizar localStorage primero
  if (isFavorite) {
    user.favorites = user.favorites.filter((id) => id !== movieId);
  } else {
    user.favorites.push(movieId);
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  // Actualizar solo el botón de favorito específico
  updateFavoriteButton(container, movieId, !isFavorite);

  // Actualizar backend
  try {
    await updateFavoritesBackend(user.id, user.favorites);
  } catch (error) {
    console.error("Error al sincronizar favoritos con backend", error);

    // Revertir cambios locales si el backend falla
    user.favorites = oldFavorites;
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateFavoriteButton(container, movieId, isFavorite);
  } finally {
    // Restaurar botón
    if (favButton) {
      favButton.disabled = false;
    }
  }
}

export async function onToggleFavoriteDetail(movieId, container, movieData) {
  const user = getCurrentUser();
  if (!user || !Array.isArray(user.favorites)) {
    throw new Error("Invalid user state before calling backend");
  }

  const isFavorite = user.favorites.includes(movieId);
  const oldFavorites = [...user.favorites];

  // Mostrar loading state en el botón
  const favButton = container.querySelector(`[data-id="${movieId}"]`);
  if (favButton) {
    favButton.disabled = true;
    favButton.innerHTML = "⏳";
  }

  // Actualizar localStorage primero
  if (isFavorite) {
    user.favorites = user.favorites.filter((id) => id !== movieId);
  } else {
    user.favorites.push(movieId);
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  // Actualizar solo el botón de favorito en la página de detalle
  updateFavoriteButton(container, movieId, !isFavorite);

  // Actualizar backend
  try {
    await updateFavoritesBackend(user.id, user.favorites);
  } catch (error) {
    console.error("Error al sincronizar favoritos con backend", error);
    // Revertir cambios locales si el backend falla
    user.favorites = oldFavorites;
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateFavoriteButton(container, movieId, isFavorite);
  } finally {
    // Restaurar botón
    if (favButton) {
      favButton.disabled = false;
    }
  }
}

function updateFavoriteButton(container, movieId, isFavorite) {
  const favButton = container.querySelector(`[data-id="${movieId}"]`);
  if (favButton) {
    const heartIcon = isFavorite ? "❤️" : "🤍";
    favButton.innerHTML = heartIcon;
    favButton.title = isFavorite ? "Remove from favorites" : "Add to favorites";
  }
}
