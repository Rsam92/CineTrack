import { useState } from "react";
import { createFilm } from "../services/filmService";

export default function FilmForm({ onFilmCreated }) {
  const [title, setTitle] = useState("");
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState("");
  const [watchedAt, setWatchedAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFilm = {
        title,
        watched,
        rating: rating ? parseInt(rating) : null,
        watchedAt: watchedAt ? new Date(watchedAt).toISOString() : null,
      };

      const response = await createFilm(newFilm);
      alert("Film ajouté avec succès !");
      setTitle("");
      setWatched(false);
      setRating("");
      setWatchedAt("");

      if (onFilmCreated) onFilmCreated(response.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’ajout du film");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Ajouter un film</h2>

      <input
        type="text"
        placeholder="Titre du film"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />

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
        min="1"
        max="10"
        className="border p-2 w-full mb-2"
      />

      <input
        type="date"
        placeholder="Date de visionnage"
        value={watchedAt}
        onChange={(e) => setWatchedAt(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ajouter
      </button>
    </form>
  );
}
