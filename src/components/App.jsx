import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews")
);
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
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
