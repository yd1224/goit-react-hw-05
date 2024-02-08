import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../pages/MovieCast/MovieCast";
import MovieReviews from "../pages/MovieReviews/MovieReviews";
import NotFound from "../pages/NotFound/NotFound";
import clsx from "clsx";
import css from "./App.module.css";

// const buildLinkClass = ({ isActive }) => {
//   return clsx(css.link, isActive && css.active);
// };
function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <NavLink className={buildLinkClass} to="/movies/:movieId"></NavLink>
          </li>
          <li>
            <NavLink className={buildLinkClass} to="/movies/:movieId/cast">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={buildLinkClass} to="/movies/:movieId/reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/movies/:movieId/cast" element={<MovieCast />} />
        <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
