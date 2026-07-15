import { Router } from "express";
import * as aiController from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

// Existing Portfolio AI
router.post(
  "/analyze",
  aiController.analyzePortfolio
);

// New Single Stock AI
router.post(
  "/analyze-stock",
  aiController.analyzeStock
);

export default router;