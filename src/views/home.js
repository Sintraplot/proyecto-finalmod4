import { getAllMovies } from "../api/apiTMDB.js";
import { showSpinner } from "../utils/spinner.js";

export async function Home(container, favoriteIds, onToggleFavorite) {
  // Mostrar spinner
  showSpinner(container, "Loading...");

  const movies = await getAllMovies();

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
            <button class="fav-btn" data-id="${
              movie.id
            }" title="Toggle favorite">
              ${heartIcon}
            </button>
            <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>${movie.release_date}</p>
              <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            </div>
          </a>
        </div>
      `;
    })
    .join("");

  container.innerHTML = `<section class="movies-grid">${moviesHTML}</section>`;

  const favButtons = container.querySelectorAll(".fav-btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Evita que el click navegue al detalle
      const movieId = Number(button.dataset.id); //obtiene el id de la peli que está guardado en el botón
      onToggleFavorite(movieId, container);
    });
  });
}
