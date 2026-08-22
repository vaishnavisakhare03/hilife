import api from "./axiosConfig";

export const loginUser = (credentials) => {
    return api.post(`/users/login`, credentials);
};

export const getAllUsers = () => {
    return api.get("/users");
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id, user) => {
  return api.put(`/users/${id}`, user);
};

export const changePassword = (userId, data) => {
  return api.put(
    `/users/${userId}/change-password`,
    data
  );
};