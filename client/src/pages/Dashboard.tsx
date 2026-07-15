import Navbar from "../components/dashboard/Navbar";
import AddHolding from "../components/dashboard/AddHolding";
import SummaryCards from "../components/dashboard/SummaryCards";
import PortfolioTable from "../components/dashboard/PortfolioTable";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import Watchlist from "../components/dashboard/Watchlist";
import News from "../components/dashboard/News";
import AIAnalysis from "../components/dashboard/AIAnalysis";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 p-8">
        <AddHolding />

        <SummaryCards />

        <PortfolioTable />

        <PortfolioChart />

        <Watchlist />

        <News />

        <AIAnalysis />
      </main>
    </div>
  );
}