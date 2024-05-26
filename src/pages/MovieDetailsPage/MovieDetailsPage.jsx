import { fetchMovieDetails } from "../../services/api";
import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, useLocation, NavLink, Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetails.module.css';
import { RiArrowGoBackFill } from "react-icons/ri";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getMovieDetails = async () => {
            setLoading(true);
            try {
                const movieDetails = await fetchMovieDetails(movieId);
                setMovie(movieDetails);
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getMovieDetails();    
    }, [movieId]);


    const backLink = useRef(location?.state?.from ?? '/');

    
    return (
        <>
            <div className={css.buttonWrapper}>
                <NavLink to={backLink.current} className={css.button}><RiArrowGoBackFill />Go back</NavLink>
            </div>
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && movie && 
                <div className={css.container}>
                <div className={css.movieDetailsContainer}>
                <div className={css.posterContainer}>
                    <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title}  className={css.poster}/>
                 </div>
                <div className={css.detailsContainer}>
                    <h2 className={css.title}>{movie.title}({movie.release_date.slice(0, 4)})</h2>
                    <p className={css.score}>User score:<span>{movie.vote_average * 10}%</span></p>
                    <p className={css.overview}>Overview:<span>{movie.overview}</span></p>
                    <p className={css.genres}>Genres:<span>{movie.genres.map(genre => genre.name).join(', ')}</span></p>
                        </div>
                        </div>
                        <div className={css.additionalInfo}>
                            </div>
                    <h3 className={css.infoTitle}>Additional information:</h3>
                    <ul className={css.infoList}>
                        <li className={css.infoItem}>
                            <NavLink to='cast' className={css.infoLink}> Cast</NavLink>
                        </li>
                        <li className={css.infoItem}>
                            <NavLink to='reviews' className={css.infoLink}>Reviews</NavLink>
                        </li>
                    </ul>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </div>
            }
        </>
    )
}

export default MovieDetailsPage;