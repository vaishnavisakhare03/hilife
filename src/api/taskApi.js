import api from "./axiosConfig";

// GET all tasks
export const getAllTasks = async () => {
    return await api.get("/tasks");
};

// GET task by id
export const getTaskById = async (id) => {
    return await api.get(`/tasks/${id}`);
};

// CREATE task
export const createTask = async (taskData) => {
    return await api.post("/tasks", taskData);
};

// UPDATE task
export const updateTask = async (id, taskData) => {
    return await api.put(`/tasks/${id}`, taskData);
};

// DELETE task
export const deleteTask = async (id) => {
    return await api.delete(`/tasks/${id}`);
};
