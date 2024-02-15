import { Outlet, useParams } from "react-router-dom";
import { FetchMovieDetails } from "../../fetchTrending";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import moment from "moment";
export default function MovieDetailsPage() {
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
            </div>
          </div>

          <h2 className={css.title}>Additional information</h2>
          <div>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </div>
          <Outlet></Outlet>
        </>
      )}
    </>
  );
}
