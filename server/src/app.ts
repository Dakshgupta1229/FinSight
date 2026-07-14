import stockRoutes from "./routes/stock.routes.js";
import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio.routes.js";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Error handler should always be last
app.use("/api/stocks", stockRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use(errorHandler);

export default app;