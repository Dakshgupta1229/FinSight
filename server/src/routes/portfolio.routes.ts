import { Router } from "express";
import * as portfolioController from "../controllers/portfolio.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// All portfolio routes require authentication
router.use(protect);

// Create a holding
router.post("/", portfolioController.createHolding);

// Get all holdings
router.get("/", portfolioController.getPortfolio);

// Delete a holding
router.delete("/:id", portfolioController.deleteHolding);

export default router;