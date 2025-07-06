
import { getAllMovies } from "../api/apiTMDB.js";
import { searchMovies } from "../api/apiTMDB.js";
import { showSelectedMovies } from "../api/apiTMDB.js";
import { genderMovies } from "../api/apiTMDB.js";



export async function Home(container, favoriteIds, onToggleFavorite) {
  const movies = await getAllMovies();
  console.log("Movies loaded:", movies);
  console.log("Favorites used:", favoriteIds);

  //  Limpiar el contenedor antes de renderizar
  container.innerHTML = "";

  //  Crear el buscador y las clasificaciones por género
  const searchBox = document.createElement("div");
  searchBox.classList.add("searchBox");
  searchBox.innerHTML = `
    <input type="text" id="searchBoxHome" placeholder="Look for a movie">
    <button id="searchBtn">Search</button>
    <div class= "gender-box">
      <button class="genre-btn" data-genre="28"> Acción</button>
      <button class="genre-btn" data-genre="35"> Comedia</button>
      <button class="genre-btn" data-genre="18"> Drama</button>
      <button class="genre-btn" data-genre="27"> Terror</button>
      <button class="genre-btn" data-genre="10749"> Romance</button>
      <button class="genre-btn" data-genre="878"> Ciencia Ficción</button>
   </div>`
  container.appendChild(searchBox); //  ahora sí se queda en pantalla

  const moviesSelected = document.createElement("section");
  moviesSelected.classList.add("movies-grid");
  container.appendChild(moviesSelected);
  

  const genderButtons = searchBox.querySelectorAll(".genre-btn");

genderButtons.forEach(button => {
  button.addEventListener("click", async () => {
    const genreId = button.dataset.genre; // "28", "35", etc.
    const filteredByGender = await genderMovies(genreId); 
    const totalMovies = container.querySelector(".all-movies"); //meto en una constante todas las pelis
    showSelectedMovies(filteredByGender, moviesSelected); // Muestras los resultados
   

   if (totalMovies) {
    totalMovies.remove();
   }
  });
});

  const inputSearch = searchBox.querySelector("#searchBoxHome");//esto guarda lo que ponga en el buscador
  const searchBtn = searchBox.querySelector ("#searchBtn");
  searchBtn.addEventListener("click", async () => {
   const infoSearched = inputSearch.value.trim();
   const filtered = await searchMovies(infoSearched);
   const allMoviesSection = container.querySelector(".all-movies");

   if (allMoviesSection) {
    allMoviesSection.remove();
   }

   showSelectedMovies(filtered, moviesSelected);
  });
  




  
    






  //  Crear el HTML de las películas
  const moviesHTML = movies
    .map(function (movie) {
      const isFavorite = favoriteIds.includes(movie.id);
      const heartIcon = isFavorite ? "❤️" : "🤍";

      return `
        <div class="movie-wrapper">
          <a href="/movie/${movie.id}" data-link class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
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

  //  Crear sección de películas y añadirla también al contenedor
  const moviesSection = document.createElement("section");
  moviesSection.classList.add("movies-grid","all-movies" );
  moviesSection.innerHTML = moviesHTML;
  container.appendChild(moviesSection);

  //  Eventos para botones favoritos
  const favButtons = container.querySelectorAll(".fav-btn");
  favButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const movieId = Number(button.dataset.id);
      onToggleFavorite(movieId, container);
    });
  });















}
