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
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Genre Page</h1>

      {/* Display Genres */}
      <div className="flex flex-wrap justify-center mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`btn w-40 m-2 ${
              selectedGenre === genre.id
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-800 border border-blue-400"
            } p-2 rounded-md shadow hover:bg-blue-600 hover:text-white transition duration-300`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Display Movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-blue-800">{movie.title}</h3>
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-64">
            <p className="text-blue-800">No movies found for the selected genre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreView;
