import React, { useEffect, useState } from "react";
import MediaForm from "./MediaForm";
import api from "../services/api";

export default function Dashboard() {
  const [films, setFilms] = useState([]);
  const [series, setSeries] = useState([]);
  const [mediaToEdit, setMediaToEdit] = useState(null);

  const fetchMedia = async () => {
    try {
      const response = await api.get("/media"); // ignore si ça plante pour l'instant
      const allMedia = response.data?.["hydra:member"] || [];
      setFilms(allMedia.filter(m => m.type === "film"));
      setSeries(allMedia.filter(m => m.type === "series"));
    } catch (err) {
      console.error("Erreur récupération médias :", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce média ?")) return;
    try {
      await api.delete(`/media/${id}`);
      fetchMedia();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const renderCard = (media) => (
    <div key={media.id} className="border p-4 rounded shadow flex flex-col justify-between">
      <h3 className="font-bold text-lg">{media.title}</h3>
      {media.type === "series" && <p>Saison {media.season}, Épisode {media.episode}</p>}
      {media.rating && <p>Note: {media.rating}/10</p>}
      <p>{media.watched ? "✔ Vu" : "❌ Non vu"}</p>
      <div className="mt-2 flex space-x-2">
        <button onClick={() => setMediaToEdit(media)}>✏️</button>
        <button onClick={() => handleDelete(media.id)}>🗑️</button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <MediaForm
        key={mediaToEdit ? mediaToEdit.id : "new"}
        mediaToEdit={mediaToEdit}
        onCreated={fetchMedia}
        onUpdated={() => { fetchMedia(); setMediaToEdit(null); }}
        onCancel={() => setMediaToEdit(null)}
      />

      <section className="mb-6">
        <h1 className="text-3xl font-bold mb-2 border-b-2 border-indigo-600 pb-2">Films</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.length > 0 ? films.map(renderCard) : <p>Aucun film pour le moment.</p>}
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-bold mb-2 border-b-2 border-indigo-600 pb-2">Séries</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.length > 0 ? series.map(renderCard) : <p>Aucune série pour le moment.</p>}
        </div>
      </section>
    </div>
  );
}
