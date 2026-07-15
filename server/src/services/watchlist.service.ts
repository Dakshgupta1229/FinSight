import prisma from "../lib/prisma.js";
import { CreateWatchlistInput } from "../types/watchlist.types.js";

export const addToWatchlist = async (
  userId: string,
  data: CreateWatchlistInput
) => {
  const existing = await prisma.watchlist.findFirst({
    where: {
      userId,
      symbol: data.symbol.toUpperCase(),
    },
  });

  if (existing) {
    throw new Error("Stock already exists in watchlist");
  }

  return prisma.watchlist.create({
    data: {
      symbol: data.symbol.toUpperCase(),
      userId,
    },
  });
};

export const getWatchlist = async (userId: string) => {
  return prisma.watchlist.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteFromWatchlist = async (
  id: string,
  userId: string
) => {
  const stock = await prisma.watchlist.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!stock) {
    throw new Error("Stock not found");
  }

  return prisma.watchlist.delete({
    where: {
      id,
    },
  });
};