import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// SystemStatus Component
const SystemStatus = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Sistem</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Koneksi WiFi</span>
            <Badge variant="success">Terhubung</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sensor DHT22</span>
            <Badge variant="success">Aktif</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Telegram Bot</span>
            <Badge variant="success">Online</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sistem Otomatis</span>
            <Badge variant="success">Berjalan</Badge>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {data.isWarehouseNormal ? "✓" : "✗"}
                </p>
                <p className="text-xs text-gray-600">Kondisi Aman</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">24/7</p>
                <p className="text-xs text-gray-600">Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
