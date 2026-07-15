import api from "../api/axios";
import type { AIAnalysisResponse } from "../types/ai";

export const analyzePortfolio = async () => {
  const response =
    await api.post<AIAnalysisResponse>(
      "/ai/analyze"
    );

  return response.data;
};