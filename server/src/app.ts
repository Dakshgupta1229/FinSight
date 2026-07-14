import stockRoutes from "./routes/stock.routes.js";
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Error handler should always be last
app.use(errorHandler);
app.use("/api/stocks", stockRoutes);

export default app;