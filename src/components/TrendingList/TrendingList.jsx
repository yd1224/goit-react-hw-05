import { Link, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export const TrendingList = ({ arr }) => {
  const location = useLocation();

  return (
    <>
      {arr.length > 0 && (
        <div className="main-content">
          {arr.map((item) => (
            <div key={item.id} className="film-box">
              <Link to={`/movies/${item.id}`} state={location}>
                <div className="film-inner">
                  <div className="star-container">
                    {Array.from({
                      length: Math.floor(item.vote_average / 2),
                    }).map((_, index) => (
                      <FaStar key={index} size={28} className="star shine" />
                    ))}
                  </div>

                  <div className="film-img">
                    <img
                      className="film-img"
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.backdrop_path}`}
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
