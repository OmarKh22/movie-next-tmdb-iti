"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MovieCard from "../components/MovieCard";

export default function SearchClient({ query, movies }) {
  const router = useRouter();
  const [input, setInput] = useState(query || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search?query=${encodeURIComponent(input.trim())}`);
  };

  return (
    <div className="px-6 py-4">
      {/* Search Box UI */}
      <section className="bg-gray-100 py-10 px-6 rounded-md mb-8">
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search and explore..."
            className="flex-1 px-4 py-2 rounded focus:outline-none bg-white"
          />
          <button type="submit" className="bg-[#FFE353] text-sm px-4 py-2 rounded font-semibold">
            Search
          </button>
        </form>
      </section>

      <p className="text-3xl font-bold mb-6">
        Search Results For:{" "}
        <span className="text-blue-600">
          {query
            ? query
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "Nothing"}
        </span>
      </p>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
