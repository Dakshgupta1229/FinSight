import { Router } from "express";
import * as stockController from "../controllers/stock.controller.js";

const router = Router();

// Company Profile
router.get("/company/:symbol", stockController.getCompany);

// Historical Prices
router.get("/search", stockController.searchStocks);
router.get("/news", stockController.getMarketNews);
router.get("/history/:symbol", stockController.getHistory);
// Live Quote
router.get("/:symbol", stockController.getQuote);

export default router;