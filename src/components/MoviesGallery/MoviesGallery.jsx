import { Link, useLocation } from "react-router-dom";
import css from "../TrendingList/TrendingList.module.css";

import { FaStar } from "react-icons/fa";
export const MoviesGallery = ({ arr }) => {
  const location = useLocation();

  console.log(location);
  console.log("arr", arr);
  return (
    <>
      {arr.length > 0 && (
        <div className="main-content">
          {arr.map((item) => (
            <div key={item.id} className="film-box">
              <Link to={`/movies/${item.id}`} state={location}>
                <div className="film-inner">
                  <div className="star-container">
                    {
                      // Render the stars if item is hovered
                      Array.from({
                        length: Math.floor(item.vote_average / 2),
                      }).map((_, index) => (
                        <FaStar key={index} size={28} className="star" />
                      ))
                    }
                  </div>

                  <div className="film-img">
                    <img
                      className="film-img"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                      width={200}
                      height={250}
                    />
                    <p className="film-name">{item.title}</p>
                  </div>
                  <div className="film-details"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
