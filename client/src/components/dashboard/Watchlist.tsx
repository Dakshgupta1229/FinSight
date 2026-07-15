import { useForm } from "react-hook-form";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";

import {
  getWatchlist,
  addToWatchlist,
  deleteFromWatchlist,
} from "../../services/watchlist.service";

import Card from "../ui/Card";

interface FormData {
  symbol: string;
}

export default function Watchlist() {
  const queryClient = useQueryClient();
  const [selectedStockId, setSelectedStockId] =
  useState<string | null>(null);

  const { register, handleSubmit, reset } =
    useForm<FormData>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });

  const addMutation = useMutation({
    mutationFn: addToWatchlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });

      reset();

      toast.success("Added to watchlist!");
    },

    onError: () => {
      toast.error("Failed to add stock.");
    },
  });

 const deleteMutation = useMutation({
  mutationFn: deleteFromWatchlist,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["watchlist"],
    });

    toast.success("Removed from watchlist!");
  },

  onError: () => {
    toast.error("Failed to remove stock.");
  },
});

  if (isLoading) {
    return (
      <Card title="⭐ Watchlist">
        <p>Loading watchlist...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="⭐ Watchlist">
        <p className="text-red-500">
          Failed to load watchlist.
        </p>
      </Card>
    );
  }

  return (
    <Card title="⭐ Watchlist">
      <form
        onSubmit={handleSubmit((data) =>
          addMutation.mutate(data)
        )}
        className="mb-6 flex gap-3"
      >
        <input
          placeholder="AAPL"
          {...register("symbol")}
          className="flex-1 rounded-lg border p-3"
        />

        <button
          type="submit"
          disabled={addMutation.isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {addMutation.isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {data?.data.length === 0 ? (
        <p className="text-gray-500">
          No stocks in watchlist.
        </p>
      ) : (
        <div className="space-y-3">
          {data?.data.map((stock) => (
            <div
              key={stock.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <span className="font-semibold">
                ⭐ {stock.symbol}
              </span>

              <button
                onClick={() =>
  setSelectedStockId(stock.id)
}
                disabled={deleteMutation.isPending}
                className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog
  open={selectedStockId !== null}
  title="Remove Stock"
  message="Are you sure you want to remove this stock from your watchlist?"
  onCancel={() => setSelectedStockId(null)}
  onConfirm={() => {
    if (selectedStockId) {
      deleteMutation.mutate(selectedStockId);
      setSelectedStockId(null);
    }
  }}
/>
    </Card>
  );
}