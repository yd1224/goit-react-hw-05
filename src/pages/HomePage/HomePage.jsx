import { Header } from "../../components/Header/Header";
import { FetchTrendings } from "../../fetchTrending";
import { useEffect, useState, useRef } from "react";
import { TrendingList } from "../../components/TrendingList/TrendingList";
import { ColorRing } from "react-loader-spinner";
import css from "../HomePage/HomePage.module.css";

export default function HomePage() {
  const [ShowBtn, SetShowBtn] = useState(true);
  const [error, SetError] = useState(false);
  const [loader, SetLoader] = useState(true);
  const [data, SetData] = useState({
    items: [],
  });
  // const [params, setParams] = useSearchParams();

  // const filter = params.get("filter") ?? false;
  // const changeFilter = (newFilter) => {
  //   params.set("filter", newFilter);
  //   setParams(params);
  // };
  // const FilteredMovies = data.items.filter((item) =>
  //   item.title.toLowerCase().includes(filter.toLowerCase())
  // );
  const [pages, SetPages] = useState(1);
  useEffect(() => {
    let controller = new AbortController();
    async function fetchData() {
      try {
        SetLoader(true);
        console.log(loader);
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
      controller = new AbortController();
      SetLoader(true);
    };
  }, [pages]);

  const handleLoadMore = () => {
    SetPages(pages + 1);
  };
  const SearchRef = useRef();
  const handleScroll = () => {
    const dims = SearchRef.current.getBoundingClientRect();

    window.scrollTo({
      top: dims.top,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Header ref={SearchRef} />

      <div className={css.trendText}>Trending today</div>
      {error && <p className={css.error}>Ooooops... Try reloading the page</p>}
      {/* {data.items.length > 0 && (
        <Filter value={filter} onChange={changeFilter} />
      )}
      <TrendingList arr={FilteredMovies} /> */}
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
      {data.items.length > 0 && (
        <button onClick={handleScroll} className="scroll">
          Scroll to top
        </button>
      )}
    </>
  );
}
