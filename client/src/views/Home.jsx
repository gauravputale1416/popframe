import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import MoviesCard from '../components/moviesCard.jsx'
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [error, setError] = useState(false);

  // 🌟 debounce timer stored in a ref so it persists
  const debounceRef = useRef(null);

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies`);
      setMovies(res?.data?.data ?? []);
    } catch (err) {
      console.error('fetchMovies error', err);
      setMovies([]);
    }
  };

  // Search movies
  const handleSearch = async () => {
    if (!searchMovie.trim()) {
      fetchMovies();
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/search?q=${searchMovie}`
      );

      const data = res.data.data || [];

      setMovies(data);

      // 🚨 Show toast when no movies found
      if (data.length === 0) {
        toast.error("No movies found!");
      }

    } catch (err) {
      setMovies([]);
      setError(err?.response?.data?.message || "An error occurred");
      toast.error("Error searching movies");
    }
  };

  // 🔥 Live Search (Debounced)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch();
    }, 500); // 0.5 sec delay

    return () => clearTimeout(debounceRef.current);
  }, [searchMovie]);

  // Load movies first time
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen p-6">

      {/* 🔍 Dark-Themed Search Box */}
      <div className="mb-6 w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Movie..."
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-indigo-500 transition"
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="absolute right-3 top-2.5 text-gray-300 hover:text-white"
          >
            🔍
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-white mb-8">🎬 PopFrame</h1>

      {movies.length === 0 ? (
        <h2 className="text-center text-gray-400 text-xl mt-8">
          No movies available
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movieObj) => {
            const { _id, title, description, year, images, category, language, rating } = movieObj;

            return (
              <MoviesCard
                key={_id}
                title={title}
                description={description}
                year={year}
                images={images}
                category={category}
                language={language}
                rating={rating}
              />
            );
          })}
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default Home;
