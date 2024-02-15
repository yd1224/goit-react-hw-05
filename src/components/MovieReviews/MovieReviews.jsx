import { FetchReviews } from "../../fetchTrending";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { VscAccount } from "react-icons/vsc";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await FetchReviews(movieId);
        setReviews(fetchedData);
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, [movieId]);

  const handleReadMore = (reviewId) => {
    setExpandedReviewId(reviewId);
  };

  return (
    <div>
      {error && (
        <p style={{ color: "red" }}>Ooooops... Try reloading the page</p>
      )}
      {reviews.length === 0 && <p>There are no reviews!</p>}
      {reviews.map((item) => (
        <div className={css.box} key={item.id}>
          <div className={css.tbox}>
            <VscAccount />
            <p className={css.authortext}>{item.author}</p>
          </div>
          <p className={css.reviewdate}>{item.created_at}</p>
          <div className={css.btndiv_}>
            <p className={css.reviewcontent}>
              {expandedReviewId === item.id
                ? item.content
                : item.content.slice(0, 1000)}
            </p>
            {item.content.length > 1000 && expandedReviewId !== item.id && (
              <div className={css.btndiv}></div>
            )}
          </div>
          {item.content.length > 1000 && expandedReviewId !== item.id && (
            <div className={css.btnDiv}>
              <button
                className={css.readmore}
                onClick={() => handleReadMore(item.id)}
              >
                Read more
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
