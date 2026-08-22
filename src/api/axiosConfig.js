import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        if (error.response?.status === 401 ||
        error.response?.status === 403) {

      logout();
    }

    return Promise.reject(error);
    }
);

export default api;