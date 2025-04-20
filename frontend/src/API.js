import axios from "axios";

const API_BASE_URL = "http://192.168.1.5:5000";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchFiles = () => {
  return axios.get(`${API_BASE_URL}/files`);
};

export const downloadFile = (filename) => {
  return window.open(`${API_BASE_URL}/download/${filename}`, "_blank");
};