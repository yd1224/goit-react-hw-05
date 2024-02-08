
import axios from "axios";
export const FetchTrendings = async (pages) => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pages}`;
const myApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDZjMDU2M2ZkYWIyNDA2MzM0ZWI0NjZhNjdhNmViNCIsInN1YiI6IjY1YzQ5ZjgwMDdmYWEyMDE3ZGMyYTEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yQ30NlTA65GVVPMGbKblQ2KwUXBxE-TuJESB3plLuFE'
    const options = {
  headers: {
            // Замість my_unique_api_key вставте свій ключ

    Authorization: `Bearer ${myApiKey}`
  }
};

const data= await axios.get(url, options)

console.log(data);
    return data;
}
// import axios from "axios";
// const YOUR_ACCESS_KEY = "fXQHg9ptFikyE-Qr2hmDcUEOUtfUMXVDow0dA66Idg4";
// export const FetchImages = async (query, page) => {
//    const response = await axios.get(
//           `https://api.unsplash.com/search/photos?`,
//           {
//             params: {
//               query: query.split("/")[1],
//               lang: "en",
//               page,
//               per_page: 20,
//               client_id: YOUR_ACCESS_KEY,
//             },
//           }
//   ); 
//   console.log(response.data);
//     return response.data;
// }