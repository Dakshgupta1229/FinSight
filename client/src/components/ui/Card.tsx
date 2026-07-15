import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export default function Card({
  title,
  children,
}: CardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-slate-950/40
      "
    >
      {title && (
        <h2
          className="
            mb-6
            text-3xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          {title}
        </h2>
      )}

      <div className="text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
}