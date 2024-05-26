import { NavLink } from "react-router-dom";
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <>
            <div className={css.text}>Sorry, page not found. Go to <NavLink to="/" className={css.link}>home page</NavLink>!</div>
        </>
        
    )
};

export default NotFoundPage;