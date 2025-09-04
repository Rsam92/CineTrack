import api from "./api";

export const createMedia = data => api.post("/media", data);
export const getMedias = () => api.get("/media");
