import { Router } from "express";
import * as aiController from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.post(
  "/analyze",
  aiController.analyzePortfolio
);

export default router;