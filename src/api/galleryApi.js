import api from "./axiosConfig";

export const uploadImage = (formData) => {
  return api.post(
    "/gallery/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};