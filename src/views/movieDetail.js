import { getMovieDetails } from "../api/apiTMDB.js";
import { showSpinner } from "../utils/spinner.js";
import { getCurrentUser } from "../api/apiUsers.js";
import { onToggleFavoriteDetail } from "../utils/favorites.js";

export async function MovieDetail(container, movieId) {
  showSpinner(container, "Loading details...");

  try {
    const movie = await getMovieDetails(movieId);
    const currentUser = getCurrentUser();

    if (!movie) {
      throw new Error("Movie not found");
    }

    // Checkear si la película está en favoritos
    const isFavorite =
      currentUser &&
      currentUser.favorites &&
      currentUser.favorites.includes(movie.id);
    const heartIcon = isFavorite ? "🩵" : "🤍";

    // Formatear géneros como tags
    const genres = movie.genres
      ? movie.genres.map((genre) => genre.name)
      : ["Not available"];

    // Formatear fecha
    const releaseDate = movie.release_date
      ? new Date(movie.release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Date not available";

    // Formatear duración
    const runtime = movie.runtime
      ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
      : "Runtime not available";

    // Formatear presupuesto
    const budget =
      movie.budget && movie.budget > 0
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(movie.budget)
        : "Not available";

    // Formatear ingresos
    const revenue =
      movie.revenue && movie.revenue > 0
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(movie.revenue)
        : "Not available";

    container.innerHTML = `
      <div class="movie-detail">
        <div class="movie-detail-container">
          <div class="movie-header">
            <a href="/" data-link class="back-button" aria-label="Back to main page">← Back to Home</a>
          </div>
          <div class="movie-content" id="movie-content">
            <div class="movie-poster">
              <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="Movie poster for ${movie.title}" />
              <button 
                class="fav-btn" 
                data-id="${movie.id}" 
                title="${
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }"
                aria-label="${
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }"
                aria-pressed="${isFavorite}"
              >
                ${heartIcon}
              </button>
            </div>
            <div class="movie-info">
              <h1>${movie.title}</h1>
              ${
                movie.tagline
                  ? `<p class="movie-tagline">${movie.tagline}</p>`
                  : ""
              }
              
              <div class="movie-meta" role="list" aria-label="Movie information">
                <div class="meta-item rating" role="listitem">
                  <span class="icon" aria-hidden="true">⭐</span>
                  <span>Rating: ${movie.vote_average.toFixed(1)}</span>
                </div>
                <div class="meta-item release-date" role="listitem">
                  <span class="icon" aria-hidden="true">📅</span>
                  <span>Release: ${releaseDate}</span>
                </div>
                <div class="meta-item runtime" role="listitem">
                  <span class="icon" aria-hidden="true">⏱️</span>
                  <span>Runtime: ${runtime}</span>
                </div>
              </div>
              
              <div class="genres-container">
                <h4>Genres</h4>
                <div class="genres-tags" role="list" aria-label="Movie genres">
                  ${genres
                    .map(
                      (genre) => `
                    <span class="genre-tag" role="listitem">${genre}</span>
                  `
                    )
                    .join("")}
                </div>
              </div>

              <div class="movie-overview">
                <h3>Overview</h3>
                <p>${movie.overview || "Overview not available."}</p>
              </div>

              <div class="movie-details">
                <div class="detail-section">
                  <h3>Technical Information</h3>
                  <div class="detail-grid" role="list" aria-label="Technical details of the movie">
                    <div class="detail-item" role="listitem">
                      <span class="detail-label">Status:</span>
                      <span class="detail-value">${
                        movie.status || "Not available"
                      }</span>
                    </div>
                    <div class="detail-item" role="listitem">
                      <span class="detail-label">Original Language:</span>
                      <span class="detail-value">${
                        movie.original_language?.toUpperCase() ||
                        "Not available"
                      }</span>
                    </div>
                    <div class="detail-item" role="listitem">
                      <span class="detail-label">Budget:</span>
                      <span class="detail-value">${budget}</span>
                    </div>
                    <div class="detail-item" role="listitem">
                      <span class="detail-label">Revenue:</span>
                      <span class="detail-value">${revenue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    `;

    // Agregar evento al botón de favorito
    const favButton = container.querySelector(".fav-btn");
    if (favButton) {
      favButton.addEventListener("click", (e) => {
        e.preventDefault();
        onToggleFavoriteDetail(movie.id, container, movie);
      });
    }
  } catch (error) {
    console.error("Error loading movie details:", error);
    container.innerHTML = `
      <div class="error-message">
        <h2>Error loading movie details</h2>
        <p>Please try again later.</p>
        <a href="/" data-link>← Back to Home</a>
      </div>
    `;
  }
}
