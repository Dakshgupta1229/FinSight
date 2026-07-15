import { useState } from "react";
import { Search } from "lucide-react";
import { useStockSearch } from "../../hooks/useStockSearch";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function StockAutocomplete({
  value,
  onChange,
}: Props) {
  const [showDropdown, setShowDropdown] =
    useState(true);

  const { data } = useStockSearch(value);

  const stocks = data?.data ?? [];

  return (
    <div className="relative">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        />

        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search Stock..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            py-3
            pl-11
            pr-4
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

      {showDropdown &&
        value &&
        stocks.length > 0 && (
          <div
            className="
              absolute
              z-20
              mt-2
              w-full
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-xl

              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            {stocks.map((stock: any) => (
              <button
                key={stock.symbol}
                type="button"
                onClick={() => {
                  onChange(stock.symbol);
                  setShowDropdown(false);
                }}
                className="
                  block
                  w-full
                  border-b
                  border-slate-100
                  px-4
                  py-3
                  text-left
                  transition

                  hover:bg-slate-100

                  dark:border-slate-800
                  dark:hover:bg-slate-800
                "
              >
                <div className="font-semibold text-slate-900 dark:text-white">
                  {stock.symbol}
                </div>

                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {stock.description}
                </div>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}