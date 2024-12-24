import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import MovieCard from '../components/movie-card';
import MovieModal from '../components/movie-modal';
import { dummy } from './../data/data';
import { useParams } from 'react-router-dom';

function capitalizeFirstLetter(str) {
    if (!str) return ''; // Handle empty string or null
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Genre() {
    const params = useParams()
    const genre = params?.genre || ""
    
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [open, setOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)

    function makeFavorite(movie) {
        setFavorites([...favorites, movie]);
    }

    function removeFavorite(movie) {
        const filtered = favorites.filter((mov) => mov.id !== movie.id);
        setFavorites(filtered);
    }

    function handleSearch(e) {
        const filtered = dummy.filter((movie) =>
            movie.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setMovies(filtered);
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
        setOpen(true)
        setSelectedMovie(movie)
    }

    function handleClose() {
        setOpen(false)
        setSelectedMovie(null)
    }

    useEffect(() => {
        document.title = `${genre} movies`
    }, [])

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

    useEffect(() => {
        const filtered = dummy.filter((movie) => movie.genre_names.includes(genre));
        setMovies(filtered);
    }, [genre]);

    return (
        <div className="px-4 md:px-16 pt-8">
            <div className="flex justify-between items-center">

                <h2 className="font-bold text-2xl">{capitalizeFirstLetter(genre)} Movies</h2>
                <div className="flex items-center border-2 px-3 py-2 rounded-lg bg-white">
                    <input
                        onChange={handleSearch}
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
            {open && selectedMovie && (
                <MovieModal
                    title={selectedMovie.title}
                    overview={selectedMovie.overview}
                    handleClose={handleClose}
                />
            )}
        </div>

    );
}

export default Genre;
