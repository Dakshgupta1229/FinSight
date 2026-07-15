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
  success: boolean;

  data: {
    holdings: PortfolioHolding[];
    summary: PortfolioSummary;
  };
}