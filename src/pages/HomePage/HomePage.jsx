import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import css from './HomePage.module.css';
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true)
      try {
        const fetchedMovies = await fetchTrendingMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.heading}>Trending today</div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies && <MovieList movies={movies} />}
    </div>
  ) 
}

export default HomePage;