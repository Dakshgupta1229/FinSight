import { z } from "zod";

export const createWatchlistSchema = z.object({
  symbol: z.string().min(1),
});