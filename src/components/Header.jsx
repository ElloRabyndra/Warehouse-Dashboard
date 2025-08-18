// src/components/Header.jsx

import React from 'react';
import { Activity, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useOutletContext } from 'react-router';

const Header = () => {
  const { currentData, isUsingRealData, esp32IP } = useOutletContext();

  const getConnectionIndicator = () => {
    const { connectionStatus } = currentData;
    
    if (connectionStatus === 'connecting') {
      return {
        icon: <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />,
        text: 'Menghubungkan...',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700'
      };
    }
    
    if (isUsingRealData && connectionStatus === 'connected') {
      return {
        icon: <Wifi className="w-4 h-4 text-green-500" />,
        text: `ESP32 (${esp32IP})`,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700'
      };
    }
    
    return {
      icon: <WifiOff className="w-4 h-4 text-orange-500" />,
      text: 'Mode Simulasi',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700'
    };
  };

  const indicator = getConnectionIndicator();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Dashboard Monitoring Gudang IoT
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Sistem Pemantauan Suhu dan Kelembaban Berbasis ESP32 & DHT22
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Real-time indicator */}
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
            Live
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;