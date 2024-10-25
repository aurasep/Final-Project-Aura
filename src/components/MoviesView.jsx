import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoviesView = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = "216ce15710ded054044b07e34eee0562";
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

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenre) {
        try {
          const apiKey = "216ce15710ded054044b07e34eee0562";
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        setMovies([]);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Explore Movies</h1>
        <p className="text-lg text-gray-300">
          Browse a variety of movies by selecting a genre.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-white mb-4">Filter by Genre</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 ease-in-out rounded-md w-32 h-12 mx-1 my-1"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} // Menggunakan ukuran asli dari TMDB
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-2">
                <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
                <p className="mt-1 text-gray-400 text-sm line-clamp-2">
                  {movie.overview}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No movies found for the selected genre.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesView;
