import React, { useState, useEffect } from "react";
import {
  Thermometer,
  Droplets,
  Fan,
  AlertTriangle,
  Clock
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// CurrentStatusCard Component
const CurrentStatusCard = ({ data, formatTime, formatDate }) => {
  const getStatusColor = () => {
    if (!data.isWarehouseNormal) return "border-red-500 bg-red-50";
    return "border-green-500 bg-green-50";
  };

  const getTemperatureStatus = () => {
    if (data.temperature >= 35)
      return { color: "text-red-600", bg: "bg-red-100" };
    if (data.temperature >= 30)
      return { color: "text-orange-600", bg: "bg-orange-100" };
    return { color: "text-green-600", bg: "bg-green-100" };
  };

  const getHumidityStatus = () => {
    if (data.humidity <= 40) return { color: "text-red-600", bg: "bg-red-100" };
    if (data.humidity <= 50)
      return { color: "text-orange-600", bg: "bg-orange-100" };
    return { color: "text-blue-600", bg: "bg-blue-100" };
  };

  const tempStatus = getTemperatureStatus();
  const humStatus = getHumidityStatus();

  return (
    <Card className={`border-2 ${getStatusColor()}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Status Gudang Saat Ini</span>
          <Badge variant={data.isWarehouseNormal ? "success" : "destructive"}>
            {data.isWarehouseNormal ? "Normal" : "⚠️ Kritis ⚠️"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Temperature */}
          <div
            className={`p-4 rounded-lg border ${tempStatus.bg} ${tempStatus.color}`}
          >
            <div className="flex items-center justify-between">
              <Thermometer className="w-6 h-6" />
              <span className="text-2xl font-bold">{data.temperature}°C</span>
            </div>
            <p className="text-sm mt-2 opacity-80">Suhu Saat Ini</p>
          </div>

          {/* Humidity */}
          <div
            className={`p-4 rounded-lg border ${humStatus.bg} ${humStatus.color}`}
          >
            <div className="flex items-center justify-between">
              <Droplets className="w-6 h-6" />
              <span className="text-2xl font-bold">{data.humidity}%</span>
            </div>
            <p className="text-sm mt-2 opacity-80">Kelembaban</p>
          </div>

          {/* Fan Status */}
          <div
            className={`p-4 rounded-lg border ${
              data.fanStatus
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <Fan
                className={`w-6 h-6 ${data.fanStatus ? "animate-spin" : ""}`}
              />
              <Badge variant={data.fanStatus ? "destructive" : "secondary"}>
                {data.fanStatus ? "ON" : "OFF"}
              </Badge>
            </div>
            <p className="text-sm mt-2 opacity-80">Status Kipas</p>
          </div>

          {/* Siren Status */}
          <div
            className={`p-4 rounded-lg border ${
              data.sirenStatus
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <AlertTriangle
                className={`w-6 h-6 ${
                  data.sirenStatus ? "animate-bounce" : ""
                }`}
              />
              <Badge variant={data.sirenStatus ? "warning" : "secondary"}>
                {data.sirenStatus ? "ON" : "OFF"}
              </Badge>
            </div>
            <p className="text-sm mt-2 opacity-80">Status Sirine</p>
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Update Terakhir:</span>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatTime(data.lastUpdate)}</p>
            <p className="text-sm text-gray-500">
              {formatDate(data.lastUpdate)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStatusCard;