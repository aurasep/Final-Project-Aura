import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToMyList } from "../redux/myListSlice"; // Sesuaikan path import

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const handleAddToMyList = () => {
    dispatch(addToMyList(movie));
  };

  return (
    <div className="movie-card relative max-w-[200px] min-w-[200px] cursor-pointer group scroll-snap-start">
      <Link to={`/detail/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <h3 className="text-white text-center mt-2 text-xl group-hover:text-red-500">
          {movie.title}
        </h3>
      </Link>
      <button
        onClick={handleAddToMyList}
        className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2 w-full transition duration-300 hover:bg-red-600"
      >
        Tambah ke MyList
      </button>
    </div>
  );
};

export default MovieCard;
