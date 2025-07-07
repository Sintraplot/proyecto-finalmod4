const baseTMDBUrl = "https://api.themoviedb.org/3/movie";
const apiKey = import.meta.env.VITE_API_KEY;

export async function getAllMovies() {
    const url = `${baseTMDBUrl}/now_playing?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        console.log(response);
        
        if(!response.ok) {
            throw new Error("Error bringing list of films");
        }

        const allMovies = await response.json();
        console.log(allMovies.results);
        return allMovies.results;
        
    } catch (error) {
        console.error(error);
    }
};

getAllMovies();

//función para filtrar las películas por título
export async function searchMovies(infoSearched) {

    const allMovies = await getAllMovies(); //me traigo todas las pelis y lkas meto en una constante
    const lowerInfosearched = infoSearched.toLowerCase();

    const filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(lowerInfosearched)  
  );
  
    console.log (filteredMovies);

    return filteredMovies;
    
}

//function para mostrar las pelis seleccionadas

export  function showSelectedMovies(filteredMovies, container) {
    container.innerHTML = "";

    const moviesHTML = filteredMovies.map(movie => `
    <div class="movie-wrapper">
      <a href="/movie/${movie.id}" data-link class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.release_date}</p>
          <p>⭐ ${movie.vote_average.toFixed(1)}</p>
        </div>
      </a>
    </div>
  `).join("");

  container.innerHTML = moviesHTML;
}




//función para que en cada categoría esté lo que corresponda

export async function genreMovies(genreId) {

    const theMovies = await getAllMovies();
    console.log (theMovies);
   
   const filteredByGenre = theMovies.filter(movie =>
    movie.genre_ids.includes(Number(genreId)) // Convertimos genreId a número por si viene como string
  );



  return filteredByGenre; 
}
    



