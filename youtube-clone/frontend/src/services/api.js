import axios from "axios";

export const BASE_URL = "http://localhost:5000/api"; // backend

export default axios.create({
  baseURL: BASE_URL,
});