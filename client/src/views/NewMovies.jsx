import React from 'react'
import axios from 'axios'
import API_URL from '../constants.js';
import { useState } from 'react';
import { Delete, CirclePlus } from 'lucide-react';

function NewMovies() {
const [movieInfo, setMovieInfo] = useState({
    title: "",
    description: "",
    year: "",
    images: ["https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/chandramukhi-marathi-et00322724-25-04-2022-04-16-50.jpg",
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00445409-alhhbgdtxz-portrait.jpg",
        "https://m.media-amazon.com/images/I/A1xvcW6XqbL._AC_UF1000,1000_QL80_.jpg",
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/all-is-well-et00449139-1749468005.jpg",

    ],
    category: "",
    language: "",
    rating: 0,
  });

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Add New Movie</h1>
        <form className="space-y-4 max-w-lg">
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={movieInfo.title}
                    onChange={(e) => setMovieInfo({ ...movieInfo, title: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
                />
                <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={movieInfo.description}
                    onChange={(e) => setMovieInfo({ ...movieInfo, description: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
                />
                <label className="block text-sm font-medium mb-1" htmlFor="year">Year</label>
                <input
                    type="text"
                    id="year"   
                    value={movieInfo.year}
                    onChange={(e) => setMovieInfo({ ...movieInfo, year: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
                />
                <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
                <input
                    type="text"     
                    id="category"
                    value={movieInfo.category}
                    onChange={(e) => setMovieInfo({ ...movieInfo, category: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
                />
                <label className="block text-sm font-medium mb-1" htmlFor="language">Language</label>
                <input
                    type="text"
                    id="language"
                    value={movieInfo.language}
                    onChange={(e) => setMovieInfo({ ...movieInfo, language: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
                />  

                <label className="block text-sm font-medium mb-1" htmlFor="images">Image URLs (comma separated)</label> 
              
            <div className='mb-4 block'>
                  <input
                    type="text"
                   placeholder='img'
                      className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
                  
                />
       
             {
               movieInfo.images.map((imgUrl, index) => {
                return(
                <div key={index} className='inline-block relative'>
                <img
                    key={index}
                    src={imgUrl}
                    type="text"
                    value={imgUrl}
                    className='h-40 w-26 m-2 object-cover  position-relative inline-block'
                     alt={`Movie Image ${index + 1}`}

                

                />
                 <Delete className='absolute bottom-0 right-2 bg-gray-800 rounded-full p-1 cursor-pointer text-white ' onClick={()=>{
                    const filteredImages = movieInfo.images.filter((img)=>img!=imgUrl);
                    setMovieInfo({...movieInfo, images: filteredImages })
                     }} />
            </div>
            )
                     
               })}
            <CirclePlus className='inline-block cursor-pointer text-gray ' />
         
             
              
</div>

            
            </div>
            <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
            >
                Add Movie
            </button> 
        </form>

    </div>
  )
}

export default NewMovies;

