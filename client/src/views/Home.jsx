import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MoviesCard from '../components/moviesCard.jsx'

function Home() {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:1010/movies')
      console.log('movies API response:', res?.data)
      setMovies(res?.data?.data ?? [])
    } catch (err) {
      console.error('fetchMovies error', err)
      setMovies([])
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white mb-8">🎬 PopFrame</h1>
      {movies.length === 0 ? (
        <h2 className="text-center text-gray-400 text-xl mt-8">No movies available</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movieObj) => {
            const { _id, title, description, year, images, category, language, rating } = movieObj
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
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home
