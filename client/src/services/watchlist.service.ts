import api from "../api/axios";
import type { WatchlistResponse } from "../types/watchlist";

export interface CreateWatchlistInput {
  symbol: string;
}

export const getWatchlist = async () => {
  const response = await api.get<WatchlistResponse>(
    "/watchlist"
  );

  return response.data;
};

export const addToWatchlist = async (
  data: CreateWatchlistInput
) => {
  const response = await api.post(
    "/watchlist",
    data
  );

  return response.data;
};

export const deleteFromWatchlist = async (
  id: string
) => {
  const response = await api.delete(
    `/watchlist/${id}`
  );

  return response.data;
};