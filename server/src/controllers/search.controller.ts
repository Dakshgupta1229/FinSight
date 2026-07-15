import { Request, Response } from "express";
import { searchStocks } from "../services/trie.service";

export const searchStockSymbols = (
  req: Request,
  res: Response
) => {
  const query = req.query.q;

  if (typeof query !== "string" || query.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Search query is required.",
    });
  }

  const results = searchStocks(query);

  return res.status(200).json({
    success: true,
    data: results,
  });
};