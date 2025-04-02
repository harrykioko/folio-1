
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown,
  Users
} from "lucide-react";

interface MetricCardProps {
  id: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface MetricsSectionProps {
  metrics: MetricCardProps[];
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.id} className="backdrop-blur-md bg-white/5 p-4 border border-white/10 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
              <div className={`flex items-center mt-1 ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                <span className="text-xs font-medium">{metric.change}</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-background">
              {metric.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsSection;
