import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../constants.js';
import toast, { Toaster } from 'react-hot-toast';
import { Delete, CirclePlus } from 'lucide-react';

function NewMovies() {
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    description: "",
    year: "",
    images: [
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/chandramukhi-marathi-et00322724-25-04-2022-04-16-50.jpg",
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00445409-alhhbgdtxz-portrait.jpg",
      "https://m.media-amazon.com/images/I/A1xvcW6XqbL._AC_UF1000,1000_QL80_.jpg",
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/all-is-well-et00449139-1749468005.jpg",
    ],
    category: "",
    language: "",
    rating: 0,
  });

  const [newImageUrl, setNewImageUrl] = useState("");

  const addImage = () => {
    const url = newImageUrl.trim();
    if (!url) {
      toast.error("Enter image URL to add");
      return;
    }
    setMovieInfo((prev) => ({ ...prev, images: [...prev.images, url] }));
    setNewImageUrl("");
  };

  const removeImage = (urlToRemove) => {
    setMovieInfo((prev) => ({
      ...prev,
      images: prev.images.filter((u) => u !== urlToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieInfo.title.trim()) {
      toast.error("Title is required");
      return;
    }

    toast.loading("Adding movie...", { id: "add-movie" });

    try {
      // POST new movie to backend
      // Ensure numeric rating if required by backend
      const payload = {
        ...movieInfo,
        rating: Number(movieInfo.rating) || 0,
      };

      const res = await axios.post(`${API_URL}/movies`, payload);

      toast.dismiss("add-movie");

      if (res.status === 201 || res.status === 200) {
        toast.success("Movie added successfully");
        // Go back to home (reload so Home fetches updated list)
        window.location.href = "/";
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      toast.dismiss("add-movie");
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Failed to add movie";
      toast.error(String(msg));
      console.error("Add movie error:", err);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen p-6 flex items-start justify-center">
      <Toaster />
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Add New Movie</h1>
          <div className="flex gap-2">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              ← Back
            </button>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={movieInfo.title}
              onChange={(e) => setMovieInfo({ ...movieInfo, title: e.target.value })}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={movieInfo.description}
              onChange={(e) => setMovieInfo({ ...movieInfo, description: e.target.value })}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                value={movieInfo.year}
                onChange={(e) => setMovieInfo({ ...movieInfo, year: e.target.value })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={movieInfo.category}
                onChange={(e) => setMovieInfo({ ...movieInfo, category: e.target.value })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="language">Language</label>
              <input
                type="text"
                id="language"
                value={movieInfo.language}
                onChange={(e) => setMovieInfo({ ...movieInfo, language: e.target.value })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                min="0"
                max="5"
                value={movieInfo.rating}
                onChange={(e) => setMovieInfo({ ...movieInfo, rating: e.target.value })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Images section */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">Image URLs</label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Paste image URL and click +"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                type="button"
                onClick={addImage}
                title="Add image"
                className="inline-flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              >
                <CirclePlus size={18} />
              </button>
            </div>

            <div className="flex flex-wrap">
              {movieInfo.images.map((imgUrl, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={imgUrl}
                    alt={`Movie ${index + 1}`}
                    className="h-28 w-40 object-cover rounded-md border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(imgUrl)}
                    className="absolute top-1 right-1 bg-gray-800 rounded-full p-1 text-white hover:bg-red-600"
                    title="Remove image"
                  >
                    <Delete size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMovies;

