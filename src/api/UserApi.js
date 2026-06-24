import api from "./axiosConfig";

export const loginUser = (credentials) => {
    return api.post(`/users/login`, credentials);
};