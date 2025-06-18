import axios from "axios";
import MovieCard from "./components/MovieCard";

async function getNowPlaying() {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing`,
    {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
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
      <section className="bg-gray-100 py-10 px-6 rounded-md mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome to our movie app
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <div className="flex items-center gap-2  w-full">
          <input
            type="text"
            placeholder="Search and explore..."
            className="flex-1 px-4 py-2 rounded focus:outline-none bg-white"
          />
          <button className="bg-[#FFE353] hover:bg-yellow-500 text-sm px-4 py-2 rounded font-semibold">
            Search
          </button>
        </div>
      </section>

      <h1 className="text-3xl font-bold mb-6">Now Playing</h1>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
