import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import StockAutocomplete from "../ui/StockAutocomplete";
import Button from "../ui/Button";
import Card from "../ui/Card";

import {
  createHolding,
  type CreateHoldingInput,
} from "../../services/portfolio.service";

export default function AddHolding() {
  const queryClient = useQueryClient();

  const [symbol, setSymbol] = useState("");

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateHoldingInput>();

  const mutation = useMutation({
    mutationFn: createHolding,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      });

      reset();
      setSymbol("");

      toast.success("Holding added successfully!");
    },

    onError: () => {
      toast.error("Failed to add holding.");
    },
  });

  return (
    <Card>
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-blue-600 p-3 text-white shadow-md">
          <PlusCircle size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Add New Holding
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Add a stock to your investment portfolio.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) =>
          mutation.mutate({
            ...data,
            symbol,
          })
        )}
        className="grid gap-5 lg:grid-cols-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Stock Symbol
          </label>

          <StockAutocomplete
            value={symbol}
            onChange={setSymbol}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Quantity
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="10"
            {...register("quantity", {
              valueAsNumber: true,
            })}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-900
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-blue-400
              dark:focus:ring-blue-900
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Buy Price
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="150.00"
            {...register("buyPrice", {
              valueAsNumber: true,
            })}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-900
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-blue-400
              dark:focus:ring-blue-900
            "
          />
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 w-full"
          >
            {mutation.isPending
              ? "Adding..."
              : "Add Holding"}
          </Button>
        </div>
      </form>
    </Card>
  );
}