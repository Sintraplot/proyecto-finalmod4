import { getAllMovies } from "../api/apiTMDB.js";
import { getCurrentUser } from "../api/apiUsers.js";

export async function Home(container, onToggleFavorite) {
  const currentUser = getCurrentUser();
  const favoriteIds = currentUser?.favorites || [];

  const movies = await getAllMovies();
  console.log("Movies loaded:", movies);
  console.log("Favorites used:", favoriteIds);

  const moviesHTML = movies
    .map((movie) => {
      const isFavorite = favoriteIds.includes(movie.id);
      const heartIcon = isFavorite ? "❤️" : "🤍";

      return `
        <div class="movie-wrapper">
          <a href="/movie/${movie.id}" data-link class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" />
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

  container.innerHTML = `<section class="movies-grid">${moviesHTML}</section>`;

  const favButtons = container.querySelectorAll(".fav-btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const movieId = Number(button.dataset.id);
      onToggleFavorite(movieId, container);
    });
  });
}
