import api from "./axiosConfig";

export const loginUser = (credentials) => {
    return api.post(`/users/login`, credentials);
};

export const getAllUsers = () => {
    return api.get("/users");
};