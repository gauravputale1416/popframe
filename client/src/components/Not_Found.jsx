import React from 'react'
import { Link } from 'react-router'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Movie Reel Animation */}
        <div className="mb-8 flex justify-center gap-4 text-6xl animate-bounce">
          <span>🎬</span>
          <span className="animation-delay-100">🎞️</span>
          <span className="animation-delay-200">🎥</span>
        </div>

       
        <h1 className="text-9xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          404
        </h1>

       
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Scene Not Found! 🎭
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md mx-auto">
          Oops! This page left the cinema. It seems you've wandered into an unreleased scene of PopFrame.
        </p>

        {/* Movie Related Messages */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <span className="px-4 py-2 bg-red-600/20 border border-red-500 rounded-full text-red-300 text-sm">
            🍿 Popcorn not found
          </span>
          <span className="px-4 py-2 bg-purple-600/20 border border-purple-500 rounded-full text-purple-300 text-sm">
            🎞️ Reel missing
          </span>
          <span className="px-4 py-2 bg-pink-600/20 border border-pink-500 rounded-full text-pink-300 text-sm">
            ⭐ No stars here
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            to="/" 
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            🏠 Back to Home
          </Link>
          <Link 
            to="/movies" 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            🎬 Browse Movies
          </Link>
        </div>

        {/* Footer Emoji */}
        <div className="text-5xl animate-pulse">
          🎭 📽️ 🎪
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">🍿</div>
          <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-float" style={{animationDelay: '2s'}}>🎬</div>
          <div className="absolute top-1/2 left-1/4 text-3xl opacity-10">⭐</div>
          <div className="absolute top-1/3 right-1/4 text-3xl opacity-10">🎞️</div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
