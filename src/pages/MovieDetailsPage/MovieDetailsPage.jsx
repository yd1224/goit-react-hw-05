import { useParams } from "react-router-dom";
import { FetchMovieDetails } from "../../fetchTrending";
import { useEffect, useState } from "react";
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
      {movie && (
        <>
          {" "}
          <div>MovieDetailsPage</div>
          <h1>
            {movie.original_title} ({date})
          </h1>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          ></img>
          <p>{movie.overview}</p>
          {error && (
            <p style={{ color: "red" }}>Ooooops... Try reloading the page</p>
          )}
          <h2>Genres</h2>
          {movie.genres.map((item) => (
            <span key={item.id}> {item.name}</span>
          ))}
          <h2>Additional information</h2>
        </>
      )}
    </>
  );
}
