import axios from "axios";
import MovieCard from "./components/MovieCard";
import SearchBox from "./Components/SearchBox";

async function getNowPlaying() {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing`,
    {
      params: {
         api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        page: 1,
      },
    }
  );

  return res.data.results;
}

export default async function HomePage() {
  const movies = await getNowPlaying();

  return (
    <div className="px-6 py-4">
      {/* ...search box... */}
      {/* search */}
      <SearchBox/>

      <h1 className="text-3xl font-bold mb-6">Now Playing</h1>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}