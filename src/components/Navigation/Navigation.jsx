import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import css from './Navigation.module.css';
import { FaHome } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Loader from "../Loader/Loader";

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
    return (
        <>
        <nav>
            <ul className={css.container}>
                <li>
                    <NavLink to="/" className={getLinkClass}>
                        <FaHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/movies"className={getLinkClass}>
                        <TbMovie />
                    </NavLink>
                </li>
            </ul>
        </nav>
        <Suspense fallback={<Loader />} >
                <Outlet />
            </Suspense>
        <Toaster position="top-right" />    
        </>
    )
};

export default Navigation;