export interface CreatePortfolioInput {
  symbol: string;
  quantity: number;
  buyPrice: number;
}

export interface UpdatePortfolioInput {
  quantity?: number;
  buyPrice?: number;
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  investment: number;
  currentValue: number;
  profit: number;
  profitPercent: number;
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalCurrentValue: number;
  totalProfit: number;
}

export interface PortfolioResponse {
  holdings: PortfolioHolding[];
  summary: PortfolioSummary;
}