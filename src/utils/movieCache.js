import { getAllMovies } from "../api/apiTMDB.js";

let moviesCache = null;

export async function getCachedMovies() {
  if (moviesCache) {
    return moviesCache;
  }

  moviesCache = await getAllMovies();
  return moviesCache;
}

export function clearMovieCache() {
  moviesCache = null;
}
