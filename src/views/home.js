
import { getAllMovies } from "../api/apiTMDB.js";
import { searchMovies } from "../api/apiTMDB.js";
import { showSelectedMovies } from "../api/apiTMDB.js";
import { genreMovies } from "../api/apiTMDB.js";
import { renderMovies } from "../utils/render.js";



export async function Home(container, favoriteIds, onToggleFavorite) {
  const movies = await getAllMovies();
  console.log("Movies loaded:", movies);
  console.log("Favorites used:", favoriteIds);


  //  Limpiar el contenedor antes de renderizar
  container.innerHTML = "";// ESTO NO SE LO HE ENSEÑADO AÚN!!!!!!!!!-----------------------

  //  Crear el buscador y los botones de clasificación por género
  const searchBox = document.createElement("div");
  searchBox.classList.add("searchBox");
  searchBox.innerHTML = `
    <input type="text" id="searchBoxHome" placeholder="Look for a movie">
    <button id="searchBtn">Search</button>
    <button id="clearBtn">Clear</button>
    <div class= "genre-box">
      <button class="genre-btn" data-genre="28">Action</button>
      <button class="genre-btn" data-genre="35">Comedy</button>
      <button class="genre-btn" data-genre="18">Drame</button>
      <button class="genre-btn" data-genre="27"> Terror</button>
      <button class="genre-btn" data-genre="10749">Romance</button>
      <button class="genre-btn" data-genre="878">Sci-fi</button>
   </div>`
  container.appendChild(searchBox); //  ahora sí se queda en pantalla el buscador

  renderMovies(container,movies,favoriteIds,onToggleFavorite); //mostramos todas las pelis TODAS

  //Ahora voy a poner el buscador

  const inputSearch = searchBox.querySelector("#searchBoxHome");//esto guarda lo que ponga en el buscador
  const searchBtn = searchBox.querySelector ("#searchBtn");
  searchBtn.addEventListener("click", async () => {
   const infoSearched = inputSearch.value.trim();
   const filtered = await searchMovies(infoSearched);
   const allMoviesSection = container.querySelector(".all-movies");

  if (allMoviesSection) allMoviesSection.remove();

  const notFoundMessage =container.querySelector(".notFoundMovies");//Esto es para coger el mensaje de que no hay peli
  if (notFoundMessage) {notFoundMessage.remove()}


  if (filtered.length===0){
    const notFoundMovies = document.createElement("p");
    notFoundMovies.classList.add ("notFoundMovies");
    notFoundMovies.textContent = "Sorry, we have no results for your search.";
    notFoundMovies.style.textAlign = "center";
    notFoundMovies.style.marginTop = "40px";
    container.appendChild(notFoundMovies);
  }else {
    renderMovies(container, filtered, favoriteIds, onToggleFavorite);
  }
});

//Ahora voy a poner el evento de los botones por categorías

const moviesSelected = document.createElement("section");
moviesSelected.classList.add("movies-grid");
container.appendChild(moviesSelected);
const genreButtons = searchBox.querySelectorAll(".genre-btn");

genreButtons.forEach(button => {
  button.addEventListener("click", async () => {
    const genreId = button.dataset.genre; 
    const filteredByGenre = await genreMovies(genreId); 
    const totalMovies = container.querySelector(".all-movies"); //meto en una constante todas las pelis
    if (totalMovies) {totalMovies.remove()}

    moviesSelected.innerHTML = ""; // Esto se ejecuta siempre
    
    if (filteredByGenre.length===0){
    const notFountMovies = document.createElement("p");
    notFountMovies.textContent = "Sorry, this category is empty.";
    notFountMovies.style.textAlign = "center";
    notFountMovies.style.marginTop = "40px";
    moviesSelected.appendChild(notFountMovies)
   
    }else{
      showSelectedMovies(filteredByGenre, moviesSelected);
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

  const allMovies = await getAllMovies();
  renderMovies(container, allMovies, favoriteIds, onToggleFavorite);
});
}

