import React from "react";
import { useSelector } from "react-redux";

const MyList = () => {
  const myList = useSelector((state) => state.myList.myList);

  if (!Array.isArray(myList)) {
    return <p>Error: My list data is not available or is not an array.</p>;
  }

  return (
    <div className="my-list bg-gray-800 text-white p-5">
      {myList.length === 0 ? (
        <p>No movies in your list yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {myList.map((movie) => (
            <div key={movie.id} className="movie-card bg-gray-700 rounded-lg p-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg font-bold">{movie.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
