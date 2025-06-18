import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MovieCard from '../../components/MovieCard';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState(null);
  const imageBase = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies?endpoint=/movie/${id}&append_to_response=production_companies`);
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Failed to load movie details');
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`/api/movies?endpoint=/movie/${id}/recommendations`);
        setRecommendations(res.data.results || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Don't set error for recommendations, just log it
      }
    };

    fetchMovie();
    fetchRecommendations();
  }, [id]);

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    // Client-side: Store in localStorage for persistence
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== movie.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      // Add to wishlist
      const movieToAdd = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      };
      wishlist.push(movieToAdd);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-red-600 font-semibold">
        {error}
      </div>
    );
  }

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
            src={movie.poster_path ? imageBase + movie.poster_path : '/no-image.png'}
            alt={movie.title || 'Movie'}
            className="rounded-lg w-[320px] h-[480px] object-cover shadow-lg"
            onError={(e) => {
              e.target.src = '/no-image.png';
            }}
          />
        </div>
        {/* Details */}
        <div className="flex-1 flex flex-col gap-4 items-start justify-start">
          {/* Title + Heart */}
          <div className="flex items-center gap-3 w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 text-left">{movie.title || 'Unknown Title'}</h1>
            <button onClick={handleWishlist} aria-label="Add to wishlist" className="ml-auto">
              <FaHeart className={isWishlisted ? 'text-yellow-400 text-2xl' : 'text-gray-300 text-2xl'} />
            </button>
          </div>

          {/* Rating: 5 stars */}
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map((i) => (
              <FaStar key={i} className={
                ((movie.vote_average || 0)/2 >= i ? 'text-black' : 'text-gray-300') + ' text-xl'
              } />
            ))}
            <span className="ml-2 text-gray-700 text-base font-semibold">{(movie.vote_average || 0).toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-1">({movie.vote_count || 0} votes)</span>
          </div>

          {/* Overview */}
          <p className="text-base text-gray-700 text-left leading-relaxed max-w-2xl">
            {movie.overview || 'No overview available'}
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
            <span className="text-gray-800 text-sm">Duration: {movie.runtime || 'Unknown'} min</span>
            <span className="text-gray-800 text-sm">Language: {(movie.original_language || 'en').toUpperCase()}</span>
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
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
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
        {recommendations.length > 0 ? (
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
                <MovieCard movie={rec} />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-500 text-center">No recommendations available</p>
        )}
      </div>
    </div>
  );
}
