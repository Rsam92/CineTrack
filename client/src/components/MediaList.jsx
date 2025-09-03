import { useEffect, useState } from "react";
import api from "../api/api";
import MediaForm from "./MediaForm";

export default function MediaList() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedias = async () => {
    try {
      const response = await api.get("/media");
      setMedias(response.data["hydra:member"] || []);
    } catch (err) {
      console.error("Erreur chargement médias :", err);
      setError("Impossible de charger les médias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedias();
  }, []);

  const handleMediaCreated = (newMedia) => {
    setMedias([...medias, newMedia]); // ajoute le nouveau média à la liste
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Mes Médias</h2>
      {medias.length === 0 ? (
        <p>Aucun média pour l’instant.</p>
      ) : (
        <ul>
          {medias.map((m) => (
            <li key={m.id}>
              <strong>{m.title}</strong> ({m.type}) —{" "}
              {m.watched ? "Vu ✅" : "Non vu ❌"}{" "}
              {m.rating !== null ? `— Note : ${m.rating}/10` : ""}
            </li>
          ))}
        </ul>
      )}

      <MediaForm onMediaCreated={handleMediaCreated} />
    </div>
  );
}
