// src/pages/FilmsPage.jsx
import React, { useEffect, useState } from "react";
import MediaForm from "../components/MediaForm";
import api from "../services/api";

export default function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [mediaToEdit, setMediaToEdit] = useState(null);

  const fetchFilms = async () => {
    try {
      const response = await api.get("/media");
      const allMedia = response.data?.["hydra:member"] || [];
      setFilms(allMedia.filter(m => m.type === "film"));
    } catch (err) {
      console.error("Erreur récupération films :", err);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce film ?")) return;
    try {
      await api.delete(`/media/${id}`);
      fetchFilms();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const renderCard = (film) => (
    <div key={film.id} className="border p-4 rounded shadow flex flex-col justify-between">
      <h3 className="font-bold text-lg">{film.title}</h3>
      {film.rating && <p>Note: {film.rating}/10</p>}
      <p>{film.watched ? "✔ Vu" : "❌ Non vu"}</p>
      <div className="mt-2 flex space-x-2">
        <button onClick={() => setMediaToEdit(film)}>✏️</button>
        <button onClick={() => handleDelete(film.id)}>🗑️</button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <MediaForm
        key={mediaToEdit ? mediaToEdit.id : "new"}
        mediaToEdit={mediaToEdit}
        onCreated={fetchFilms}
        onUpdated={() => { fetchFilms(); setMediaToEdit(null); }}
        onCancel={() => setMediaToEdit(null)}
        fixedType="film"
      />

      <h1 className="text-3xl font-bold mb-4 border-b-2 border-indigo-600 pb-2">Films</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {films.length > 0 ? films.map(renderCard) : <p>Aucun film pour le moment.</p>}
      </div>
    </div>
  );
}
