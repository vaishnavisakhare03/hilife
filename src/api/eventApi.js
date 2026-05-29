import api from "./axiosConfig";

// GET all events
export const getAllEvents = async () => {
    return await api.get("/events");
};

// GET event by id
export const getEventById = async (id) => {
    return await api.get(`/events/${id}`);
};

// CREATE event
export const createEvent = async (eventData) => {
    return await api.post("/events", eventData);
};

// UPDATE event
// export const updateEvent = async (id, eventData) => {
//     return await api.put(`/events/${id}`, eventData);
// };

// DELETE event
export const deleteEvent = async (id) => {
    return await api.delete(`/events/${id}`);
};