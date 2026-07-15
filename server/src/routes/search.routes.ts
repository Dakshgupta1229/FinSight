import { Router } from "express";
import { searchStockSymbols } from "../controllers/search.controller";

const router = Router();

router.get("/search", searchStockSymbols);

export default router;