import gemini from "../lib/gemini.js";
import prisma from "../lib/prisma.js";
import * as stockService from "./stock.service.js";

export const analyzePortfolio = async (userId: string) => {
  const portfolio = await prisma.portfolio.findMany({
    where: {
      userId,
    },
  });

  if (portfolio.length === 0) {
    throw new Error("Portfolio is empty.");
  }

  const holdings = await Promise.all(
    portfolio.map(async (holding) => {
      const quote = await stockService.getStockQuote(
        holding.symbol
      );

      return {
        symbol: holding.symbol,
        quantity: holding.quantity,
        buyPrice: holding.buyPrice,
        currentPrice: quote.currentPrice,
      };
    })
  );

  const prompt = `
You are a professional financial analyst.

Analyze this portfolio:

${JSON.stringify(holdings, null, 2)}

Provide:

1. Overall portfolio summary
2. Risk level (Low/Medium/High)
3. Strengths
4. Weaknesses
5. Recommendations

Keep the answer under 300 words.

Do NOT provide financial guarantees.
`;

  const response =
    await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return {
    analysis: response.text,
  };
};