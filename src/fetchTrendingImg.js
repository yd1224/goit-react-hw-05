import axios from "axios";
export const FetchTrendingImg = async (movie_id, controller) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/images`;
  const myApiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDZjMDU2M2ZkYWIyNDA2MzM0ZWI0NjZhNjdhNmViNCIsInN1YiI6IjY1YzQ5ZjgwMDdmYWEyMDE3ZGMyYTEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yQ30NlTA65GVVPMGbKblQ2KwUXBxE-TuJESB3plLuFE";
  const options = {
    headers: {
      // Замість my_unique_api_key вставте свій ключ

      Authorization: `Bearer ${myApiKey}`,
    },
    signal: controller.signal,
  };

  const data = await axios.get(url, options);

  console.log("FetchTrendingsImg", data.data);
  return data;
};
