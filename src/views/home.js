import { renderMovies } from "../utils/render.js";
import { showSpinner } from "../utils/spinner.js";
import { getCachedMovies } from "../utils/movieCache.js";

export async function Home(container, favoriteIds) {
  // Mostrar spinner
  showSpinner(container, "Loading...");

  //Traer las pelis del cache
  const movies = await getCachedMovies();

  //  Limpiar el contenedor antes de renderizar
  container.innerHTML = "";

  //  Crear el buscador y los botones de clasificación por género
  const searchBox = document.createElement("div");
  searchBox.classList.add("search-box");
  searchBox.innerHTML = `
    <div class="filter-container">
      <div class="input-search">
        <input type="text" id="searchBoxHome" placeholder="Look for a movie">
        <div>
          <a id="searchBtn" class="filter-btn" aria-label="Search" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l4.39 4.38a1 1 0 0 1-1.41 1.42l-4.39-4.39zm-5.9-1.32a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
          </svg>
          </a>
          <a id="clearBtn" class="filter-btn" aria-label="Clear">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 8.586l4.95-4.95a1 1 0 1 1 1.414 1.415L11.414 10l4.95 4.95a1 1 0 0 1-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 1 1 5.05 3.636L10 8.586z"/>
          </svg>
        </a>
        </div>
      </div>
      <div class= "genre-box">
        <!-- Select para mobile -->
        <select class="genre-select" id="genreSelect">
          <option value="all">Todos</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Terror</option>
          <option value="10749">Romance</option>
          <option value="878">Sci-fi</option>
        </select>
        <!-- Botones para desktop -->
        <div class="genre-btns">
          <button class="genre-btn button-outline" data-genre="28">Action</button>
          <button class="genre-btn button-outline" data-genre="35">Comedy</button>
          <button class="genre-btn button-outline" data-genre="18">Drama</button>
          <button class="genre-btn button-outline" data-genre="27">Terror</button>
          <button class="genre-btn button-outline" data-genre="10749">Romance</button>
          <button class="genre-btn button-outline" data-genre="878">Sci-fi</button>
        </div>
      </div>
   </div>`;
  container.appendChild(searchBox); //  ahora sí se queda en pantalla el buscador

  renderMovies(container, movies, favoriteIds); //mostramos todas las pelis TODAS

  //Ahora voy a poner el buscador

  const inputSearch = searchBox.querySelector("#searchBoxHome"); //esto guarda lo que ponga en el buscador
  const searchBtn = searchBox.querySelector("#searchBtn");
  searchBtn.addEventListener("click", async () => {
    const infoSearched = inputSearch.value.trim();
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(infoSearched.toLowerCase())
    ); //filtra sobre el cache de pelis y no hace la llamada a la API
    const allMoviesSection = container.querySelector(".all-movies");

    if (allMoviesSection) allMoviesSection.remove();

    const notFoundMessage = container.querySelector(".notFoundMovies"); //Esto es para coger el mensaje de que no hay peli
    if (notFoundMessage) {
      notFoundMessage.remove();
    }

    if (filtered.length === 0) {
      const notFoundMovies = document.createElement("p");
      notFoundMovies.classList.add("notFoundMovies");
      notFoundMovies.textContent = "Sorry, we have no results for your search.";
      notFoundMovies.style.textAlign = "center";
      notFoundMovies.style.marginTop = "40px";
      container.appendChild(notFoundMovies);
    } else {
      renderMovies(container, filtered, favoriteIds);
    }
  });

  //Ahora voy a poner el evento de los botones por categorías

  const moviesSelected = document.createElement("section");
  moviesSelected.classList.add("movies-grid");
  container.appendChild(moviesSelected);

  // Evento para el select de géneros (mobile)
  const genreSelect = searchBox.querySelector("#genreSelect");
  if (genreSelect) {
    genreSelect.addEventListener("change", () => {
      const genreId = genreSelect.value;
      const allMoviesSection = container.querySelector(".all-movies");
      if (allMoviesSection) allMoviesSection.remove();
      moviesSelected.innerHTML = "";
      // Elimina mensajes previos de "not found"
      const notFoundMessage = container.querySelector(".notFoundMovies");
      if (notFoundMessage) notFoundMessage.remove();
      if (genreId === "all") {
        renderMovies(container, movies, favoriteIds);
      } else {
        const filteredByGenre = movies.filter((movie) =>
          movie.genre_ids.includes(Number(genreId))
        );
        if (filteredByGenre.length === 0) {
          const notFoundMovies = document.createElement("p");
          notFoundMovies.classList.add("notFoundMovies");
          notFoundMovies.textContent = "Sorry, this category is empty.";
          notFoundMovies.style.textAlign = "center";
          notFoundMovies.style.marginTop = "40px";
          moviesSelected.appendChild(notFoundMovies);
        } else {
          renderMovies(container, filteredByGenre, favoriteIds);
        }
      }
    });
  }

  // Evento para los botones de género (desktop)
  const genreButtons = searchBox.querySelectorAll(".genre-btn");
  genreButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const genreId = Number(button.dataset.genre);
      const filteredByGenre = movies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
      const totalMovies = container.querySelector(".all-movies");
      if (totalMovies) totalMovies.remove();
      moviesSelected.innerHTML = "";
      // Elimina mensajes previos de "not found"
      const notFoundMessage = container.querySelector(".notFoundMovies");
      if (notFoundMessage) notFoundMessage.remove();
      if (filteredByGenre.length === 0) {
        const notFoundMovies = document.createElement("p");
        notFoundMovies.classList.add("notFoundMovies");
        notFoundMovies.textContent = "Sorry, this category is empty.";
        notFoundMovies.style.textAlign = "center";
        notFoundMovies.style.marginTop = "40px";
        moviesSelected.appendChild(notFoundMovies);
      } else {
        renderMovies(container, filteredByGenre, favoriteIds);
      }
    });
  });

  //ahora voy a poner el evento al botón clear

  const clearBtn = searchBox.querySelector("#clearBtn");
  clearBtn.addEventListener("click", async () => {
    inputSearch.value = "";
    const allMoviesSection = container.querySelector(".all-movies");
    if (allMoviesSection) allMoviesSection.remove(); //Si todas las películas están visibles las elimina para que no se dupliquen
    moviesSelected.innerHTML = "";

    renderMovies(container, movies, favoriteIds);
  });

  // Añadir el h1
  const filterContainer = container.querySelector(".filter-container");
  if (filterContainer) {
    const nowPlayingTitle = document.createElement("h1");
    nowPlayingTitle.className = "now-playing-title";
    nowPlayingTitle.textContent = "Now Playing";
    filterContainer.insertAdjacentElement("afterend", nowPlayingTitle);
  }
}
