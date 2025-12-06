import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import API_URL from "../constants";
import Rating from "../components/Rating";

function MoviesDetails() {
  const { id } = useParams();

  const [movieInfo, setMovieInfo] = useState({
    title: "",
    description: "",
    year: "",
    images: [],
    category: "",
    language: "",
    rating: 0,
  });

  const chnageRating =   async(newRating) => {
 await  axios.patch(`${API_URL}/movies/${id}/rating`,{rating:newRating

 });
 
setMovieInfo({...movieInfo,rating:newRating});
  


  };
  const loadMovieDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies/${id}`);
      setMovieInfo(response.data.data);
    } catch (error) {
      console.log("Error loading movie details:", error);
    }
  };

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  return (
    <div className="bg-gray-900 min-h-screen p-6 sm:p-10 text-white flex justify-center">

      {/* ADJUSTED CARD SIZE */}
      <div className="w-full max-w-2xl sm:max-w-3xl bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-indigo-400 tracking-wide text-center">
          {movieInfo.title || "Loading..."}
        </h1>

        {/* Poster */}
        {movieInfo.images.length > 0 && (
          <div className="flex justify-center">
            <img
              src={movieInfo.images[0]}
              alt="Movie Poster"
              className="rounded-xl w-full max-w-lg max-h-[450px] object-cover shadow-xl mb-6 hover:scale-[1.02] transition"
            />
          </div>
        )}

        {/* Star Rating */}
<div className="flex justify-center cursor-pointer">
        <Rating onClick={(newRating)=>{
          chnageRating(newRating);
        }} rating={movieInfo.rating} />
       </div>
        {/* Movie Info */}
        <div className="space-y-3 text-lg text-center sm:text-left">

          <p>
            <span className="font-semibold text-indigo-300">Year:</span>{" "}
            {movieInfo.year}
          </p>

          <p>
            <span className="font-semibold text-indigo-300">Language:</span>{" "}
            {movieInfo.language}
          </p>

          <p>
            <span className="font-semibold text-indigo-300">Category:</span>{" "}
            {movieInfo.category}
          </p>

          <p className="mt-4 text-gray-300 leading-relaxed">
            {movieInfo.description}
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg transition font-semibold"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoviesDetails;
