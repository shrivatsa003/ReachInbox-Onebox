import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500", // your backend server port
});

export default api;
