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

// Obtener detalles de la pelicula-----------------

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
