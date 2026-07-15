import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as aiService from "../services/ai.service.js";

// Existing Portfolio AI
export const analyzePortfolio = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await aiService.analyzePortfolio(
      req.userId!
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// New Single Stock AI
export const analyzeStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { symbol } = req.body;

    if (!symbol) {
      return res.status(400).json({
        success: false,
        message: "Stock symbol is required.",
      });
    }

    const result = await aiService.analyzeStock(symbol);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};