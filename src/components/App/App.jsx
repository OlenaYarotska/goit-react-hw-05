import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />} >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </>
  )
}

export default App;

