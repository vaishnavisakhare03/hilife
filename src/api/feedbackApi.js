import api from "./axiosConfig";

// GET all feedbacks
export const getAllFeedbacks = async () => {
    return await api.get("/feedbacks");
};

// CREATE feedback
export const createFeedback = async (feedbackData) => {
    return await api.post("/feedbacks", feedbackData);
};

// DELETE feedback
export const deleteFeedback = async (id) => {
    return await api.delete(`/feedbacks/${id}`);
};