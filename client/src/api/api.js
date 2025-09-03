import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // vérifie le port et l'URL
  headers: {
    "Content-Type": "application/ld+json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`, // si tu utilises JWT
  },
});

export default api;
