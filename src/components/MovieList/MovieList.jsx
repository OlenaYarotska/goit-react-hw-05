import css from './MovieList.module.css';
import { NavLink, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
    const location = useLocation();
    return (
        <ul className={css.list}>
            {movies.map((movie => (
                <li key={movie.id} className={css.item}>
                    <NavLink to={`/movies/${movie.id}`} state={{from : location}}>
                        <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} className={css.image} />
                        <p className={css.title}>{movie.title}</p>
                    </NavLink>
                </li>
            )))}
        </ul>
    )
}

export default MovieList;