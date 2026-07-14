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

// LIKE feedback
export const likeFeedback = async (feedbackId) => {
  return api.post(`/feedbacks/${feedbackId}/like`);
};

// DISLIKE feedback
export const dislikeFeedback = async (feedbackId) => {
  return api.post(`/feedbacks/${feedbackId}/dislike`);
};

// UPDATE feedback
export const updateFeedback = async (id, feedbackData) => {
  return await api.put(`/feedbacks/${id}`, feedbackData);
};
