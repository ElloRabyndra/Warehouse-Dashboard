import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import CurrentStatusCard from "@/components/CurrentStatusCard";
import Header from "@/components/Header";

// Main Dashboard Component
const Dashboard = () => {
  const { currentData, formatTime, formatDate } = useOutletContext();
  return (
    <div className="p-4">
      <div className=" max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />

        {/* Current Status Card */}
        <CurrentStatusCard
          data={currentData}
          formatTime={formatTime}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
