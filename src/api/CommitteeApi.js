import api from "./axiosConfig";

export const getAllCommitteeMembers = () => {
    return api.get("/committee");
};

export const getCommitteeMemberById = (id) => {
    return api.get(`/committee/${id}`);
};

export const createCommitteeMember = (committee) => {
    return api.post("/committee", committee);
};

export const deleteCommitteeMember = (id) => {
    return api.delete(`/committee/${id}`);
};

export const updateCommitteeMember = (id, committee) => {
    return api.put(`/committee/${id}`, committee);
};