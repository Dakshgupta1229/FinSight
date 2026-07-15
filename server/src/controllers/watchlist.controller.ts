import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import * as watchlistService from "../services/watchlist.service.js";

export const addStock = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const stock = await watchlistService.addToWatchlist(
      req.userId!,
      req.body
    );

    res.status(201).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

export const getWatchlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const watchlist = await watchlistService.getWatchlist(
      req.userId!
    );

    res.status(200).json({
      success: true,
      data: watchlist,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStock = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = String(req.params.id);

    await watchlistService.deleteFromWatchlist(
      id,
      req.userId!
    );

    res.status(200).json({
      success: true,
      message: "Stock removed from watchlist",
    });
  } catch (error) {
    next(error);
  }
};