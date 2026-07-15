import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base = `
    rounded-xl
    px-5
    py-3
    font-semibold
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-lg
    active:scale-95
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const variants = {
    primary: `
      bg-blue-600
      text-white
      hover:bg-blue-700
    `,

    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
    `,

    secondary: `
      bg-slate-100
      text-slate-700
      hover:bg-slate-200

      dark:bg-slate-800
      dark:text-slate-200
      dark:hover:bg-slate-700
    `,
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}