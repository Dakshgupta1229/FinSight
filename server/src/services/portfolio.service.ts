import { getStockQuote } from "./stock.service.js";
import { PortfolioResponse } from "../types/portfolio.types.js";
import prisma from "../lib/prisma.js";
import { CreatePortfolioInput } from "../types/portfolio.types.js";

export const createHolding = async (
  userId: string,
  data: CreatePortfolioInput
) => {
  return prisma.portfolio.create({
    data: {
      symbol: data.symbol.toUpperCase(),
      quantity: data.quantity,
      buyPrice: data.buyPrice,
      userId,
    },
  });
};

export const getPortfolio = async (
  userId: string
): Promise<PortfolioResponse> => {
  const holdings = await prisma.portfolio.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let totalInvestment = 0;
  let totalCurrentValue = 0;

  const portfolio = await Promise.all(
    holdings.map(async (holding) => {
      try {
        const stock = await getStockQuote(
          holding.symbol
        );

        const investment =
          holding.quantity * holding.buyPrice;

        const currentValue =
          holding.quantity * stock.currentPrice;

        const profit =
          currentValue - investment;

        const profitPercent =
          investment === 0
            ? 0
            : (profit / investment) * 100;

        totalInvestment += investment;
        totalCurrentValue += currentValue;

        return {
          id: holding.id,
          symbol: holding.symbol,
          quantity: holding.quantity,
          buyPrice: holding.buyPrice,
          currentPrice: stock.currentPrice,
          investment,
          currentValue,
          profit,
          profitPercent,
        };
      } catch (error) {
        console.error(
          `Failed to fetch stock: ${holding.symbol}`,
          error
        );

        const investment =
          holding.quantity * holding.buyPrice;

        return {
          id: holding.id,
          symbol: holding.symbol,
          quantity: holding.quantity,
          buyPrice: holding.buyPrice,
          currentPrice: 0,
          investment,
          currentValue: 0,
          profit: -investment,
          profitPercent: -100,
          error: true,
        };
      }
    })
  );

  return {
    holdings: portfolio,
    summary: {
      totalInvestment,
      totalCurrentValue,
      totalProfit:
        totalCurrentValue - totalInvestment,
    },
  };
};

export const deleteHolding = async (
  id: string,
  userId: string
) => {
  const holding = await prisma.portfolio.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!holding) {
    throw new Error("Holding not found");
  }

  return prisma.portfolio.delete({
    where: {
      id,
    },
  });
};