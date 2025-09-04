import { useEffect, useState } from "react";
import api from "../services/api";

export default function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState("");
  const [watched, setWatched] = useState(false);

  // Récupérer les films
  useEffect(() => {
    api.get("/films")
      .then(res => setFilms(res.data["hydra:member"] || []))
      .catch(err => console.error("Erreur chargement films", err));
  }, []);

  // Ajouter un film
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/films", {
        title,
        watched,
      });
      setFilms([...films, res.data]); // ajoute dans la liste
      setTitle("");
      setWatched(false);
    } catch (err) {
      console.error("Erreur ajout film", err);
    }
  };

  return (
    <div>
      <h2>🎬 Mes Films</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre du film"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>
          Vu ?
          <input
            type="checkbox"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
          />
        </label>
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {films.map((film) => (
          <li key={film.id}>
            {film.title} {film.watched ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}
