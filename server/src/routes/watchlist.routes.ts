import { Router } from "express";
import * as watchlistController from "../controllers/watchlist.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createWatchlistSchema } from "../validators/watchlist.validator.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  validate(createWatchlistSchema),
  watchlistController.addStock
);

router.get("/", watchlistController.getWatchlist);

router.delete("/:id", watchlistController.deleteStock);

export default router;