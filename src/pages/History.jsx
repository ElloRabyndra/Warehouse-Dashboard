import { useOutletContext } from "react-router";
import AlertsHistory from "@/components/AlertsHistory";
import Header from "@/components/Header";

const History = () => {
  const { alertsHistory } = useOutletContext();
  return (
    <div className="p-4">
      <div className=" max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />

        <div className="grid grid-cols-1  gap-6">
          <div className="space-y-6">
            {/* Alerts History */}
            <AlertsHistory alerts={alertsHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
