"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaStar } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi";

export default function WishlistPage() {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistMovies(stored);
  }, []);

  const removeFromWishlist = (movieId) => {
    const updated = wishlistMovies.filter((m) => m.id !== movieId);
    setWishlistMovies(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // ✅ لتحديث العداد في الهيدر
    window.dispatchEvent(new Event("wishlistChanged"));
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      {wishlistMovies.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No Movies in watch list</p>
          <p className="text-gray-500 mt-2 mb-6">
            Click the heart icon on movies to add them to your watch list
          </p>
          <Link
            href="/"
            className="bg-[#FFE353] hover:bg-yellow-400 text-black px-6 py-2 rounded-md transition"
          >
            Back to home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wishlistMovies.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/fallback.jpg";

            return (
              <div
                key={movie.id}
                className="flex bg-white rounded-xl shadow-md overflow-hidden w-full min-h-[220px]"
              >
                <div className="w-[120px] md:w-[140px] h-auto">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    width={140}
                    height={200}
                    className="object-cover h-full w-full"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold">{movie.title}</h2>
                      <button onClick={() => removeFromWishlist(movie.id)}>
                        <FaHeart className="text-yellow-400 text-xl" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(movie.release_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <div className="flex items-center gap-1 my-2 text-yellow-400">
                      {Array(5)
                        .fill(0)
                        .map((_, i) =>
                          i < Math.round(movie.vote_average / 2) ? (
                            <FaStar key={i} />
                          ) : (
                            <HiOutlineStar key={i} />
                          )
                        )}
                      <span className="text-black text-sm ml-2">
                        {movie.vote_count}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
