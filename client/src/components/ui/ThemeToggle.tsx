import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} className="text-yellow-400" />
      )}
    </button>
  );
}