import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as aiService from "../services/ai.service.js";

export const analyzePortfolio = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await aiService.analyzePortfolio(
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