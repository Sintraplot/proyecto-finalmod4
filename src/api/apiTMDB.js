const baseTMDBUrl = "https://api.themoviedb.org/3/movie";
const apiKey = import.meta.env.VITE_API_KEY;

export async function getAllMovies() {
  const url = `${baseTMDBUrl}/now_playing?api_key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error bringing list of films");
    }

    const allMovies = await response.json();
    return allMovies.results;
  } catch (error) {
    console.error(error);
  }
}

//function para mostrar las pelis seleccionadas

export function showSelectedMovies(filteredMovies, container) {
  container.innerHTML = "";

  const moviesHTML = filteredMovies
    .map(
      (movie) => `
    <div class="movie-wrapper">
      <a href="/movie/${movie.id}" data-link class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }" />
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.release_date}</p>
          <p>⭐ ${movie.vote_average.toFixed(1)}</p>
        </div>
      </a>
    </div>
  `
    )
    .join("");

  container.innerHTML = moviesHTML;
}

export async function getMovieDetails(movieId) {
  const url = `${baseTMDBUrl}/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error bringing movie details");
    }
    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.error(error);
  }
}
