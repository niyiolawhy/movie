import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const origin = "https://api.themoviedb.org/3"
const api_key = "0eaae2146624836f2825bc2d4154ad6e"

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const id = params?.id || "";

  const movieDetails = async () => {
    try {
      setLoading(true)
      const url = `${origin}/movie/${id}?api_key=${api_key}`
      const response = await fetch(url)
      const data = await response.json()
      setMovie(data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    movieDetails()
  }, [])

  if (loading) {
    return <div className="flex italic items-center justify-center h-[calc(100vh-100px)]">Details will be up in a bit!</div>
  }
  return (
    <div className=" ">
      <div className="bg-white overflow-hidden w-[90%] max-w-6xl  mx-auto">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            alt={`${movie?.title} backdrop`}
            className="w-full h-72 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16"></div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt={`${movie?.title} Poster`}
              className="w-40 h-auto rounded-lg shadow-md md:mr-6"
            />
            <div className="mt-4 md:mt-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{movie?.title}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Release Date: {movie?.release_date}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Language: {movie?.original_language.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Popularity: {movie?.popularity.toFixed(1)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {movie?.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-sm rounded-full text-gray-700"
                  >
                    {genre?.name}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-gray-700">{movie?.overview}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-yellow-500 text-xl font-bold">
              {movie?.vote_average.toFixed(1)}
            </span>
            <span className="ml-2 text-gray-600 text-sm">
              ({movie?.vote_count} Votes)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
