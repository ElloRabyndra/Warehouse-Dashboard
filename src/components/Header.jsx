import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Dashboard Monitoring Gudang IoT
          </h1>
          <p className="text-gray-600 mt-2">
            Sistem Pemantauan Suhu dan Kelembaban Berbasis ESP32 & DHT22
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-green-500" />
          <Badge variant="success">Live</Badge>
        </div>
      </div>
    </div>
  );
};

export default Header;
