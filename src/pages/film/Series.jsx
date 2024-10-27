import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "YOUR_API_KEY"; // Ganti dengan API key kamu

const SeriesView = () => {
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="series bg-white text-black p-5 space-y-8">
      <div className="popular-series">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Series Populer</h2>
        <div className="series-slider overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-4">
            {popularSeries.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        </div>
      </div>

      <div className="top-rated-series">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Series dengan Rating Tertinggi</h2>
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

const SeriesCard = ({ series }) => {
  return (
    <div className="min-w-[200px] shadow-lg rounded-lg bg-blue-100">
      <Link to={`/series/${series.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <h3 className="text-center text-xl font-bold truncate p-2 text-blue-800 hover:text-blue-500">
          {series.name}
        </h3>
      </Link>
    </div>
  );
};

export default SeriesView;
