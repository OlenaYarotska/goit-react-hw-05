import axios from "axios";
const KEY = 'e61d61238bf5efa24cb2963b7b46b5dc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const options = {
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjFkNjEyMzhiZjVlZmEyNGNiMjk2M2I3YjQ2YjVkYyIsInN1YiI6IjYyMGNmZjRkNjZlYmE3MDA2YWNmZjM5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keVrf7HgD0gP16DGWD9CgMAwjxRJ349WnzuKUSkFjYM'
    }
};

export const fetchTrendingMovies = async () => {
    const url = `/trending/movie/day?language=en-US&api_key=${KEY}`;
    const response = await axios.get(url, options);    
    return response.data.results;  
}

export const searchMovie = async (query) => {
    const url = `/search/movie?api_key=${KEY}&query=${query}&page=1`;
    const response = await axios.get(url, options);     
    return response.data.results; 
}

export const fetchMovieDetails = async (id) => {
    const url = `movie/${id}?api_key=${KEY}`;
    const response = await axios.get(url, options);
    return response.data;
}
export const fetchCredits = async (id) => {
    const url = `movie/${id}/credits?api_key=${KEY}`;
    const response = await axios.get(url, options);
    return response.data.cast;
}

export const fetchReviews = async (id) => {
    const url = `movie/${id}/reviews?api_key=${KEY}`;
     const response = await axios.get(url, options);
    return response.data.results;
}