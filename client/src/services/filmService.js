import api from "./api";

export const getFilms = () => api.get("/films");
export const getFilm = (id) => api.get(`/films/${id}`);
export const createFilm = (data) => api.post("/films", data);
export const updateFilm = (id, data) => api.put(`/films/${id}`, data);
export const deleteFilm = (id) => api.delete(`/films/${id}`);
