import { fetchCredits } from "../../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './Cast.module.css';

const Cast = () => {
    const { movieId } = useParams();
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getCast = async () => {
            setLoading(true);
            try {
                const credits = await fetchCredits(movieId);
                setCredits(credits);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getCast();
    }, [movieId]);

    return (
        <div className={css.container}>
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && credits && (
                <ul className={css.list}>
                    {credits.map(credit => (
                        credit.profile_path && (
                            <li key={credit.id} className={css.item}>
                                <img src={`https://image.tmdb.org/t/p/w300/${credit.profile_path}`} alt={credit.name} className={css.image} />
                                <p className={css.text}>{credit.name}</p>
                                <p className={css.descr}>Character: <span className={css.text}>{credit.character}</span></p>
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Cast;