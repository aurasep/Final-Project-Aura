import axios from "axios";

export const DETAIL_FILM = "DETAIL_FILM";

// Action creator untuk mengatur detail film
export const setFilmDetail = (film) => ({
  type: DETAIL_FILM,
  payload: film,
});

// Fungsi untuk mendapatkan detail film dari API
export const fetchFilmDetail = (id) => {
  return async (dispatch) => {
    const API_KEY = "216ce15710ded054044b07e34eee0562"; // Ganti dengan API Key Anda
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      // Dispatch action untuk menyimpan detail film ke state
      dispatch(setFilmDetail(response.data));
    } catch (error) {
      console.error("Error fetching film detail:", error);
      // Anda dapat juga menambahkan dispatch untuk menangani error jika diperlukan
    }
  };
};
