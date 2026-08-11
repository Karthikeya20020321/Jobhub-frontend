import axios from "axios";

const API = axios.create({
  baseURL: "https://jobhub-backend-46sj.onrender.com/api",
});

export default API;