import { useEffect, useState } from "react";
import { FetchCast } from "../../fetchTrending";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";
export const MovieCast = () => {
  const { movieId } = useParams();
  const [error, SetError] = useState(false);
  const [cast, SetCast] = useState([]);
  useEffect(() => {
    async function FetchData() {
      try {
        const FetchedCast = await FetchCast(movieId);
        SetCast(FetchedCast.cast);
      } catch (error) {
        SetError(true);
      }
    }
    FetchData();
  }, [movieId]);
  return (
    <>
      {error && <p className={css.error}>Ooooops... Try reloading the page</p>}
      <div className={css.wrapper}>
        {cast.length > 0 &&
          cast.map((item) => {
            return (
              <div className={css.box} key={item.id}>
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                  alt={item.name}
                />
                <div className={css.tbox}>
                  <p className={css.text}>{item.name}</p>
                  <p className={css.text}>({item.character})</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
