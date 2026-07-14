import finnhubApi from "../lib/finnhub.js";
import axios from "axios";

import {
  StockQuote,
  CompanyProfile,
  HistoricalPrice,
} from "../types/stock.types.js";

const BASE_URL = "https://finnhub.io/api/v1";

// ===============================
// Get Live Stock Quote
// ===============================
export const getStockQuote = async (
  symbol: string
): Promise<StockQuote> => {
  try {
    const quoteResponse = await finnhubApi.get("/quote", {
  params: {
    symbol,
  },
});

    const profileResponse = await finnhubApi.get(
  "/stock/profile2",
  {
    params: {
      symbol,
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
    const response = await finnhubApi.get(
  "/stock/profile2",
  {
    params: {
      symbol,
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

export const getHistoricalPrices = async (
  symbol: string,
  days: number = 30
): Promise<HistoricalPrice[]> => {
  try {
    const to = Math.floor(Date.now() / 1000);
    const from = to - days * 24 * 60 * 60;

    const response = await finnhubApi.get("/stock/candle", {
      params: {
        symbol,
        resolution: "D",
        from,
        to,
      },
    });

    const data = response.data;

    if (data.s !== "ok") {
      throw new Error("No historical data found.");
    }

    return data.t.map((timestamp: number, index: number) => ({
      date: new Date(timestamp * 1000).toISOString().split("T")[0],
      close: data.c[index],
    }));
  } catch (error) {
  if (axios.isAxiosError(error)) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
  } else {
    console.log(error);
  }

  throw error;
}
};