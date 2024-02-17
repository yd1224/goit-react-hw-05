import { Header } from "../../components/Header/Header";
import { FetchMovies } from "../../fetchTrending";
import { MoviesGallery } from "../../components/MoviesGallery/MoviesGallery";
import toast, { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";
import { useEffect, useState, useRef } from "react";
import { ColorRing } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
export default function MoviesPage() {
  const [params, setParams] = useSearchParams();

  const filter = params.get("filter") ?? "";
  console.log(filter);
  const [query, SetQuery] = useState("");
  const [ShowBtn, SetShowBtn] = useState(true);
  const [page, SetPage] = useState(1);

  const [data, Setdata] = useState({
    items: [],
    loading: false,
    error: false,
  });

  console.log("\\\\\\\\");
  const SearchMovies = async (newQuery) => {
    console.log("newQuery", newQuery);
    SetQuery(newQuery);
    SetPage(1);
    Setdata({
      items: [],
      loading: true,
      error: false,
    });
  };
  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.elements.query.value.trim() === "") {
      toast.error("Empty string!");
      return;
    }
    console.log("hahaha");
    params.set("filter", event.target.elements.query.value);

    setParams(params);
    console.log(params.get("filter"));
    SearchMovies(params.get("filter"));

    event.target.reset();
  }
  const handleLoadMore = () => {
    SetPage(page + 1);
  };
  useEffect(() => {
    if (params.get("filter") === null) {
      return;
    }
    SearchMovies(params.get("filter"));
  }, [params]);
  useEffect(() => {
    if (query === "") {
      return;
    }
    async function FetchData() {
      try {
        Setdata((prev) => ({ ...prev, loading: true, error: false }));
        console.log("query", query);
        const response = await FetchMovies(query, page);

        console.log("response.total_pages", response.total_pages);
        Setdata((prev) => {
          return { ...prev, items: [...prev.items, ...response.results] };
        });
        SetShowBtn(true);
        if (page >= response.total_pages) {
          SetShowBtn(false);
        }
      } catch (error) {
        Setdata((prev) => {
          return { ...prev, error: true };
        });
      } finally {
        Setdata((prev) => {
          return { ...prev, loading: false };
        });
      }
    }
    FetchData();
    console.log(query);
  }, [query, page]);
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
      <Header></Header>

      <Toaster position="top-right"></Toaster>
      <form ref={SearchRef} className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          name="query"
        />
        <button type="submit">Search</button>
      </form>

      {data.error && <p className="error">Ooooops... Try reloading the page</p>}

      {data.items.length > 0 && <MoviesGallery arr={data.items} />}
      {data.loading && (
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
      {data.items.length > 0 && !data.loading && ShowBtn && (
        <button onClick={handleLoadMore} className={css.btn}>
          Load more
        </button>
      )}
      <Toaster position="top-right"></Toaster>
      {/* <button onClick={handleClick}>
        Click {clicks} {valueRef.current}
      </button>
      <button onClick={changeRef}>Ref {valueRef.current}</button> */}
      {/* <button onClick={StopInterval}>Stop Interval</button> */}
      {data.items.length > 0 && (
        <button className="scroll" onClick={handleScroll}>
          Scroll to top
        </button>
      )}
    </>
  );
}
