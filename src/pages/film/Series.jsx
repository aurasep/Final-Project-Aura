import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "YOUR_API_KEY"; // Ganti dengan API key kamu

const SeriesView = () => {
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil series populer
  const fetchPopularSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`
      );
      setPopularSeries(response.data.results);
    } catch (err) {
      setError("Gagal memuat series populer: " + err.message);
    }
  };

  // Fungsi untuk mengambil series dengan rating tertinggi
  const fetchTopRatedSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`
      );
      setTopRatedSeries(response.data.results);
    } catch (err) {
      setError("Gagal memuat series dengan rating tertinggi: " + err.message);
    }
  };

  // Mengambil data series saat komponen pertama kali dimuat
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPopularSeries(), fetchTopRatedSeries()])
      .then(() => setLoading(false))
      .catch((err) => setError("Gagal memuat data series: " + err.message));
  }, []);

  if (loading) {
    return <p>Memuat series...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="series bg-gray-800 text-white p-5 space-y-8">
      {/* Section untuk series populer */}
      <div className="popular-series">
        <h2 className="text-2xl font-bold mb-4">Series Populer</h2>
        <div className="series-slider overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-4">
            {popularSeries.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        </div>
      </div>

      {/* Section untuk series dengan rating tertinggi */}
      <div className="top-rated-series">
        <h2 className="text-2xl font-bold mb-4">Series dengan Rating Tertinggi</h2>
        <div className="series-slider overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-4">
            {topRatedSeries.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk menampilkan kartu series
const SeriesCard = ({ series }) => {
  return (
    <div className="min-w-[200px] shadow-lg rounded-lg">
      <Link to={`/series/${series.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <h3 className="text-center text-xl font-bold truncate p-2 hover:text-red-500">
          {series.name}
        </h3>
      </Link>
    </div>
  );
};

export default SeriesView;
