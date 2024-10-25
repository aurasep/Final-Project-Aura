import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const apiKey = "216ce15710ded054044b07e34eee0562";
  const popularApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      const url = searchQuery ? searchApiUrl : popularApiUrl;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError("Gagal memuat data film: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return (
    <header className="header bg-gray-800 text-white p-4">
      {/* Navigation Bar */}
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
        {/* Tambahkan link lainnya jika perlu */}
      </nav>

      {/* Search Input */}
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Cari film..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Loading, Error, and Movies List */}
      {loading && <p className="text-white">Loading Movies...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="movie-list grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item bg-gray-900 p-2 rounded">
            <Link to={`/detail/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2 text-center">
                {movie.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
