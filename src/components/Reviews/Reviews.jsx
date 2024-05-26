import { fetchReviews } from "../../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './Reviews.module.css';

const Reviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getReviews = async () => {
            setLoading(true);
            try {
                const reviews = await fetchReviews(movieId);
                setReviews(reviews);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getReviews();
    }, [movieId]);
    return (
        <>
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && reviews.length > 0 && (
                <ul className={css.list}>
                    {reviews.map(review => (
                        <li key={review.id} className={css.item}>
                            <p className={css.descr}>Author: <span className={css.text}>{review.author}</span></p>
                            <p className={css.text}>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
            {!reviews || (reviews.length === 0 && <p className={css.notification}>We don't have any reviews for this movie.</p>)}
        </>
    )
};

export default Reviews;