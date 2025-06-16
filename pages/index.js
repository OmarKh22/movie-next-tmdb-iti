// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const imageBase = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day?api_key=271646b1495e3e27c91db4814e3a7193'
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error('API error:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (movies.length === 0) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Trending Movies</h1>
      <div className="space-y-8">
        <div className="flex overflow-x-auto gap-4 pb-4">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}
              className="flex-shrink-0 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative h-60">
                <img
                  src={imageBase + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 text-center">
                <h2 className="text-base font-semibold truncate text-gray-900 dark:text-white">{movie.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
