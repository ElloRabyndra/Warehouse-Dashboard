// src/pages/MainPage.jsx

import NavBar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router";
import useWarehouseData from "@/hooks/useWarehouseData";
import ConnectionStatus from "@/components/ConnectionStatus";

export default function MainPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className={`min-h-screen font-[Poppins]`}>

      <NavBar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex flex-row">
        <SideBar isMobileMenuOpen={isMobileMenuOpen} />

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