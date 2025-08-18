import React, { useState, useEffect } from "react";
import { Thermometer, Droplets, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// CriticalThresholds Component
const CriticalThresholds = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Ambang Batas Kritis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-red-600" />
              <span className="font-medium text-red-800">Suhu Kritis</span>
            </div>
            <Badge variant="destructive">≥ 35.0°C</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">
                Kelembaban Kritis
              </span>
            </div>
            <Badge variant="destructive">≤ 40.0%</Badge>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600">
              <strong>Catatan:</strong> Sistem akan otomatis mengaktifkan kipas
              dan sirine ketika salah satu atau kedua kondisi kritis tercapai.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CriticalThresholds;
