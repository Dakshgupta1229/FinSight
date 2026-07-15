import api from "../api/axios";
import type { NewsResponse } from "../types/news";

export const getNews = async () => {
  const response = await api.get<NewsResponse>("/stocks/news");
  return response.data;
};