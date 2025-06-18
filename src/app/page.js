"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/pagination";
import SearchBox from "./Components/SearchBox"; // من فرع search

// Fetch movies with pagination
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
      {/* ✅ Search Box */}
      <SearchBox />

      <h1 className="text-3xl font-bold mb-6">Now Playing</h1>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* ✅ Pagination Controls */}
      <Pagination
        totalPageNumber={totalPageNumber}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
