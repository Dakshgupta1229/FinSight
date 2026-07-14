import { Router } from "express";
import * as stockController from "../controllers/stock.controller.js";

const router = Router();

// Company Profile
router.get("/company/:symbol", stockController.getCompany);

// Live Stock Quote
router.get("/:symbol", stockController.getQuote);

export default router;