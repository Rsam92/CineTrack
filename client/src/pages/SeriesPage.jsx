// src/pages/SeriesPage.jsx
import React, { useEffect, useState } from "react";
import MediaForm from "../components/MediaForm";
import api from "../services/api";

export default function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [mediaToEdit, setMediaToEdit] = useState(null);

  const fetchSeries = async () => {
    try {
      const response = await api.get("/media");
      const allMedia = response.data?.["hydra:member"] || [];
      setSeries(allMedia.filter(m => m.type === "series"));
    } catch (err) {
      console.error("Erreur récupération séries :", err);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette série ?")) return;
    try {
      await api.delete(`/media/${id}`);
      fetchSeries();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const renderCard = (serie) => (
    <div key={serie.id} className="border p-4 rounded shadow flex flex-col justify-between">
      <h3 className="font-bold text-lg">{serie.title}</h3>
      <p>Saison {serie.season}, Épisode {serie.episode}</p>
      {serie.rating && <p>Note: {serie.rating}/10</p>}
      <p>{serie.watched ? "✔ Vu" : "❌ Non vu"}</p>
      <div className="mt-2 flex space-x-2">
        <button onClick={() => setMediaToEdit(serie)}>✏️</button>
        <button onClick={() => handleDelete(serie.id)}>🗑️</button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <MediaForm
        key={mediaToEdit ? mediaToEdit.id : "new"}
        mediaToEdit={mediaToEdit}
        onCreated={fetchSeries}
        onUpdated={() => { fetchSeries(); setMediaToEdit(null); }}
        onCancel={() => setMediaToEdit(null)}
        fixedType="series" // le type est forcé
      />

      <h1 className="text-3xl font-bold mb-4 border-b-2 border-indigo-600 pb-2">Séries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.length > 0 ? series.map(renderCard) : <p>Aucune série pour le moment.</p>}
      </div>
    </div>
  );
}
