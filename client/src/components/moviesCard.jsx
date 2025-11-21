import React from "react";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import API_URL from "../constants.js";
import Rating from "./Rating.jsx";

function MoviesCard({ _id, title, description, year, images, category, language, rating , loadMovies}) {
    
    

 
const handleDelete = async () => {
    try {
        await axios.delete(`${API_URL}/movies/${_id}`);
        toast.success("Movie deleted successfully");
        loadMovies(); 
    } catch (error) {
        toast.error("Error deleting movie");
    }
};
    return (
        <Link
            to={`/movie/${_id}`}
            className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg 
                       hover:shadow-2xl hover:scale-105 transform transition duration-300"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-gray-800">
                <img
                    src={Array.isArray(images) ? images[0] : images}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />

               
                <button
                    className="absolute top-2 right-2 
                               bg-white text-red-600 
                               hover:bg-red-600 hover:text-white
                               p-2 rounded-full shadow-xl 
                               border border-gray-300 
                               flex items-center justify-center
                               transition cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                        e.stopPropagation();
                    }}
                >
                    <Trash2 className=" w-5 h-5" />
                </button>
            </div>

            {/* Movie Content */}
            <div className="p-4">
                <h3 className="text-lg font-bold mb-1 truncate">{title}</h3>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-2">
                   
                    <span className="text-gray-400 text-sm ml-1"><Rating rating={rating} /></span>
                </div>

                <p className="text-xs text-gray-400 mb-1">
                    {year} • {category}
                </p>

                <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                    {description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                        {language}
                    </span>

                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white 
                                      text-sm font-semibold px-3 py-1 rounded transition">
                        Watch
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default MoviesCard;
