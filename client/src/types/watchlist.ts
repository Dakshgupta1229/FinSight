export interface WatchlistItem {
  id: string;
  symbol: string;
  userId: string;
  createdAt: string;
}

export interface WatchlistResponse {
  success: boolean;
  data: WatchlistItem[];
}