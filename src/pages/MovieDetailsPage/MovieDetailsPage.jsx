import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { FetchMovieDetails } from "../../fetchTrending";
import { useEffect, useState, useRef, Suspense } from "react";
import { Header } from "../../components/Header/Header";
import { NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { ColorRing } from "react-loader-spinner";
import clsx from "clsx";
import moment from "moment";
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
export default function MovieDetailsPage() {
  const location = useLocation();

  const BackLinkRef = useRef(location.state);
  console.log(BackLinkRef);
  const [error, SetError] = useState(false);
  const [movie, SetMovie] = useState(null);
  const [date, SetDate] = useState("");

  const { movieId } = useParams();
  useEffect(() => {
    async function FetchData() {
      try {
        const FetchedData = await FetchMovieDetails(movieId);
        console.log("##", FetchedData);
        SetMovie(FetchedData);
        const releaseDate = moment(FetchedData.release_date).format("YYYY");
        SetDate(releaseDate);
      } catch (error) {
        console.log(error);
        if (error.code !== "ERR_CANCELED") {
          SetError(true);
        }
      }
    }
    FetchData();
  }, [movieId]);
  console.log("movie", movie);

  return (
    <>
      <Header></Header>
      {movie && (
        <>
          <Link to={BackLinkRef.current ?? "/movies"}>
            <button className={css.btn_}>Go back</button>
          </Link>
          <h1 className={css.trendText}>
            {movie.title} ({date})
          </h1>

          <div className={css.box}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            ></img>
            <div className={css.container}>
              <p className={css.text}>{movie.overview}</p>
              {error && (
                <p style={{ color: "red" }}>
                  Ooooops... Try reloading the page
                </p>
              )}
              <h2 className={css.h2}>Genres</h2>
              {movie.genres.map((item) => (
                <span className={css.genre} key={item.id}>
                  {" "}
                  {item.name}
                </span>
              ))}
              <h2 className={css.title}>Additional information</h2>
              <div>
                <NavLink className={buildLinkClass} to="cast">
                  Cast
                </NavLink>
                <NavLink className={buildLinkClass} to="reviews">
                  Reviews
                </NavLink>
              </div>
            </div>
          </div>
          <Suspense
            fallback={
              <div className={css.colorRingWrapperBox}>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#646cff",
                    "#a0a1c3",
                    "#4044d0",
                    "#40a8d0",
                    "#021f29",
                  ]}
                />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
}
