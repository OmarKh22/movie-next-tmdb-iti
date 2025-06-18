"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/pagination";

async function getNowPlaying(page = 1) {
  const res = await axios.get(`/api/now-playing?page=${page}`);
  return res.data;
}

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const moviesData = await getNowPlaying(pageNumber);
        setMovies(moviesData.results);
        setTotalPageNumber(moviesData.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchMovies();
  }, [pageNumber]);

  return (
    <div className="px-6 py-4">
      {/* search */}
      <section className="bg-gray-100 py-10 px-6 rounded-md mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome to our movie app
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <div className="flex items-center gap-2 w-full">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination
        totalPageNumber={totalPageNumber}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
