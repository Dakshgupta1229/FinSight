import api from "../api/axios";
import type { PortfolioResponse } from "../types/portfolio";

export const getPortfolio = async () => {
  const response =
    await api.get<PortfolioResponse>("/portfolio");

  return response.data;
};
import type { PortfolioHolding } from "../types/portfolio";

export interface CreateHoldingInput {
  symbol: string;
  quantity: number;
  buyPrice: number;
}

export const createHolding = async (
  data: CreateHoldingInput
) => {
  const response = await api.post<PortfolioHolding>(
    "/portfolio",
    data
  );

  return response.data;
};
export const deleteHolding = async (id: string) => {
  const response = await api.delete(`/portfolio/${id}`);
  return response.data;
};