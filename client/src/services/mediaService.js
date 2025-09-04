import api from "./api";

// Récupérer tous les films
export const fetchFilms = async () => {
  try {
    const response = await api.get("/films");
    return response.data["hydra:member"] || []; // si API Platform
  } catch (error) {
    console.error("Erreur fetchFilms:", error);
    return [];
  }
};

// Récupérer toutes les séries
export const fetchSeries = async () => {
  try {
    const response = await api.get("/series");
    return response.data["hydra:member"] || [];
  } catch (error) {
    console.error("Erreur fetchSeries:", error);
    return [];
  }
};
