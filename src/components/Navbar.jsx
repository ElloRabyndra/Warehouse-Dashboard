import { Menu, Search, X } from "lucide-react";
import { Card } from "./ui/card";
import { Link, useNavigate } from "react-router";

export default function NavBar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate();
  return (
    <Card className="p-0 block rounded-none border-none shadow-md border-b sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex">
            <Link to="/" className="text-xl font-bold text-primary">
              Warehouse Monitoring
            </Link>
          </div>

          {/* Desktop Navigation */}


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-primary hover:bg-secondary/80 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
