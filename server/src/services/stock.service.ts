import axios from "axios";
import { env } from "../config/env.js";
import {
  StockQuote,
  CompanyProfile,
} from "../types/stock.types.js";

const BASE_URL = "https://finnhub.io/api/v1";

// ===============================
// Get Live Stock Quote
// ===============================
export const getStockQuote = async (
  symbol: string
): Promise<StockQuote> => {
  try {
    const quoteResponse = await axios.get(`${BASE_URL}/quote`, {
      params: {
        symbol,
        token: env.FINNHUB_API_KEY,
      },
    });

    const profileResponse = await axios.get(
      `${BASE_URL}/stock/profile2`,
      {
        params: {
          symbol,
          token: env.FINNHUB_API_KEY,
        },
      }
    );

    const quote = quoteResponse.data;
    const profile = profileResponse.data;

    return {
      symbol: profile.ticker,
      company: profile.name,
      currentPrice: quote.c,
      change: quote.d,
      percentChange: quote.dp,
      high: quote.h,
      low: quote.l,
      open: quote.o,
      previousClose: quote.pc,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Unable to fetch stock "${symbol}". Check if the symbol exists or is supported by Finnhub.`
      );
    }

    throw error;
  }
};

// ===============================
// Get Company Profile
// ===============================
export const getCompanyProfile = async (
  symbol: string
): Promise<CompanyProfile> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/stock/profile2`,
      {
        params: {
          symbol,
          token: env.FINNHUB_API_KEY,
        },
      }
    );

    const profile = response.data;

    return {
      symbol: profile.ticker,
      name: profile.name,
      country: profile.country,
      currency: profile.currency,
      exchange: profile.exchange,
      industry: profile.finnhubIndustry,
      ipo: profile.ipo,
      marketCapitalization: profile.marketCapitalization,
      shareOutstanding: profile.shareOutstanding,
      weburl: profile.weburl,
      logo: profile.logo,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Unable to fetch company profile for "${symbol}".`
      );
    }

    throw error;
  }
};