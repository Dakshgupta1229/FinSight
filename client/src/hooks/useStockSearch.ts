import { useQuery } from "@tanstack/react-query";
import { searchStocks } from "../services/stock.service";

export function useStockSearch(query: string) {
  return useQuery({
    queryKey: ["stock-search", query],

    queryFn: () => searchStocks(query),

    enabled: query.trim().length > 0,
  });
}