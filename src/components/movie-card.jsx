import React from 'react';
import { MdFavorite } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";

function MovieCard({ poster, title, Release_date, Rating, isFavorite, handleFavorite, handleShowDetails, id }) {
  function handleClick() {
    handleFavorite();
  }

  return (
    <div className="pt-6 flex w-full sm:w-[48%] md:w-[30%] lg:w-[22%] xl:w-[18%]" onClick={handleShowDetails}>
      <div className="border-2 p-2 bg-gray-100 rounded-md w-full">
        <img className="w-full h-auto rounded-md" src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="movie" />
        <div className="flex flex-col mt-2">
          <Link className="text-lg sm:text-xl md:text-2xl text-black truncate font-bold hover:underline flex items-center gap-1" to={`/MovieDetails/${id}`}>
            {title}<TbExternalLink />
          </Link>
          <Link className="text-sm sm:text-base md:text-lg text-gray-600 truncate" to={`/MovieDetails/${id}`}>
            Release Date: {Release_date}
          </Link>
          <Link className="text-sm sm:text-base md:text-lg text-yellow-700 truncate" to={`/MovieDetails/${id}`}>
            Rating: {Rating}
          </Link>
          <button
            onClick={handleClick}
            className={`border-2 mt-2 p-2 w-14 rounded-md ${isFavorite ? "bg-red-400" : "bg-gray-400"}`}
          >
            {isFavorite ? (
              <MdFavorite className="text-2xl mx-auto text-white" />
            ) : (
              <MdFavoriteBorder className="text-2xl mx-auto" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
