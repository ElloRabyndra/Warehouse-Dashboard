// src/pages/MainPage.jsx

import NavBar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router";
import useWarehouseData from "@/hooks/useWarehouseData";
import ConnectionStatus from "@/components/ConnectionStatus";

export default function MainPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  // Gunakan custom hook untuk data management
  const {
    currentData,
    setCurrentData,
    alertsHistory,
    setAlertsHistory,
    historicalData,
    setHistoricalData,
    isUsingRealData,
    esp32IP,
    formatTime,
    formatDate,
    reconnectESP32,
    setCustomESP32IP
  } = useWarehouseData();

  return (
    <div className={`${theme} font-[Poppins]`}>
      {/* Connection Status Banner */}
      <ConnectionStatus 
        isUsingRealData={isUsingRealData}
        connectionStatus={currentData.connectionStatus}
        esp32IP={esp32IP}
        onReconnect={reconnectESP32}
        onSetCustomIP={setCustomESP32IP}
      />

      {/* Navbar */}
      <NavBar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Layout */}
      <div className="flex flex-row">
        {/* Sidebar */}
        <SideBar isMobileMenuOpen={isMobileMenuOpen} />

        {/* Main Content */}
        <main className="flex-1 py-6 px-5 lg:py-8 lg:px-24">
          <div className="relative mx-auto md:ml-56">
            <Outlet
              context={{
                currentData,
                setCurrentData,
                historicalData,
                setHistoricalData,
                alertsHistory,
                setAlertsHistory,
                formatTime,
                formatDate,
                isUsingRealData,
                esp32IP,
                reconnectESP32,
                setCustomESP32IP
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}