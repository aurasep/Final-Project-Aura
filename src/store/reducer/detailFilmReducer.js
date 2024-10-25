// src/reducer/detailFilmReducer.js
import { DETAIL_FILM } from "../action/filmDetailAction"; // Pastikan jalur ini sesuai

const initialState = {
  film: {}, // State awal untuk menyimpan detail film
};

const detailFilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_FILM:
      return {
        ...state,
        film: action.payload, // Simpan detail film dari action.payload
      };
    default:
      return state; // Kembalikan state saat ini jika action tidak dikenal
  }
};

export default detailFilmReducer;
