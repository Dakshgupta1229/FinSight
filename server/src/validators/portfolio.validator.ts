import { z } from "zod";

export const createPortfolioSchema = z.object({
  symbol: z.string().min(1),

  quantity: z.number().positive(),

  buyPrice: z.number().positive(),
});