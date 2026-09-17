import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: API_KEY,
  },
});

export default newsApi;