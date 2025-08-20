import { useOutletContext } from "react-router";
import AlertsHistory from "../components/AlertsHistory";
import CriticalThresholds from "../components/CriticalThresholds";
import Header from "../components/Header";
import SystemStatus from "../components/SystemStatus";

const Statistic = () => {
  const { currentData, isUsingRealData } = useOutletContext();
  return (
    <div className="p-4">
      <div className=" max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Critical Thresholds */}
            <CriticalThresholds />
          </div>
          <div className="space-y-6">
            {/* System Status */}
            <SystemStatus
              data={currentData}
              connectionStatus={currentData.connectionStatus}
              isUsingRealData={isUsingRealData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
