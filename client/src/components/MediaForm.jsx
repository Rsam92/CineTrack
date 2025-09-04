// src/components/MediaForm.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function MediaForm({ mediaToEdit, onCreated, onUpdated, onCancel, fixedType }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(fixedType || "film");
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");

  // Remplir le formulaire si édition
  useEffect(() => {
    if (mediaToEdit) {
      setTitle(mediaToEdit.title || "");
      setType(mediaToEdit.type || (fixedType || "film"));
      setWatched(mediaToEdit.watched || false);
      setRating(mediaToEdit.rating || "");
      setSeason(mediaToEdit.season || "");
      setEpisode(mediaToEdit.episode || "");
    }
  }, [mediaToEdit, fixedType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      type,
      watched,
      rating: rating || null,
      ...(type === "series" && { season: season || 1, episode: episode || 1 }),
    };

    try {
      if (mediaToEdit) {
        await api.put(`/media/${mediaToEdit.id}`, payload);
        onUpdated?.();
      } else {
        await api.post("/media", payload);
        onCreated?.();
      }
      // reset formulaire
      setTitle("");
      setType(fixedType || "film");
      setWatched(false);
      setRating("");
      setSeason("");
      setEpisode("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde du média");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-md mb-6">
      <h2 className="text-xl font-bold mb-2">
        {mediaToEdit ? "Modifier un Média" : "Ajouter un Média"}
      </h2>

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        required
      />

      {/* Select type seulement si fixedType n'existe pas */}
      {!fixedType && (
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        >
          <option value="film">Film</option>
          <option value="series">Série</option>
        </select>
      )}

      {type === "series" && (
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Saison"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            min="1"
            className="border p-2 w-1/2 rounded"
          />
          <input
            type="number"
            placeholder="Épisode"
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
            min="1"
            className="border p-2 w-1/2 rounded"
          />
        </div>
      )}

      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
          className="mr-2"
        />
        Vu ?
      </label>

      <input
        type="number"
        placeholder="Note (1-10)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        min="1"
        max="10"
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {mediaToEdit ? "Modifier" : "Ajouter"}
        </button>
        {mediaToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
