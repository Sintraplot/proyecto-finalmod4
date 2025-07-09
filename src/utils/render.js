export function renderMovies(container, movies, favoriteIds, onToggleFavorite) {
  const moviesHTML = movies
    .map((movie) => {
      const isFavorite = favoriteIds.includes(movie.id);
      const heartIcon = isFavorite ? "🩵" : "🤍";

      return `
        <div class="movie-wrapper">
          <a href="/movie/${movie.id}" data-link class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" />
            <button class="fav-btn" data-id="${
              movie.id
            }" title="Toggle favorite">${heartIcon}</button>
            <div class="movie-card-info">
              <h3>${movie.title}</h3>
              <p>${movie.release_date}</p>
              <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            </div>
          </a>
        </div>
      `;
    })
    .join("");

  const moviesSection = document.createElement("section");
  moviesSection.classList.add("movie-list", "all-movies");
  moviesSection.innerHTML = moviesHTML;
  container.appendChild(moviesSection);

  const favButtons = container.querySelectorAll(".fav-btn");
  favButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); //esto hace que cuando haga click en fav no vaya a la pagina de detalle de la peli
      const movieId = Number(button.dataset.id);
      onToggleFavorite(movieId, container);
    });
  });
}
