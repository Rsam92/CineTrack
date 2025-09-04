import { useState } from "react";
import { createSeries } from "../services/seriesService";

export default function SeriesForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createSeries({ title, season, episode });
      setTitle("");
      setSeason(1);
      setEpisode(1);
      onCreated();
    } catch (err) {
      alert("Erreur création série");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="number" min="1" value={season} onChange={e => setSeason(Number(e.target.value))} />
      <input type="number" min="1" value={episode} onChange={e => setEpisode(Number(e.target.value))} />
      <button>Ajouter Série</button>
    </form>
  );
}
