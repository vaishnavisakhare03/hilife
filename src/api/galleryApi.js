import api from "./axiosConfig";

export const uploadImage = (formData, onUploadProgress) => {
  return api.post("/gallery/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export const deleteImage = (galleryId) => {
    return api.delete(`/gallery/${galleryId}`);
};