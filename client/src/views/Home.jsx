import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import MoviesCard from '../components/moviesCard.jsx'
import toast, { Toaster } from 'react-hot-toast';
import imgnotfound from '../assets/notfound.png'
import API_URL from '../constants.js';
import { Trash2 } from 'lucide-react';


function Home() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [noResult, setNoResult] = useState(false); // 👈 new state

  const debounceRef = useRef(null);


  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setMovies(res?.data?.data ?? []);
      setNoResult(false); // reset
    } catch (err) {
      console.error('fetchMovies error', err);
      setMovies([]);
    }
  };

  const handleSearch = async () => {
    toast.loading("Searching movies...", { id: "search" });

    if (!searchMovie.trim()) {
      fetchMovies();
      toast.dismiss("search");
      return;
    }

    try {
      const res = await axios.get(
        `${API_URL}/movies/search?q=${searchMovie}`
      );

      const data = res.data.data || [];
      setMovies(data);

      toast.dismiss("search");

      if (data.length === 0) {
        setNoResult(true); // show Not Found UI
        toast.error("No movies found!", { id: "no-movie" });
      } else {
        setNoResult(false);
      }

    } catch (err) {
      toast.dismiss("search");
      toast.error("Error searching movies", { id: "search-error" });
      setMovies([]);
      setNoResult(true);
    }
  };

  // Live search (debounced)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [searchMovie]);

  // Load movies first time
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen p-6">

    
      <div className="mb-6 w-full max-w-md mx-auto">
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

      <h1 className="text-4xl font-bold text-white mb-8 text-center">🎬 PopFrame</h1>

      {noResult && (
        <div className="flex flex-col items-center mt-10">
          <img src={imgnotfound} className="w-80 opacity-80" alt="Not Found" />
          <p className="text-gray-400 text-lg mt-4">No movies found</p>
        </div>
      )}

      {/* Movies Grid */}
      {!noResult && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movieObj) => {
            const { _id, title, description, year, images, category, language, rating } = movieObj;

            return (
              <MoviesCard
              _id={_id}
                key={_id}
                title={title}
                description={description}
                year={year}
                images={images}
                category={category}
                language={language}
                rating={rating}
                loadMovies={fetchMovies}
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
