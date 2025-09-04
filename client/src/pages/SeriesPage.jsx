import { useEffect, useState } from "react";
import api from "../services/api";

export default function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  // Charger les séries
  useEffect(() => {
    api.get("/series")
      .then(res => setSeries(res.data["hydra:member"] || []))
      .catch(err => console.error("Erreur chargement séries", err));
  }, []);

  // Ajouter une série
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/series", {
        title,
        season,
        episode,
      });
      setSeries([...series, res.data]);
      setTitle("");
      setSeason(1);
      setEpisode(1);
    } catch (err) {
      console.error("Erreur ajout série", err);
    }
  };

  return (
    <div>
      <h2>📺 Mes Séries</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre de la série"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Saison"
          value={season}
          onChange={(e) => setSeason(parseInt(e.target.value))}
          min="1"
        />
        <input
          type="number"
          placeholder="Épisode"
          value={episode}
          onChange={(e) => setEpisode(parseInt(e.target.value))}
          min="1"
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {series.map((s) => (
          <li key={s.id}>
            {s.title} - Saison {s.season}, Épisode {s.episode}
          </li>
        ))}
      </ul>
    </div>
  );
}
