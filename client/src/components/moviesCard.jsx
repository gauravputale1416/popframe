import React from 'react'
import { Link, Links } from 'react-router'

function MoviesCard({_id, title, description, year, images, category, language, rating }) {
    // Generate star rating display (0-5 stars)
    const renderStars = (rate) => {
        const stars = []
        const roundedRating = Math.round(rate) || 0
        
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < roundedRating ? 'text-yellow-400' : 'text-gray-500'}>
                    ★
                </span>
            )
        }
        return stars
    }

    return (
       
         <Link to={`/movie/${_id}`}
        className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform">
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-gray-800">
                <img
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    src={Array.isArray(images) ? images[0] : images}
                    alt={title}
                />
                {/* Star Rating Badge */}
                <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-sm font-bold px-2 py-1 rounded flex gap-0.5">
                    {renderStars(rating)}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-bold mb-1 truncate">{title}</h3>
                <p className="text-xs text-gray-400 mb-2">{year} • {category}</p>
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{language}</span>
                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-3 py-1 rounded transition-colors">
                        Watch
                    </button>
                </div>
            </div>
        
        </Link>
    )
}

export default MoviesCard
