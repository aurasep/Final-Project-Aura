import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeFromMyList } from "../../redux/myListSlice";
import { FaHeart, FaTrash } from "react-icons/fa";

const API_KEY = "216ce15710ded054044b07e34eee0562";

const Detail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.myList.myList);

  const isInMyList = myList.some((movie) => movie.id === parseInt(id));

  useEffect(() => {
    const fetchFilmDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setFilm(response.data);

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailers = trailerResponse.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }

        setLoading(false);
      } catch (error) {
        setError("Gagal memuat detail film: " + error.message);
        setLoading(false);
      }
    };

    fetchFilmDetail();
  }, [id]);

  const handleAddToMyList = () => {
    if (film) {
      dispatch(addToMyList(film));
    }
  };

  const handleRemoveFromMyList = () => {
    dispatch(removeFromMyList(film.id));
  };

  const handleRatingChange = (newRating) => {
    const validRating = Math.max(0, Math.min(10, newRating));
    setRating(validRating);

    const currentRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    currentRatings[id] = validRating;
    localStorage.setItem("ratings", JSON.stringify(currentRatings));
  };

  if (loading) {
    return <p>Loading Movies Detail...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!film) {
    return <p>Tidak ada detail untuk film ini.</p>;
  }

  return (
    <div className="bg-white text-black p-5"> {/* Changed to white background and black text */}
      <div className="relative mb-6">
        {trailerKey && (
          <div className="relative">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1`}
              title={`${film.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <h2 className="text-xl font-bold">{film.title} - Official Trailer</h2>
              <p className="text-sm">Watch the official trailer of {film.title}</p>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4">
          {isInMyList ? (
            <button
              className="bg-red-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-red-600 flex items-center space-x-2"
              onClick={handleRemoveFromMyList}
            >
              <FaTrash />
              <span>Remove from MyList</span>
            </button>
          ) : (
            <button
              className="bg-green-500 text-white rounded-lg px-4 py-2 transition duration-300 hover:bg-green-600 flex items-center space-x-2"
              onClick={handleAddToMyList}
            >
              <FaHeart />
              <span>Add to MyList</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
          alt={film.title}
          className="w-full lg:w-1/3 object-cover rounded-lg"
        />
        <div className="flex-1 relative">
          <h1 className="text-3xl font-bold mb-4">{film.title}</h1>
          <p className="text-lg mb-4">{film.overview}</p> {/* Ukuran font diperbesar */}
          <p className="mb-2">
            <strong>Release Date:</strong> {film.release_date}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {film.vote_average} / 10
          </p>
          <p className="mb-2">
            <strong>Runtime:</strong> {film.runtime} minutes
          </p>
          <div className="absolute bottom-4 right-0 flex items-center space-x-2">
            <button
              className="btn"
              onClick={() => handleRatingChange(rating - 1)}
            >
              -
            </button>
            <span className="text-black">⭐Rating: {rating} / 10</span> {/* Changed text color to black */}
            <button
              className="btn"
              onClick={() => handleRatingChange(rating + 1)}
            >
              +
            </button>
          </div>
          <div className="mt-4">
            <Link to="/movies" className="text-blue-500 hover:text-blue-700"> {/* Adjusted hover color */}
              ⬅️ Kembali ke Daftar Film
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
