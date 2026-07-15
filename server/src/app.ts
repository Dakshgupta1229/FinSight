import stockRoutes from "./routes/stock.routes.js";
import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio.routes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";
import {
  helmetMiddleware,
  limiter,
} from "./middleware/security.middleware.js";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import aiRoutes from "./routes/ai.routes.js";
import searchRoutes from "./routes/search.routes.js";

const app = express();

app.use(cors());
app.use(helmetMiddleware);

app.use(limiter);
app.use(express.json());
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Error handler should always be last
app.use("/api/stocks", stockRoutes);
app.use("/api/stocks", searchRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FinSight API 🚀",
  });
});
app.use(errorHandler);

export default app;