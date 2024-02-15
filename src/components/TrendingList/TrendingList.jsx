import { Link } from "react-router-dom";
import css from "../TrendingList/TrendingList.module.css";
export const TrendingList = ({ arr }) => {
  return (
    <>
      {arr.length > 0 && (
        <ul className={css.list}>
          {arr.map((item) => {
            return (
              <Link to={`/movies/${item.id}`} key={item.id}>
                <li key={item.id}>
                  <div className={css.box}>
                    <img
                      className={css.img}
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}`}
                      alt={item.title}
                      width={200}
                      height={250}
                    />{" "}
                    <p className={css.name}>{item.title}</p>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </>
  );
};
