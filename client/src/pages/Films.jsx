import { useState, useEffect } from "react";
import { getFilms } from "../services/filmService";
import FilmForm from "../components/FilmForm";

export default function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = async () => {
    const response = await getFilms();
    setFilms(response.data["hydra:member"]); // API Platform renvoie "hydra:member"
  };

  return (
    <div className="p-4">
      <FilmForm onFilmCreated={loadFilms} />

      <h2 className="text-2xl font-bold mt-6">Liste des films</h2>
      <ul className="mt-2">
        {films.map((film) => (
          <li key={film.id} className="border p-2 my-1 rounded">
            🎬 {film.title} — {film.watched ? "✅ Vu" : "❌ Pas vu"} —{" "}
            {film.rating ? `${film.rating}/10` : "Pas noté"}
          </li>
        ))}
      </ul>
    </div>
  );
}
