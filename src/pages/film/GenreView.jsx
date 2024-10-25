import React, { useState, useEffect } from "react";
import axios from "axios";

const GenreView = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = "216ce15710ded054044b07e34eee0562"; // API key Anda
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies by genre
  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenre) {
        try {
          const apiKey = "216ce15710ded054044b07e34eee0562"; // API key Anda
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Genre Page</h1>

      {/* Display Genres */}
      <div className="flex flex-wrap justify-center mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`btn btn-outline w-40 m-2 ${
              selectedGenre === genre.id ? "btn-primary" : "btn-secondary"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Display Movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-gray-900 p-4 rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-white">{movie.title}</h3>
              <p className="mt-2 text-gray-400 text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-64">
            <p className="text-white">No movies found for the selected genre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreView;
