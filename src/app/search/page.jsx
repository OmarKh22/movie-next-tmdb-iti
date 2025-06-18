import axios from "axios";
import SearchClient from "./SearchClient";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query;
  let movies = [];

  if (query) {
    try {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query,
          language: "en-US",
          page: 1,
        },
      });
      movies = res.data.results;
    } catch (error) {
      console.error("Failed to fetch search results:", error.message);
    }
  }

  return <SearchClient query={query} movies={movies} />;
}
