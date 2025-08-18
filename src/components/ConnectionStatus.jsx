// src/components/ConnectionStatus.jsx

import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Loader, 
  Settings, 
  RefreshCw, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ConnectionStatus = ({ 
  isUsingRealData, 
  connectionStatus, 
  esp32IP, 
  onReconnect, 
  onSetCustomIP 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [customIP, setCustomIP] = useState(esp32IP || '');
  const [isConnecting, setIsConnecting] = useState(false);

  const getStatusConfig = () => {
    if (connectionStatus === 'connecting') {
      return {
        icon: <Loader className="w-4 h-4 animate-spin" />,
        text: 'Menghubungkan...',
        bgColor: 'bg-primary/10',
        textColor: 'text-yellow-800',
        show: true
      };
    }
    
    if (isUsingRealData && connectionStatus === 'connected') {
      return {
        icon: <CheckCircle className="w-4 h-4" />,
        text: `Terhubung ke ESP32 (${esp32IP})`,
        bgColor: 'bg-green-50 border-green-200',
        textColor: 'text-green-800',
        show: false // Hide when connected successfully
      };
    }
    
    return {
      icon: <AlertCircle className="w-4 h-4" />,
      text: 'ESP32 tidak terhubung',
      bgColor: 'bg-primary/10',
      textColor: 'text-orange-800',
      show: true
    };
  };

  const handleReconnect = async () => {
    setIsConnecting(true);
    try {
      await onReconnect();
    } catch (error) {
      console.error('Reconnection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSetCustomIP = async (e) => {
    e.preventDefault();
    if (!customIP.trim()) return;
    
    setIsConnecting(true);
    try {
      await onSetCustomIP(customIP.trim());
      setShowSettings(false);
    } catch (error) {
      console.error('Custom IP connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const status = getStatusConfig();

  if (!status.show && !showSettings) {
    return null;
  }

  return (
    <>
      {/* Status Banner */}
      {status.show && (
        <div className={`border-b ${status.bgColor}`}>
          <div className="mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={status.textColor}>
                  {status.icon}
                </div>
                <span className={`text-xs sm:text-sm font-medium ${status.textColor}`}>
                  {status.text}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReconnect}
                  disabled={isConnecting || connectionStatus === 'connecting'}
                  className="text-xs"
                >
                  {isConnecting ? (
                    <Loader className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3 mr-1" />
                  )}
                  Coba Lagi
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-xs"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Pengaturan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed flex items-center justify-center min-h-screen inset-0 z-[999] border-b bg-black/60">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Pengaturan Koneksi ESP32</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowSettings(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Status */}
                  <div>
                    <h4 className="font-medium mb-3">Status Saat Ini</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Mode Data:</span>
                        <span className={`font-medium ${isUsingRealData ? 'text-green-600' : 'text-orange-600'}`}>
                          {isUsingRealData ? 'Real-time ESP32' : 'Simulasi'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status Koneksi:</span>
                        <span className={`font-medium capitalize ${
                          connectionStatus === 'connected' ? 'text-green-600' : 
                          connectionStatus === 'connecting' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {connectionStatus === 'connected' ? 'Terhubung' : 
                           connectionStatus === 'connecting' ? 'Menghubungkan' : 'Terputus'}
                        </span>
                      </div>
                      {esp32IP && (
                        <div className="flex justify-between">
                          <span>IP ESP32:</span>
                          <span className="font-medium">{esp32IP}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* IP Configuration */}
                  <div>
                    <h4 className="font-medium mb-3">Konfigurasi IP</h4>
                    <form onSubmit={handleSetCustomIP} className="space-y-3">
                      <div>
                        <Label htmlFor="esp32-ip" className="text-sm">
                          IP Address ESP32
                        </Label>
                        <Input
                          id="esp32-ip"
                          type="text"
                          placeholder="192.168.1.100"
                          value={customIP}
                          onChange={(e) => setCustomIP(e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Masukkan IP address ESP32 di jaringan lokal Anda
                        </p>
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isConnecting || !customIP.trim()}
                        className="w-full"
                      >
                        {isConnecting ? (
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Wifi className="w-4 h-4 mr-2" />
                        )}
                        Hubungkan
                      </Button>
                    </form>

                    {/* Common IP Suggestions */}
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-2">IP Umum:</p>
                      <div className="flex flex-wrap gap-1">
                        {['192.168.1.100', '192.168.1.101', '192.168.4.1', '192.168.0.100'].map((ip) => (
                          <Button
                            key={ip}
                            size="xs"
                            variant="outline"
                            onClick={() => setCustomIP(ip)}
                            className="text-xs px-2 py-1 h-auto"
                          >
                            {ip}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Pastikan ESP32 dan komputer terhubung ke jaringan WiFi yang sama</li>
                    <li>• Cek IP ESP32 di Serial Monitor atau router admin panel</li>
                    <li>• IP default ESP32 AP mode biasanya 192.168.4.1</li>
                    <li>• Sistem akan otomatis beralih ke data simulasi jika koneksi gagal</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectionStatus;