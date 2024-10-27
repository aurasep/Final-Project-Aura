import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "216ce15710ded054044b07e34eee0562";

const FilmView = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
      );
      setPopularMovies(response.data.results);
    } catch (err) {
      setError("Gagal memuat film populer: " + err.message);
    }
  };

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`
      );
      setNowPlayingMovies(response.data.results);
    } catch (err) {
      setError("Gagal memuat film yang sedang tayang: " + err.message);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
      );
      setTopRatedMovies(response.data.results);
    } catch (err) {
      setError("Gagal memuat film dengan rating tertinggi: " + err.message);
    }
  };

  const searchMovies = async (query) => {
    if (!query) {
      setSearchedMovies([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US`
      );
      setSearchedMovies(response.data.results);
    } catch (err) {
      setError("Gagal memuat hasil pencarian: " + err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchPopularMovies(),
      fetchNowPlayingMovies(),
      fetchTopRatedMovies(),
    ])
      .then(() => setLoading(false))
      .catch((err) => setError("Gagal memuat data film: " + err.message));
  }, []);

  if (loading) {
    return <p>Loading Movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home bg-white text-black p-5 space-y-8 overflow-y-hidden">
      <div className="mb-4">
        <input
          type="text"
          className="bg-gray-200 text-black rounded-lg p-2 w-full max-w-xs border border-gray-400"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            searchMovies(e.target.value);
          }}
        />
      </div>

      {searchedMovies.length > 0 && (
        <MovieSlider title="Hasil Pencarian" movies={searchedMovies} />
      )}

      <MovieSlider title="Film Populer" movies={popularMovies} />
      <MovieSlider title="Film yang Sedang Tayang" movies={nowPlayingMovies} />
      <MovieSlider title="Film dengan Rating Tertinggi" movies={topRatedMovies} />
    </div>
  );
};

const MovieSlider = ({ title, movies }) => {
  return (
    <div className="movie-slider-container mb-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
      <div className="flex space-x-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card relative max-w-[200px] min-w-[200px] cursor-pointer group scroll-snap-start">
      <Link to={`/detail/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <h3 className="text-black text-center mt-2 text-xl group-hover:text-red-500">
          {movie.title}
        </h3>
      </Link>
    </div>
  );
};

export default FilmView;
