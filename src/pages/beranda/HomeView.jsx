import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [genreDescription, setGenreDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const apiKey = "216ce15710ded054044b07e34eee0562";
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        setError("Error fetching genres. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenre) {
        try {
          setLoading(true);
          const apiKey = "216ce15710ded054044b07e34eee0562";
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`
          );
          setMovies(response.data.results);
          // Set genre description based on selected genre
          const genre = genres.find((g) => g.id === parseInt(selectedGenre));
          if (genre) {
            setGenreDescription(`Showing movies in the "${genre.name}" genre.`);
          }
        } catch (error) {
          setError("Error fetching movies. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setMovies([]);
        setGenreDescription("");
      }
    };

    fetchMovies();
  }, [selectedGenre, genres]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleClearGenre = () => {
    setSelectedGenre("");
    setMovies([]);
    setGenreDescription("");
  };

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to MyStream!</h1>
        <p className="text-lg text-gray-300">
          Discover a world of movies and shows, from the latest releases to timeless classics. MyStream is your go-to platform for everything cinematic!
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-white mb-4">Filter by Genre</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`${
                selectedGenre === genre.id ? "bg-red-600" : "bg-gray-600"
              } text-white hover:bg-red-600 transform hover:scale-105 transition-transform duration-200 ease-in-out rounded-md w-32 h-12 mx-1 my-1`}
            >
              {genre.name}
            </button>
          ))}
        </div>
        {selectedGenre && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClearGenre}
              className="bg-red-600 text-white hover:bg-gray-600 transform hover:scale-105 transition-transform duration-200 ease-in-out rounded-md w-32 h-12"
            >
              Clear Genre
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <p className="text-white text-center">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div>
          {genreDescription && (
            <p className="text-white text-center mb-4">{genreDescription}</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
                    <p className="text-yellow-400">{movie.vote_average ? `Rating: ${movie.vote_average}` : "No rating"}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-64">
                <p className="text-white text-center">No movies found for the selected genre.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
