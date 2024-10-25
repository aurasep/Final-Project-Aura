import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating"; // Pastikan path ini benar sesuai dengan lokasi file Rating.js

const RatingAnda = () => {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    const movieIds = Object.keys(storedRatings);
  
    const filteredRatedMovies = movieIds
      .filter((id) => storedRatings[id] > 0) // Hanya ambil yang ratingnya lebih dari 0
      .map((id) => ({
        id: id,
        rating: storedRatings[id],
      }));
  
    setRatedMovies(filteredRatedMovies);
  }, []);
  

  return (
    <div className="rated-movies bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-4">Film yang Sudah Anda Rating</h2>
      {ratedMovies.length === 0 ? (
        <p>Tidak ada film yang di-rating.</p>
      ) : (
        <div className="movie-slider overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-4">
            {ratedMovies.map(({ id, rating }) => (
              <RatedMovieCard key={id} movieId={id} initialRating={rating} />
            ))}
          </div>
        </div>
      )}
      {/* Link Kembali ke Daftar Film diletakkan di luar loop, di bawah list film yang sudah di-rating */}
      <div className="mt-4">
        <Link to="/film" className="text-blue-500 hover:text-blue-300">
          ⬅️Daftar Film
        </Link>
      </div>
    </div>
  );
};

const RatedMovieCard = ({ movieId, initialRating }) => {
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=216ce15710ded054044b07e34eee0562&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Gagal mengambil detail film: ", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    const currentRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    currentRatings[movieId] = newRating;
    localStorage.setItem("ratings", JSON.stringify(currentRatings));
  };

  if (!movie) {
    return <p>Memuat film...</p>;
  }

  return (
    <div className="min-w-[200px] max-w-[200px] shadow-lg rounded-lg overflow-hidden">
      <Link to={`/detail/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <h3 className="text-center text-xl font-bold truncate p-2 hover:text-red-500">
          {movie.title}
        </h3>
      </Link>
      <div className="flex justify-center items-center p-2">
        <Rating
          rating={rating}
          onRatingChange={handleRatingChange}
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default RatingAnda;
