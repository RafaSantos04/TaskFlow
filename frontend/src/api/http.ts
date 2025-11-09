import axios from "axios";
import { API_URL } from "@config/api";

const http = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Token expirado. Redirecionando para login...");
            localStorage.removeItem("token");
            window.location.href = "/"; // ou use navigate() se tiver React Router
        }
        return Promise.reject(error);
    }
);


http.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erro API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);


export default http;