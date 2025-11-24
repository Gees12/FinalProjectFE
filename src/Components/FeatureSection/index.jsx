// Paste the code content here, will update next
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fallbackGenres } from "../../Constants";

const FeatureSection = () => {
  const [genres, setGenres] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [newGenre, setNewGenre] = useState({
    name: "",
    description: "",
    image: "",
  });
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch("http://localhost:3000/genres");
      if (response.ok) {
        const data = await response.json();
        setGenres(data);
      } else {
        throw new Error("API not available");
      }
    } catch (error) {
      console.log("Using fallback data for genres");
      setGenres(fallbackGenres);
    }
  };

  const handleCreate = async () => {
    if (!newGenre.name || !newGenre.description || !newGenre.image) return;

    try {
      const response = await fetch("http://localhost:3000/genres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newGenre,
          id: Date.now(),
        }),
      });

      if (response.ok) {
        setNewGenre({ name: "", description: "", image: "" });
        fetchGenres();
      }
    } catch (error) {
      console.log("Create failed, updating local state only");
      const newGenreWithId = {
        ...newGenre,
        id: Date.now(),
      };
      setGenres((prev) => [...prev, newGenreWithId]);
      setNewGenre({ name: "", description: "", image: "" });
    }
  };

  const handleUpdate = async () => {
    if (!editingGenre) return;

    try {
      const response = await fetch(
        `http://localhost:3000/genres/${editingGenre.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingGenre),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setEditingGenre(null);
        fetchGenres();
      }
    } catch (error) {
      console.log("Update failed, updating local state only");
      setGenres((prev) =>
        prev.map((genre) =>
          genre.id === editingGenre.id ? editingGenre : genre
        )
      );
      setIsEditing(false);
      setEditingGenre(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/genres/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchGenres();
      }
    } catch (error) {
      console.log("Delete failed, updating local state only");
      setGenres((prev) => prev.filter((genre) => genre.id !== id));
    }
  };

  const startEdit = (genre) => {
    setIsEditing(true);
    setEditingGenre({ ...genre });
  };

  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
      <div className="text-center">
        <span className="bg-neutral-900 text-cyan-300 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Browse by Genre
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-teal-400 text-transparent bg-clip-text">
            Favorite Stories
          </span>
        </h2>
      </div>

      {/* Add/Edit Form */}
      <div className="mt-12 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700/10 to-red-900/10 border-b border-neutral-800 px-6 sm:px-8 py-5">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text flex items-center gap-3">
              {isEditing ? (
                <>
                  <Edit2 size={24} className="text-pink-500" />
                  Edit Genre
                </>
              ) : (
                <>
                  <Plus size={24} className="text-pink-500" />
                  Add New Genre
                </>
              )}
            </h3>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                Genre Name
              </label>
              <input
                type="text"
                placeholder="Enter genre name..."
                value={isEditing ? editingGenre?.name : newGenre.name}
                onChange={(e) =>
                  isEditing
                    ? setEditingGenre({ ...editingGenre, name: e.target.value })
                    : setNewGenre({ ...newGenre, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm rounded-xl text-white placeholder-neutral-500 border border-neutral-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
              />
            </div>

            {/* Image URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Enter image URL..."
                value={isEditing ? editingGenre?.image : newGenre.image}
                onChange={(e) =>
                  isEditing
                    ? setEditingGenre({
                        ...editingGenre,
                        image: e.target.value,
                      })
                    : setNewGenre({ ...newGenre, image: e.target.value })
                }
                className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm rounded-xl text-white placeholder-neutral-500 border border-neutral-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                Description
              </label>
              <textarea
                placeholder="Enter genre description..."
                value={
                  isEditing ? editingGenre?.description : newGenre.description
                }
                onChange={(e) =>
                  isEditing
                    ? setEditingGenre({
                        ...editingGenre,
                        description: e.target.value,
                      })
                    : setNewGenre({ ...newGenre, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-sm rounded-xl text-white placeholder-neutral-500 border border-neutral-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none resize-none"
                rows="4"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-900/30 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    Update Genre
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingGenre(null);
                    }}
                    className="px-6 py-3 bg-neutral-800 text-neutral-300 rounded-xl font-semibold hover:bg-neutral-700 transition-all border border-neutral-700"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreate}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-400 hover:to-rose-400 transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Genre
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Genres Carousel */}
      <div className="relative mt-10 lg:mt-20 px-4">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="flex-shrink-0 w-80 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300 relative border border-neutral-800 shadow-xl"
            >
              {/* Edit/Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-2 z-20">
                <button
                  onClick={() => startEdit(genre)}
                  className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(genre.id)}
                  className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl"></div>
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="relative w-24 h-24 object-cover rounded-full border-4 border-neutral-700"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=200&h=200&fit=crop";
                    }}
                  />
                </div>
                <h5 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-300 to-teal-400 text-transparent bg-clip-text">
                  {genre.name}
                </h5>
                <p className="text-neutral-400 leading-relaxed">
                  {genre.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeatureSection;
