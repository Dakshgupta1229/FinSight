import axios from "axios";
import { env } from "../config/env.js";

const finnhubApi = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: env.FINNHUB_API_KEY,
  },
  timeout: 10000,
});

export default finnhubApi;