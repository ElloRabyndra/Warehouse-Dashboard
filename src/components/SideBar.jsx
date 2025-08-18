import { Link, useLocation } from "react-router";
import { Card } from "./ui/card";
import { ChartArea, ChartBar, History } from "lucide-react";
export default function ({
  isMobileMenuOpen,
  categories,
  changeCategories,
  cart,
}) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isSpecialPage =
    location.pathname === "/profile" || location.pathname === "/cart";
  return (
    <Card
      className={`sidebar min-h-screen fixed z-10 right-0 bottom-0 top-8 md:top-16 mt-3 md:right-auto md:left-0 md:mt-0 shadow-2xl border-none rounded-none w-60 border-r ${
        isMobileMenuOpen ? "sidebar-open" : "sidebar-close"
      }`}
    >
      <div className="py-6 px-4 md:py-0">
        <div className="mb-4">
          <h3 className="text-xs uppercase font-semibold mb-4 text-primary/80">
            Section
          </h3>
          <div className="space-y-2">
            <Link
              to="/"
              className={`${isActive("/") ? "bg-primary/10" : "hover:bg-primary/10"} w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer`}
            >
              <i className="bx bx-grid-alt text-2xl"></i>
              <span>Dashboard</span>
            </Link>
            <Link
              to="/chart"
              className={`${isActive("/chart") ? "bg-primary/10" : "hover:bg-primary/10"} w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer`}
            >
              <ChartArea className="w-6 h-6" />
              <span>Chart</span>
            </Link>
            <Link
              to="/statistic"
              className={`${isActive("/statistic") ? "bg-primary/10" : "hover:bg-primary/10"} w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer`}
            >
              <ChartBar className="w-6 h-6" />
              <span>Statistic</span>
            </Link>
            <Link
              to="/history"
              className={`${isActive("/history") ? "bg-primary/10" : "hover:bg-primary/10"} w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer`}
            >
              <History className="w-6 h-6" />
              <span>History</span>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
