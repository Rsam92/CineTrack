import { useState } from "react";
import { createMedia } from "../services/mediaService";

export default function MediaForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("film");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createMedia({ title, type, watched: false });
      setTitle("");
      setType("film");
      onCreated();
    } catch (err) {
      alert("Erreur création média");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="film">Film</option>
        <option value="series">Série</option>
      </select>
      <button>Ajouter</button>
    </form>
  );
}
