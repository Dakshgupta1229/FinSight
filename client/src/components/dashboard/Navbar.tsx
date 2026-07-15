import { LogOut, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200
        bg-white/80
        backdrop-blur-lg
        transition-colors
        duration-300

        dark:border-slate-700
        dark:bg-slate-900/80
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg">
            <TrendingUp size={26} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900

                dark:text-white
              "
            >
              FinSight
            </h1>

            <p
              className="
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              AI Investment Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Button
            variant="danger"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}