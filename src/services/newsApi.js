import axios from "axios";

const newsApi = axios.create({
  baseURL: "/api/news",
});

export default newsApi;