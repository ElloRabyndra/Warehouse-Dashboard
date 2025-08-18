import NavBar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function MainPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [currentData, setCurrentData] = useState({
    temperature: 24.6,
    humidity: 60.72,
    isWarehouseNormal: true,
    fanStatus: false,
    sirenStatus: false,
    lastUpdate: new Date(),
  });

  const [alertsHistory, setAlertsHistory] = useState([
    {
      id: 1,
      type: "warning",
      title: "⚠️ PERINGATAN: Suhu gudang terlalu tinggi!",
      message:
        "Suhu saat ini: 36.2°C | Ambang batas: 35.0°C | Kipas dan sirine telah dinyalakan secara otomatis!",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: 2,
      type: "info",
      title: "✅ Kondisi Normal",
      message: "Suhu: 28.5°C | Kelembaban: 55% | Status: Normal",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: 3,
      type: "critical",
      title: "🚨 KRITIS: Kelembaban sangat rendah!",
      message:
        "Kelembaban saat ini: 35% | Ambang batas: 40% | Tindakan darurat diaktifkan!",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    },
  ]);

  const [historicalData, setHistoricalData] = useState([]);

  // Generate historical data for chart
  useEffect(() => {
    const generateHistoricalData = () => {
      const data = [];
      const now = new Date();

      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const baseTemp = 25 + Math.sin(i * 0.2) * 5;
        const baseHum = 55 + Math.cos(i * 0.15) * 15;

        data.push({
          time: time.getHours() + ":00",
          temperature: parseFloat(
            (baseTemp + (Math.random() - 0.5) * 4).toFixed(1)
          ),
          humidity: parseFloat(
            (baseHum + (Math.random() - 0.5) * 10).toFixed(1)
          ),
        });
      }

      setHistoricalData(data);
    };

    generateHistoricalData();
  }, []);

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const temp = 20 + Math.random() * 20;
      const hum = 30 + Math.random() * 50;
      const isNormal = temp < 35 && hum > 40;

      const newData = {
        temperature: parseFloat(temp.toFixed(1)),
        humidity: parseFloat(hum.toFixed(1)),
        isWarehouseNormal: isNormal,
        fanStatus: !isNormal,
        sirenStatus: !isNormal,
        lastUpdate: new Date(),
      };

      setCurrentData(newData);

      // Add new alert if condition becomes critical
      if (!isNormal && currentData.isWarehouseNormal) {
        const newAlert = {
          id: Date.now(),
          type: temp >= 35 ? "warning" : "critical",
          title:
            temp >= 35
              ? "⚠️ PERINGATAN: Suhu gudang terlalu tinggi!"
              : "🚨 KRITIS: Kelembaban sangat rendah!",
          message:
            temp >= 35
              ? `Suhu saat ini: ${temp.toFixed(
                  1
                )}°C | Ambang batas: 35.0°C | Kipas dan sirine telah dinyalakan!`
              : `Kelembaban saat ini: ${hum.toFixed(
                  1
                )}% | Ambang batas: 40% | Tindakan darurat diaktifkan!`,
          timestamp: new Date(),
        };

        setAlertsHistory((prev) => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentData.isWarehouseNormal]);

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className={`${theme} font-[Poppins]`}>
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
              }}
             />
          </div>
        </main>
      </div>
    </div>
  );
}
