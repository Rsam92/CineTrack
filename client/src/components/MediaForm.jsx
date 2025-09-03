import { useState } from "react";
import api from "../api/api";

export default function MediaForm({ onMediaCreated }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("film");
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        type,
        watched,
        rating: rating ? parseInt(rating, 10) : null,
      };

      const response = await api.post("/media", payload, {
        headers: { "Content-Type": "application/ld+json" },
      });

      alert("Média ajouté !");
      setTitle("");
      setType("film");
      setWatched(false);
      setRating("");

      onMediaCreated && onMediaCreated(response.data); // 🔑 met à jour la liste
    } catch (err) {
      console.error("Erreur création média :", err);
      alert("Erreur lors de l'ajout du média.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un média</h2>
      <input
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="film">Film</option>
        <option value="serie">Série</option>
      </select>
      <label>
        Vu ?
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
      </label>
      <input
        type="number"
        placeholder="Note"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="0"
        max="10"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
