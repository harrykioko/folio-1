
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Clock className="mr-2 h-4 w-4" />
          Last 30 days
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
