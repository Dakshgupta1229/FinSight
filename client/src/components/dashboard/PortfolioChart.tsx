import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { PieChart as PieChartIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getPortfolio } from "../../services/portfolio.service";
import Card from "../ui/Card";

export default function PortfolioChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });

  if (isLoading) {
    return (
      <Card>
        <p>Loading portfolio chart...</p>
      </Card>
    );
  }

  const chartData =
    data?.data.holdings.map((holding) => ({
      name: holding.symbol,
      value: holding.currentValue,
    })) ?? [];

  const COLORS = [
    "#2563EB",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
  ];

  return (
    <Card>
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-600 p-3 text-white shadow-md">
          <PieChartIcon size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Portfolio Allocation
          </h2>

          <p className="text-sm text-slate-500">
            Distribution of your investments.
          </p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
          <p className="text-slate-500">
            No holdings available.
          </p>
        </div>
      ) : (
        <div className="h-[420px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={140}
                paddingAngle={4}
                cornerRadius={8}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

             <Tooltip
  formatter={(value) => [
    `$${Number(value).toFixed(2)}`,
    "Value",
  ]}
/>

              <Legend
                verticalAlign="bottom"
                height={40}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}