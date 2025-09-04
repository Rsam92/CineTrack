import api from "./api";

export const getSeries = () => api.get("/series");
export const getOneSeries = (id) => api.get(`/series/${id}`);
export const createSeries = (data) => api.post("/series", data);
export const updateSeries = (id, data) => api.put(`/series/${id}`, data);
export const deleteSeries = (id) => api.delete(`/series/${id}`);
