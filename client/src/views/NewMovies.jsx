import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../constants.js";
import toast, { Toaster } from "react-hot-toast";
import { Delete, CirclePlus } from "lucide-react";
import { useParams, useNavigate } from "react-router";

function NewMovies() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // fallback to localhost:1010 if env variable is not provided
  const BASE_URL = API_URL || "http://localhost:1010";

  const getIdFromQuery = () => {
    try {
      const sp = new URLSearchParams(window.location.search);
      return sp.get("id");
    } catch {
      return null;
    }
  };

  const editId = params?.id || getIdFromQuery();

  const [movieInfo, setMovieInfo] = useState({
    title: "",
    description: "",
    year: "",
    images: [
      // keep some default thumbnails to make the UI friendly; user can remove/add
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/chandramukhi-marathi-et00322724-25-04-2022-04-16-50.jpg",
    ],
    category: "",
    language: "",
    director: "", // NEW: required by backend
    rating: 0,
  });

  const [newImageUrl, setNewImageUrl] = useState("");

  // Load movie when editing (if editId exists)
  useEffect(() => {
    if (!editId) return;

    let mounted = true;
    setLoading(true);
    axios
      .get(`${BASE_URL}/movies/${editId}`)
      .then((res) => {
        const movie = res?.data?.data || res?.data || null;
        if (movie && mounted) {
          setMovieInfo({
            title: movie.title || "",
            description: movie.description || "",
            year: movie.year || "",
            images: Array.isArray(movie.images) ? movie.images : movie.images ? [movie.images] : [],
            category: movie.category || "",
            language: movie.language || "",
            director: movie.director || "", // ensure director is loaded
            rating: movie.rating ?? 0,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load movie for editing:", err?.response?.data || err.message);
        toast.error("Failed to load movie for editing");
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

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

  const validateRequired = (obj) => {
    // backend required fields: title, description, images, category, director, year, language
    const required = ["title", "description", "images", "category", "director", "year", "language"];
    const missing = [];
    required.forEach((key) => {
      const val = obj[key];
      if (key === "images") {
        if (!Array.isArray(val) || val.length === 0) missing.push("images (at least one)");
      } else if (typeof val === "string") {
        if (!val.trim()) missing.push(key);
      } else if (val === undefined || val === null) {
        missing.push(key);
      }
    });
    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // build a normalized payload (strings trimmed)
    const payload = {
      title: String(movieInfo.title || "").trim(),
      description: String(movieInfo.description || "").trim(),
      images: Array.isArray(movieInfo.images) ? movieInfo.images.filter(Boolean) : [],
      category: String(movieInfo.category || "").trim(),
      director: String(movieInfo.director || "").trim(),
      year: String(movieInfo.year || "").trim(),
      language: String(movieInfo.language || "").trim(),
      rating: Number(movieInfo.rating) || 0,
    };

    const missing = validateRequired(payload);
    if (missing.length > 0) {
      toast.error(`Missing required fields: ${missing.join(", ")}`);
      return;
    }

    setLoading(true);
    toast.loading(editId ? "Saving movie (POST)..." : "Adding movie...", { id: "add-movie" });

    try {
      let res;
      // As requested, always POST to /movies (include _id when editing so backend can detect update if it supports it)
      const body = editId ? { ...payload, _id: editId } : payload;
      res = await axios.post(`${BASE_URL}/movies`, body);

      toast.dismiss("add-movie");

      if (res?.status === 200 || res?.status === 201) {
        toast.success(editId ? "Movie saved (POST) successfully" : "Movie added successfully");
        navigate("/");
      } else {
        console.warn("Unexpected response", res);
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      toast.dismiss("add-movie");
      const msg = err?.response?.data?.message || err?.response?.data || err.message || "Failed to add/save movie";
      toast.error(String(msg));
      console.error("Add/Save movie error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen p-6 flex items-start justify-center">
      <Toaster />
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{editId ? "Edit Movie (POST save)" : "Add New Movie"}</h1>
          <div className="flex gap-2">
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
              ← Back
            </button>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={movieInfo.title}
              onChange={(e) => setMovieInfo({ ...movieInfo, title: e.target.value })}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={movieInfo.description}
              onChange={(e) => setMovieInfo({ ...movieInfo, description: e.target.value })}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="year">
                Year
              </label>
              <input
                type="text"
                id="year"
                value={movieInfo.year}
                onChange={(e) => setMovieInfo({ ...movieInfo, year: e.target.value })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={movieInfo.category}
                onChange={(e) => setMovieInfo({ ...movieInfo, category: e.target.value })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="language">
                Language
              </label>
              <input
                type="text"
                id="language"
                value={movieInfo.language}
                onChange={(e) => setMovieInfo({ ...movieInfo, language: e.target.value })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="rating">
                Rating
              </label>
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

          {/* Director input (required by backend) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200" htmlFor="director">
              Director
            </label>
            <input
              type="text"
              id="director"
              value={movieInfo.director}
              onChange={(e) => setMovieInfo({ ...movieInfo, director: e.target.value })}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition"
            />
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
              <button type="button" onClick={addImage} title="Add image" className="inline-flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                <CirclePlus size={18} />
              </button>
            </div>

            <div className="flex flex-wrap">
              {movieInfo.images.map((imgUrl, index) => (
                <div key={index} className="relative m-2">
                  <img src={imgUrl} alt={`Movie ${index + 1}`} className="h-28 w-40 object-cover rounded-md border border-gray-700" />
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
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
              Cancel
            </button>

            <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-60">
              {editId ? "Save (POST)" : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMovies;

