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

