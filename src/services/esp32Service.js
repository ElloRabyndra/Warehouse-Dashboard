// src/services/esp32Service.js

class ESP32Service {
  constructor() {
    this.baseURL = 'http://192.168.1.100'; // Ganti dengan IP ESP32 Anda
    this.isConnected = false;
    this.connectionTimeout = 5000; // 5 detik timeout
    this.retryInterval = 30000; // Coba koneksi ulang setiap 30 detik
    this.lastConnectionCheck = 0;
  }

  // Set IP ESP32 secara dinamis
  setBaseURL(ip) {
    this.baseURL = `http://${ip}`;
  }

  // Cek koneksi ke ESP32
  async checkConnection() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.connectionTimeout);

      const response = await fetch(`${this.baseURL}/api/ping`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        this.isConnected = true;
        this.lastConnectionCheck = Date.now();
        return true;
      } else {
        this.isConnected = false;
        return false;
      }
    } catch (error) {
      console.warn('ESP32 connection failed:', error.message);
      this.isConnected = false;
      return false;
    }
  }

  // Ambil data sensor dari ESP32
  async getSensorData() {
    try {
      // Cek koneksi jika belum dicek dalam 30 detik terakhir
      const now = Date.now();
      if (now - this.lastConnectionCheck > this.retryInterval) {
        await this.checkConnection();
      }

      if (!this.isConnected) {
        throw new Error('ESP32 not connected');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.connectionTimeout);

      const response = await fetch(`${this.baseURL}/api/status`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Validasi data yang diterima
      if (typeof data.temperature !== 'number' || typeof data.humidity !== 'number') {
        throw new Error('Invalid data format from ESP32');
      }

      return {
        temperature: parseFloat(data.temperature.toFixed(1)),
        humidity: parseFloat(data.humidity.toFixed(1)),
        isWarehouseNormal: data.isWarehouseNormal || (data.temperature < 35 && data.humidity > 40),
        fanStatus: data.fanStatus || false,
        sirenStatus: data.sirenStatus || false,
        lastUpdate: new Date(),
        connectionStatus: 'connected'
      };

    } catch (error) {
      console.warn('Failed to fetch sensor data from ESP32:', error.message);
      this.isConnected = false;
      throw error;
    }
  }

  // Ambil riwayat alert dari ESP32 (jika tersedia)
  async getAlertHistory() {
    try {
      if (!this.isConnected) {
        throw new Error('ESP32 not connected');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.connectionTimeout);

      const response = await fetch(`${this.baseURL}/api/alerts`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.alerts || [];

    } catch (error) {
      console.warn('Failed to fetch alert history from ESP32:', error.message);
      throw error;
    }
  }

  // Kirim command ke ESP32 (opsional)
  async sendCommand(command, value) {
    try {
      if (!this.isConnected) {
        throw new Error('ESP32 not connected');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.connectionTimeout);

      const response = await fetch(`${this.baseURL}/api/command`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command, value })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.warn('Failed to send command to ESP32:', error.message);
      throw error;
    }
  }

  // Auto-discovery ESP32 di jaringan lokal (opsional)
  async discoverESP32() {
    const commonIPs = [
      '192.168.1.100',
      '192.168.1.101',
      '192.168.1.102',
      '192.168.4.1',   // ESP32 AP mode default
      '192.168.0.100',
      '192.168.0.101'
    ];

    for (const ip of commonIPs) {
      this.setBaseURL(ip);
      const isConnected = await this.checkConnection();
      if (isConnected) {
        console.log(`ESP32 found at ${ip}`);
        return ip;
      }
    }

    console.warn('ESP32 not found on common IP addresses');
    return null;
  }
}

// Export singleton instance
export const esp32Service = new ESP32Service();
export default esp32Service;