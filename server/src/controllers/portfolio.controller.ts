import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as portfolioService from "../services/portfolio.service.js";

export const createHolding = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId!;

    const holding = await portfolioService.createHolding(
      userId,
      req.body
    );

    res.status(201).json({
      success: true,
      data: holding,
    });
  } catch (error) {
    next(error);
  }
};

export const getPortfolio = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId!;

    const portfolio = await portfolioService.getPortfolio(userId);

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHolding = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId!;
    const id = String(req.params.id);

    await portfolioService.deleteHolding(id, userId);

    res.status(200).json({
      success: true,
      message: "Holding deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};