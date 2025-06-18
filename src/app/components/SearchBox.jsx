"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="bg-gray-100 py-10 px-6 rounded-md mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Welcome to our movie app
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-6">
        Millions of movies, TV shows and people to discover. Explore now.
      </p>

      <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
        <input
          type="text"
          placeholder="Search and explore..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded focus:outline-none bg-white"
        />
        <button
          type="submit"
          className="bg-[#FFE353] hover:bg-yellow-500 text-sm px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </form>
    </section>
  );
}
