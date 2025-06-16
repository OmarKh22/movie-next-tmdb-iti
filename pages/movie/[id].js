import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const imageBase = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=271646b1495e3e27c91db4814e3a7193&append_to_response=production_companies`
        );
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=271646b1495e3e27c91db4814e3a7193`
        );
        setRecommendations(res.data.results || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchMovie();
    fetchRecommendations();
  }, [id]);

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    // Integrate with wishlist logic here later
  };

  if (!movie)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-600 font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 md:px-12 py-8">
      {/* Header */}
      <div className="w-full max-w-6xl bg-yellow-300 px-8 py-4 flex items-center justify-between mx-auto">
        <span className="font-bold text-gray-900 text-lg">Movie App</span>
        <FaHeart className="text-black text-2xl" />
      </div>

      {/* Movie Card */}
      <div className="w-full max-w-6xl bg-white rounded-b-xl shadow-xl flex flex-col md:flex-row p-10 gap-10 mt-0 mx-auto">
        {/* Poster */}
        <div className="flex-shrink-0 flex justify-start items-start">
          <img
            src={imageBase + movie.poster_path}
            alt={movie.title}
            className="rounded-lg w-[320px] h-[480px] object-cover shadow-lg"
          />
        </div>
        {/* Details */}
        <div className="flex-1 flex flex-col gap-4 items-start justify-start">
          {/* Title + Heart */}
          <div className="flex items-center gap-3 w-full">
            <h1 className="text-3xl font-bold text-gray-900 text-left">{movie.title}</h1>
            <button onClick={handleWishlist} aria-label="Add to wishlist">
              <FaHeart className={isWishlisted ? 'text-yellow-400 text-2xl' : 'text-gray-300 text-2xl'} />
            </button>
          </div>

          {/* Rating: 5 stars */}
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map((i) => (
              <FaStar key={i} className={
                (movie.vote_average/2 >= i ? 'text-yellow-400' : 'text-gray-300') + ' text-xl'
              } />
            ))}
            <span className="ml-2 text-gray-700 text-base font-semibold">{movie.vote_average?.toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-1">({movie.vote_count} votes)</span>
          </div>

          {/* Overview */}
          <p className="text-base text-gray-700 text-left leading-relaxed max-w-2xl">
            {movie.overview}
          </p>

          {/* 3 Yellow Buttons (Genres or placeholders) */}
          <div className="flex gap-3 mb-2">
            {(movie.genres?.slice(0,3).length ? movie.genres?.slice(0,3) : [1,2,3]).map((genre, idx) => (
              <button
                key={genre.id || idx}
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-5 py-1 rounded-full text-sm shadow border border-yellow-300"
              >
                {genre.name || 'Button'}
              </button>
            ))}
          </div>

          {/* Duration and Language */}
          <div className="flex flex-col gap-1 mb-2 w-full">
            <span className="text-gray-800 text-sm">Duration: {movie.runtime} min</span>
            <span className="text-gray-800 text-sm">Language: {movie.original_language?.toUpperCase()}</span>
          </div>

          {/* Studios */}
          <div className="flex gap-4 mt-2 mb-2 flex-wrap">
            {movie.production_companies?.slice(0, 2).map((studio) => (
              <div key={studio.id} className="flex flex-col items-start">
                {studio.logo_path ? (
                  <img
                    src={imageBase + studio.logo_path}
                    alt={studio.name}
                    className="h-10 object-contain bg-white rounded shadow p-1 max-w-[100px]"
                  />
                ) : (
                  <span className="text-xs text-gray-600">{studio.name}</span>
                )}
              </div>
            ))}
          </div>

          {/* Website Link */}
          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-yellow-300 text-yellow-500 bg-white font-semibold px-6 py-2 rounded-full text-sm shadow hover:bg-yellow-50 transition"
            >
              Website
            </a>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="w-full max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
        <Slider
          dots={true}
          infinite={false}
          speed={500}
          slidesToShow={4}
          slidesToScroll={2}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
          ]}
        >
          {recommendations.map((rec) => (
            <div key={rec.id} className="px-2">
              <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={rec.poster_path ? imageBase + rec.poster_path : '/no-image.png'}
                  alt={rec.title || rec.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-base font-semibold truncate text-gray-900">{rec.title || rec.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{rec.release_date || rec.first_air_date}</p>
                  {rec.vote_average && (
                    <span className="inline-block bg-gray-900 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                      {Math.round(rec.vote_average * 10)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
