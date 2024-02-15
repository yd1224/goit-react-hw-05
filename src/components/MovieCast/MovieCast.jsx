import { useEffect, useState } from "react";
import { FetchCast } from "../../fetchTrending";
import { useParams } from "react-router-dom";
export const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, SetCast] = useState([]);
  useEffect(() => {
    async function FetchData() {
      try {
        const FetchedCast = await FetchCast(movieId);
        SetCast(FetchedCast.cast);
        console.log("cast", cast);
      } catch {
      } finally {
      }
    }
    FetchData();
  }, [movieId, cast]);
  return (
    <>
      {cast.length > 0 &&
        cast.map((item) => {
          return (
            <div key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt={item.name}
              />
            </div>
          );
        })}
    </>
  );
};
