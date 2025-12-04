
import axios from "axios";

const API_BASE_URL = "https://codeathon-backend.onrender.com";
// Or better later: const API_BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL;

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

// attach admin secret if present
axiosClient.interceptors.request.use((config) => {
  const adminSecret = localStorage.getItem("adminSecret");
  if (adminSecret) {
    config.headers["x-admin-secret"] = adminSecret;
  }
  return config;
});
