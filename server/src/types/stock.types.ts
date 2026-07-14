export interface StockQuote {
  symbol: string;
  company: string;
  currentPrice: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface CompanyProfile {
  symbol: string;
  name: string;
  country: string;
  currency: string;
  exchange: string;
  industry: string;
  ipo: string;
  marketCapitalization: number;
  shareOutstanding: number;
  weburl: string;
  logo: string;
}
export interface HistoricalPrice {
  date: string;
  close: number;
}