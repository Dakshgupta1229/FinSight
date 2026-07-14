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

export const getPortfolio = async (userId: string) => {
  return prisma.portfolio.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
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