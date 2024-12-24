import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import MovieCard from '../components/movie-card';
import MovieModal from '../components/movie-modal';

const api_key = "0eaae2146624836f2825bc2d4154ad6e"
const origin = "https://api.themoviedb.org/3"

function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    try {
      const url = `${origin}/search/movie?api_key=${api_key}&query=${searchValue}`
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data?.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!searchValue) {
      getMovies()
      return
    }
    handleSearch()
  }, [searchValue])

  //fetch movies
  const getMovies = async () => {
    try {
      setLoading(true)
      const url = `${origin}/movie/popular?api_key=${api_key}&language=en-US&page=${currentPage}`
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data?.results)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = `Net videos - Page ${currentPage}`
    getMovies()
  }, [currentPage])


  function makeFavorite(movie) {
    setFavorites([...favorites, movie]);
  }

  function removeFavorite(movie) {
    const filtered = favorites.filter((mov) => mov.id !== movie.id);
    setFavorites(filtered);
  }

  function checkIsFavourite(movie) {
    const found = favorites.find((mov) => mov.id === movie.id);
    return !!found;
  }

  function handleFavorite(movie) {
    const found = favorites.find((mov) => mov.id === movie.id);
    if (found) {
      removeFavorite(movie);
    } else {
      makeFavorite(movie);
    }
  }

  function handleShowDetails(movie) {
    // setOpen(true)
    // setSelectedMovie(movie)
  }

  function handleClose() {
    setOpen(false)
    setSelectedMovie(null)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      document.body.style.position = "fixed"
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
      document.body.style.position = "unset"
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "unset"
    };
  }, [open]);

  if (loading) {
    return <div className="flex italic items-center justify-center h-[calc(100vh-100px)]">We are preparing the best collections for you...</div>
  }

  return (
    <div className="px-4 md:px-16 pt-8">
      <div className="flex justify-between items-center">

        <h2 className="font-bold text-2xl">Popular Movies</h2>
        <div className="flex items-center border-2 px-3 py-2 rounded-lg bg-white">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 focus:outline-none text-sm sm:text-base bg-transparent"
            type="text"
            placeholder="Search movies..."
          />
          <IoSearch className="text-lg ml-2 text-gray-500" />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-6 justify-center">
        {movies.map((movie) => (
          <MovieCard
            isFavorite={checkIsFavourite(movie)}
            Rating={movie.vote_average}
            Release_date={movie.release_date}
            poster={movie.poster_path}
            title={movie.title}
            key={movie.id}
            handleFavorite={() => handleFavorite(movie)}
            handleShowDetails={() => handleShowDetails(movie)}
            id={movie.id}

          />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <button
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1)
          }}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
      {/* {open && selectedMovie && (
        <MovieModal
          title={selectedMovie.title}
          overview={selectedMovie.overview}
          handleClose={handleClose}
        />
      )} */}
    </div>

  );
}

export default Home;
