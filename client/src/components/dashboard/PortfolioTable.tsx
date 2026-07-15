import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";

import {
  TrendingUp,
  TrendingDown,
  Trash2,
  BrainCircuit,
} from "lucide-react";

import {
  getPortfolio,
  deleteHolding,
} from "../../services/portfolio.service";

import Card from "../ui/Card";
import Button from "../ui/Button";
import StockAnalysisModal from "./StockAnalysisModal";

export default function PortfolioTable() {
  const queryClient = useQueryClient();

  const [selectedStock, setSelectedStock] =
    useState("");

  const [openAnalysis, setOpenAnalysis] =
    useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHolding,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      });
    },
  });

  if (isLoading) {
    return (
      <Card title="📊 Portfolio Holdings">
        <p>Loading portfolio...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="📊 Portfolio Holdings">
        <p className="text-red-500">
          Failed to load portfolio.
        </p>
      </Card>
    );
  }

  const holdings = data?.data.holdings ?? [];

  return (
    <>
      <StockAnalysisModal
        open={openAnalysis}
        symbol={selectedStock}
        onClose={() => setOpenAnalysis(false)}
      />

      <Card title="📊 Portfolio Holdings">
        {holdings.length === 0 ? (
          <p className="text-gray-500">
            No holdings found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm uppercase tracking-wide text-slate-500">
                  <th className="pb-4">Symbol</th>

                  <th className="pb-4 text-right">
                    Qty
                  </th>

                  <th className="pb-4 text-right">
                    Buy Price
                  </th>

                  <th className="pb-4 text-right">
                    Current
                  </th>

                  <th className="pb-4 pr-8 text-right">
                    Profit
                  </th>

                  <th className="pb-4">
                    <div className="flex justify-center">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {holdings.map((holding) => (
                  <tr
                    key={holding.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="py-5 align-middle font-bold text-slate-800">
                      {holding.symbol}
                    </td>

                    <td className="align-middle text-right font-medium">
                      {holding.quantity}
                    </td>

                    <td className="align-middle text-right font-medium">
                      ${holding.buyPrice.toFixed(2)}
                    </td>

                    <td className="align-middle text-right font-medium">
                      ${holding.currentPrice.toFixed(2)}
                    </td>

                    <td className="align-middle pr-8 text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                          holding.profit >= 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {holding.profit >= 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}

                        ${holding.profit.toFixed(2)}
                      </span>
                    </td>

                    <td className="py-4 align-middle">
                      <div className="flex justify-center gap-2">

                        <Button
                          onClick={() => {
                            setSelectedStock(
                              holding.symbol
                            );
                            setOpenAnalysis(true);
                          }}
                          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                        >
                          <BrainCircuit size={16} />
                          Analyze
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() =>
                            deleteMutation.mutate(
                              holding.id
                            )
                          }
                          disabled={
                            deleteMutation.isPending
                          }
                          className="flex items-center gap-2"
                        >
                          <Trash2 size={16} />

                          {deleteMutation.isPending
                            ? "Deleting..."
                            : "Delete"}
                        </Button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}