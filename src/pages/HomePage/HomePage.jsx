import { Header } from "../../components/Header/Header";
import { FetchTrendings } from "../../fetchTrending";
import { useEffect, useState } from "react";
import { TrendingList } from "../../components/TrendingList/TrendingList";
import { ColorRing } from "react-loader-spinner";
// import { FetchTrendingImg } from "../../fetchTrendingImg";
import css from "../HomePage/HomePage.module.css";
export default function HomePage() {
  const [ShowBtn, SetShowBtn] = useState(true);
  const [error, SetError] = useState(false);
  // const [firstLoad, SetfirstLoad] = useState(true);
  const [loader, SetLoader] = useState(true);
  // const [images, SetImages] = useState({
  //   imgarr: [],
  // });
  const [data, SetData] = useState({
    items: [],
  });

  const [pages, SetPages] = useState(1);
  useEffect(() => {
    let controller = new AbortController();

    async function fetchData() {
      try {
        SetLoader(true);
        const data = await FetchTrendings(pages, controller);
        console.log(data);
        SetData((prev) => ({
          ...prev,
          items: [...prev.items, ...data.data.results],
        }));

        if (pages >= data.total_pages / 2) {
          SetShowBtn(false);
        }
      } catch (error) {
        console.log(error);
        if (error.code !== "ERR_CANCELED") {
          SetError(true);
        }
      } finally {
        SetLoader(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
      controller = new AbortController(); // Create a new controller for the next fetch operation
      SetLoader(true);
    };
  }, [pages]);

  const handleLoadMore = () => {
    SetPages(pages + 1);
  };
  return (
    <>
      <Header />

      <div className={css.trendText}>Trending today</div>
      {error && <p className={css.error}>Ooooops... Try reloading the page</p>}
      {/* <ul>
        {data.items.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul> */}
      <TrendingList arr={data.items} />
      {loader && (
        <div className={css.colorRingWrapperBox}>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#646cff", "#a0a1c3", "#4044d0", "#40a8d0", "#021f29"]}
          />
        </div>
      )}

      {data.items.length > 0 && !loader && ShowBtn && (
        <button className={css.btn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
}
