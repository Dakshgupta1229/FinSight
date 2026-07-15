import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export default gemini;