import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

// AlertsHistory Component
const AlertsHistory = ({ alerts }) => {
  const getAlertVariant = (type) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Riwayat Notifikasi</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-4 max-h-76 overflow-y-auto">
          {alerts.map((alert) => (
            <Alert className="flex" key={alert.id} variant={getAlertVariant(alert.type)}>
              <div className="relative w-full">
                <div className="">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  <AlertDescription className="mt-1">
                    {alert.message}
                  </AlertDescription>
                </div>
                <Badge variant="outline" className="hidden md:block absolute top-0 right-0 text-xs">
                  {alert.timestamp.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Badge>
              </div>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsHistory;
