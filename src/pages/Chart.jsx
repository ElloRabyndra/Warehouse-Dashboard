import AlertsHistory from "@/components/AlertsHistory";
import CriticalThresholds from "@/components/CriticalThresholds";
import Header from "@/components/Header";
import HistoricalChart from "@/components/HistoricalChart";
import SystemStatus from "@/components/SystemStatus";
import { useOutletContext } from "react-router";

const Chart = () => {
  const { data, alertsHistory, historicalData, currentData } =
    useOutletContext();
  return (
    <div className="p-4">
      <div className=" max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />

        <div className="grid grid-cols-1  gap-6">
          {/* Left Column - Charts and Alerts */}
          <div className="xl:col-span-2 space-y-6">
            {/* Historical Chart */}
            <HistoricalChart data={historicalData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
