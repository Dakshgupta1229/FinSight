import axios from "../api/axios";

export async function searchStocks(query: string) {
  const response = await axios.get(
    `/stocks/search?q=${query}`
  );

  return response.data;
}