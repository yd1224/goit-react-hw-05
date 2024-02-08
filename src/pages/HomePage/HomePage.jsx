import { Header } from "../../components/Header/Header";
import { FetchTrendings } from "../../fetchTrending";
import { useEffect, useState } from "react";
import { TrendingList } from "../../components/TrendingList/TrendingList";
export default function HomePage() {
  const [ShowBtn, SetShowBtn] = useState(true);
  const [firstLoad, SetfirstLoad] = useState(true);
  const [data, SetData] = useState({
    items: [],
  });
  useEffect(() => {
    SetfirstLoad(false);
  }, []);
  const [pages, SetPages] = useState(1);
  useEffect(() => {
    async function FetchData() {
      try {
        SetShowBtn(true);
        if (!firstLoad) {
          const Data = await FetchTrendings(pages);
          const FetchedData = Data.data;

          SetData((prev) => ({
            ...prev,
            items: [...prev.items, ...FetchedData.results],
          }));
          if (pages >= Data.data.total_pages / 2) {
            SetShowBtn(false);
          }
          console.log(Data.data.total_pages);
        }
      } catch {
        console.log("Error");
      }
    }
    FetchData();
  }, [pages, firstLoad]);
  console.log(data);
  const handleLoadMore = () => {
    SetPages(pages + 1);
  };
  console.log(data.items);
  return (
    <>
      <Header />
      <div>Trending today</div>
      {/* <ul>
        {data.items.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul> */}
      <TrendingList values={data.items} />
      {data.items.length > 0 && ShowBtn && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </>
  );
}
