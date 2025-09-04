import api from "./api";

export const register = (data) => api.post("/register", data);
export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  const token = response.data.token;
  localStorage.setItem("jwt", token);
  return token;
};
export const logout = () => {
  localStorage.removeItem("jwt");
};
