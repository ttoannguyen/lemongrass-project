import axios from "axios";

const API_URL = "https://your-backend-api"; // Thay bằng URL backend thật

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};
