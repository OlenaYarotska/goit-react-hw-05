import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../../services/api";
import { useEffect, useState } from "react";
import toast  from 'react-hot-toast';
import MovieList from "../../components/MovieList/MovieList";
import css from './MoviesPage.module.css';
import Loader from "../../components/Loader/Loader";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';


const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        if (!query)  return;

    const getMoviesBySearch = async () => {
      setLoading(true)
      try {
        const moviesBySearch = await searchMovie(query);
        if (moviesBySearch.length === 0) {
              return toast.error("No movies found. Change your search query")
        }
        setMovies(moviesBySearch);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
      }
    }
    getMoviesBySearch()
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            return toast.error('Type your search request')
        }
        setSearchParams({ query: searchQuery })
        setSearchQuery('')
       
    }

    const handleChange = (e) => {
        const searchRequest = e.target.value.toLowerCase().trim();
        setSearchQuery(searchRequest);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={css.form}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={searchQuery}
                    onChange={handleChange}
                    name="search"
                    placeholder="search movies"
                    className={css.input}
                />
                <button type="submit" className={css.button}>Search</button>
            </form>
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && movies && <MovieList movies={movies} />}
        </>
    )
}

export default MoviesPage;