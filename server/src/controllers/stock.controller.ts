import { Request, Response, NextFunction } from "express";
import * as stockService from "../services/stock.service.js";

export const getQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const symbol = String(req.params.symbol);

    const stock = await stockService.getStockQuote(symbol);

    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const symbol = String(req.params.symbol);

    const company = await stockService.getCompanyProfile(symbol);

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};
export const getHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const symbol = String(req.params.symbol);

    const days = req.query.days
      ? Number(req.query.days)
      : 30;

    const history = await stockService.getHistoricalPrices(
      symbol,
      days
    );

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};