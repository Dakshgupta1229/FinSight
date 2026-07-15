import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Wallet,
  TrendingUp,
} from "lucide-react";

import { getPortfolio } from "../../services/portfolio.service";
import Card from "../ui/Card";

export default function SummaryCards() {
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <div className="animate-pulse">
              <div className="mb-4 h-4 w-28 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-8 w-40 rounded bg-slate-300 dark:bg-slate-600" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const summary = data?.data.summary;

  const cards = [
    {
      title: "Total Investment",
      value: summary?.totalInvestment ?? 0,
      icon: <Wallet size={26} />,
      color: "bg-blue-600",
    },
    {
      title: "Current Value",
      value: summary?.totalCurrentValue ?? 0,
      icon: <DollarSign size={26} />,
      color: "bg-emerald-600",
    },
    {
      title: "Total Profit",
      value: summary?.totalProfit ?? 0,
      icon: <TrendingUp size={26} />,
      color:
        (summary?.totalProfit ?? 0) >= 0
          ? "bg-green-600"
          : "bg-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                $
                {card.value.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </h2>
            </div>

            <div
              className={`rounded-2xl p-4 text-white shadow-lg ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}