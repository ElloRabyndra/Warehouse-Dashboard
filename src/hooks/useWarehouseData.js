// src/hooks/useWarehouseData.js

import { useState, useEffect, useCallback, useRef } from 'react';
import esp32Service from '@/services/esp32Service';

const useWarehouseData = () => {
  const [currentData, setCurrentData] = useState({
    temperature: 24.6,
    humidity: 60.72,
    isWarehouseNormal: true,
    fanStatus: false,
    sirenStatus: false,
    lastUpdate: new Date(),
    connectionStatus: 'connecting' // connecting, connected, disconnected
  });

  const [alertsHistory, setAlertsHistory] = useState([
    {
      id: 1,
      type: "warning",
      title: "⚠️ PERINGATAN: Suhu gudang terlalu tinggi!",
      message: "Suhu saat ini: 36.2°C | Ambang batas: 35.0°C | Kipas dan sirine telah dinyalakan secara otomatis!",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      type: "info",
      title: "✅ Kondisi Normal",
      message: "Suhu: 28.5°C | Kelembaban: 55% | Status: Normal",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 3,
      type: "critical",
      title: "🚨 KRITIS: Kelembaban sangat rendah!",
      message: "Kelembaban saat ini: 35% | Ambang batas: 40% | Tindakan darurat diaktifkan!",
      timestamp: new Date(Date.now() - 10800000),
    },
  ]);

  const [historicalData, setHistoricalData] = useState([]);
  const [isUsingRealData, setIsUsingRealData] = useState(false);
  const [esp32IP, setESP32IP] = useState('');

  // Refs untuk interval management
  const dataFetchInterval = useRef(null);
  const connectionCheckInterval = useRef(null);
  const previousDataRef = useRef(null);

  // Generate dummy historical data
  const generateHistoricalData = useCallback(() => {
    const data = [];
    const now = new Date();

    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const baseTemp = 25 + Math.sin(i * 0.2) * 5;
      const baseHum = 55 + Math.cos(i * 0.15) * 15;

      data.push({
        time: time.getHours() + ":00",
        temperature: parseFloat((baseTemp + (Math.random() - 0.5) * 4).toFixed(1)),
        humidity: parseFloat((baseHum + (Math.random() - 0.5) * 10).toFixed(1)),
      });
    }

    setHistoricalData(data);
  }, []);

  // Generate dummy real-time data
  const generateDummyData = useCallback(() => {
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
      connectionStatus: 'disconnected'
    };

    setCurrentData(prevData => {
      // Add alert if condition becomes critical
      if (!isNormal && prevData.isWarehouseNormal) {
        const newAlert = {
          id: Date.now(),
          type: temp >= 35 ? "warning" : "critical",
          title: temp >= 35 
            ? "⚠️ PERINGATAN: Suhu gudang terlalu tinggi!" 
            : "🚨 KRITIS: Kelembaban sangat rendah!",
          message: temp >= 35 
            ? `Suhu saat ini: ${temp.toFixed(1)}°C | Ambang batas: 35.0°C | Kipas dan sirine telah dinyalakan!`
            : `Kelembaban saat ini: ${hum.toFixed(1)}% | Ambang batas: 40% | Tindakan darurat diaktifkan!`,
          timestamp: new Date(),
        };

        setAlertsHistory(prev => [newAlert, ...prev.slice(0, 9)]);
      }

      return newData;
    });
  }, []);

  // Fetch data dari ESP32
  const fetchESP32Data = useCallback(async () => {
    try {
      const data = await esp32Service.getSensorData();
      
      setCurrentData(prevData => {
        // Cek apakah kondisi berubah dari normal ke kritis
        if (!data.isWarehouseNormal && prevData.isWarehouseNormal) {
          const newAlert = {
            id: Date.now(),
            type: data.temperature >= 35 ? "warning" : "critical",
            title: data.temperature >= 35 
              ? "⚠️ PERINGATAN: Suhu gudang terlalu tinggi!" 
              : "🚨 KRITIS: Kelembaban sangat rendah!",
            message: data.temperature >= 35 
              ? `Suhu saat ini: ${data.temperature}°C | Ambang batas: 35.0°C | Kipas dan sirine telah dinyalakan!`
              : `Kelembaban saat ini: ${data.humidity}% | Ambang batas: 40% | Tindakan darurat diaktifkan!`,
            timestamp: new Date(),
          };

          setAlertsHistory(prev => [newAlert, ...prev.slice(0, 9)]);
        }

        return { ...data, connectionStatus: 'connected' };
      });

      setIsUsingRealData(true);
      
      // Update historical data dengan data real (simpan ke localStorage)
      const historicalEntry = {
        time: new Date().getHours() + ":00",
        temperature: data.temperature,
        humidity: data.humidity,
        timestamp: Date.now()
      };
      
      // Simpan ke localStorage untuk persistensi
      const storedData = JSON.parse(localStorage.getItem('warehouse_historical') || '[]');
      const updatedData = [historicalEntry, ...storedData.slice(0, 23)];
      localStorage.setItem('warehouse_historical', JSON.stringify(updatedData));
      
      // Update state historical data jika ada data tersimpan
      if (updatedData.length > 0) {
        setHistoricalData(updatedData.reverse());
      }

    } catch (error) {
      console.warn('ESP32 data fetch failed, using dummy data:', error.message);
      setIsUsingRealData(false);
      generateDummyData();
    }
  }, [generateDummyData]);

  // Setup koneksi ESP32
  const setupESP32Connection = useCallback(async (ip = null) => {
    setCurrentData(prev => ({ ...prev, connectionStatus: 'connecting' }));
    
    try {
      if (ip) {
        esp32Service.setBaseURL(ip);
        setESP32IP(ip);
      } else {
        // Auto-discovery
        const discoveredIP = await esp32Service.discoverESP32();
        if (discoveredIP) {
          setESP32IP(discoveredIP);
        } else {
          throw new Error('ESP32 not found');
        }
      }

      // Test koneksi
      const isConnected = await esp32Service.checkConnection();
      if (isConnected) {
        console.log('ESP32 connected successfully');
        // Ambil data pertama kali
        await fetchESP32Data();
      } else {
        throw new Error('Connection test failed');
      }

    } catch (error) {
      console.warn('ESP32 setup failed:', error.message);
      setIsUsingRealData(false);
      setCurrentData(prev => ({ ...prev, connectionStatus: 'disconnected' }));
      generateDummyData();
    }
  }, [fetchESP32Data, generateDummyData]);

  // Manual reconnect
  const reconnectESP32 = useCallback(async () => {
    await setupESP32Connection(esp32IP);
  }, [setupESP32Connection, esp32IP]);

  // Set custom ESP32 IP
  const setCustomESP32IP = useCallback(async (ip) => {
    await setupESP32Connection(ip);
  }, [setupESP32Connection]);

  // Format time helper
  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, []);

  // Format date helper
  const formatDate = useCallback((date) => {
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  // Setup intervals dan initial data
  useEffect(() => {
    // Generate initial historical data
    generateHistoricalData();

    // Try to load saved historical data
    const savedHistorical = localStorage.getItem('warehouse_historical');
    if (savedHistorical) {
      try {
        const parsed = JSON.parse(savedHistorical);
        if (parsed.length > 0) {
          setHistoricalData(parsed);
        }
      } catch (error) {
        console.warn('Failed to load saved historical data:', error);
      }
    }

    // Setup ESP32 connection
    setupESP32Connection();

    // Cleanup function
    return () => {
      if (dataFetchInterval.current) {
        clearInterval(dataFetchInterval.current);
      }
      if (connectionCheckInterval.current) {
        clearInterval(connectionCheckInterval.current);
      }
    };
  }, [setupESP32Connection, generateHistoricalData]);

  // Setup data fetching interval
  useEffect(() => {
    // Clear existing interval
    if (dataFetchInterval.current) {
      clearInterval(dataFetchInterval.current);
    }

    // Set up new interval
    dataFetchInterval.current = setInterval(() => {
      if (isUsingRealData) {
        fetchESP32Data();
      } else {
        generateDummyData();
      }
    }, 5000); // Fetch setiap 5 detik

    // Cleanup
    return () => {
      if (dataFetchInterval.current) {
        clearInterval(dataFetchInterval.current);
      }
    };
  }, [isUsingRealData, fetchESP32Data, generateDummyData]);

  // Setup connection check interval
  useEffect(() => {
    if (connectionCheckInterval.current) {
      clearInterval(connectionCheckInterval.current);
    }

    // Check connection every 30 seconds
    connectionCheckInterval.current = setInterval(async () => {
      if (isUsingRealData) {
        const isConnected = await esp32Service.checkConnection();
        if (!isConnected) {
          console.warn('ESP32 connection lost, switching to dummy data');
          setIsUsingRealData(false);
          setCurrentData(prev => ({ ...prev, connectionStatus: 'disconnected' }));
        }
      } else {
        // Periodically try to reconnect
        await setupESP32Connection(esp32IP);
      }
    }, 30000);

    return () => {
      if (connectionCheckInterval.current) {
        clearInterval(connectionCheckInterval.current);
      }
    };
  }, [isUsingRealData, esp32IP, setupESP32Connection]);

  return {
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
  };
};

export default useWarehouseData;