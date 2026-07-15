import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "8000",

  NODE_ENV: process.env.NODE_ENV || "development",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  JWT_SECRET: process.env.JWT_SECRET || "",

  JWT_EXPIRES_IN:
    (process.env.JWT_EXPIRES_IN as StringValue) || "7d",

  FINNHUB_API_KEY: process.env.FINNHUB_API_KEY || "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
};