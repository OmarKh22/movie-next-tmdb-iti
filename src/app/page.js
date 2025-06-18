"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./components/pagination";

// Server function to get movies
async function getNowPlaying(page = 1) {
  const res = await axios.get(`/api/now-playing?page=${page}`);
  return res.data;
}

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalpageNumber, setTotalPageNumber] = useState(0);
  // const movies = await getNowPlaying();
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
      <h1 className="text-3xl font-bold mb-6"> Now Playing</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.length > 0 && movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded shadow-md p-2 relative"
          >
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded"
              />
              <span className="absolute bottom-2 left-2 bg-green-600 text-white text-sm px-2 py-1 rounded-full">
                {Math.round(movie.vote_average * 10)}%
              </span>
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button title="Comment">💬</button>
                <button title="Watchlist">🤍</button>
              </div>
            </div>
            <h2 className="text-sm font-semibold mt-2">{movie.title}</h2>
            <p className="text-xs text-gray-600">{movie.release_date}</p>
          </div>
        ))}
      </div>
      <Pagination
  totalPageNumber={totalpageNumber}
  pageNumber={pageNumber}
  setPageNumber={setPageNumber}
/>
    </div>
  );
}
