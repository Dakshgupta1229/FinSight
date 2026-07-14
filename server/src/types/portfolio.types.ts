export interface CreatePortfolioInput {
  symbol: string;
  quantity: number;
  buyPrice: number;
}

export interface UpdatePortfolioInput {
  quantity?: number;
  buyPrice?: number;
}