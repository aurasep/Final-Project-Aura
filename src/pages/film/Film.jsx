import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch untuk menghubungkan Redux
import { addToMyList } from "../../redux/myListSlice"; // Import action addToMyList dari myListSlice
import FilmView from "./FilmView.jsx"; // Mengimpor FilmView
import axios from "axios";

const API_KEY = "216ce15710ded054044b07e34eee0562"; // Ganti dengan API key kamu

const Film = () => {
  const [film, setFilm] = useState([]); // Ubah dari product menjadi film
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Hook untuk mengakses dispatch Redux

  const ambilFilm = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = response.data.results; // Ambil hasil dari respons
      setFilm(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching films:", err);
      setError("Gagal memuat film.");
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilFilm();
  }, []);

  const handleAddToMyList = (movie) => {
    dispatch(addToMyList(movie)); // Dispatch action untuk menambahkan film ke My List
  };

  if (loading) {
    return <p>Memuat film...</p>; // Tampilkan loading
  }

  if (error) {
    return <p>{error}</p>; // Tampilkan error
  }

  return (
    <FilmView data={film} onAddToMyList={handleAddToMyList} /> // Mengirim data film dan fungsi untuk menambah ke My List
  );
};

export default Film;
