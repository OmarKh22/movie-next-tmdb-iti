"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import VoteCircle from "./VoteCircle";
import Image from "next/image";

export default function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle missing movie data
  if (!movie || !movie.poster_path) {
    return null;
  }

  const formattedDate = movie.release_date 
    ? new Date(movie.release_date)
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/(\w{3}) (\d{4})/, "$1, $2")
    : "Unknown Date";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="rounded p-2 relative">
      <div className="relative">
        <Image
          src={imageError ? '/no-image.png' : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || "Movie"}
          width={500}
          height={450}
          className="rounded-3xl"
          onError={handleImageError}
        />
        <span className="absolute -bottom-5 left-3 bg-blue-950 rounded-full">
          <VoteCircle value={movie.vote_average || 0} />
        </span>
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <PiDotsThreeCircleLight className="text-white text-4xl" />
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 text-teal-950 truncate">{movie.title || "Unknown Title"}</h2>
      <div className="flex items-center w-full gap-24 text-gray-600">
        <p className="text-sm">{formattedDate}</p>
        <button onClick={() => setLiked(!liked)} title="Add to favorites">
          {liked ? (
            <FaHeart className="text-2xl text-[#FFE353] transition" />
          ) : (
            <IoIosHeartEmpty className="text-2xl text-gray-900 transition" />
          )}
        </button>
      </div>
    </div>
  );
} 