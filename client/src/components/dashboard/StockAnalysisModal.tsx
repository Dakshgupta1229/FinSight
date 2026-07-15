import { useMutation } from "@tanstack/react-query";
import { BrainCircuit, X } from "lucide-react";

import { analyzeStock } from "../../services/ai.service";

interface Props {
  open: boolean;
  symbol: string;
  onClose: () => void;
}

export default function StockAnalysisModal({
  open,
  symbol,
  onClose,
}: Props) {
  const analysisMutation = useMutation({
    mutationFn: () => analyzeStock(symbol),
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-purple-600" size={28} />

            <div>
              <h2 className="text-2xl font-bold">
                AI Stock Analysis
              </h2>

              <p className="text-gray-500">
                {symbol}
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        {!analysisMutation.data && (
          <button
            onClick={() => analysisMutation.mutate()}
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Analyze {symbol}
          </button>
        )}

        {analysisMutation.isPending && (
          <div className="py-10 text-center">
            Analyzing...
          </div>
        )}

        {analysisMutation.data && (
          <div className="mt-6 whitespace-pre-wrap leading-8">
            {analysisMutation.data.data.analysis}
          </div>
        )}
      </div>
    </div>
  );
}