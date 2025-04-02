
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import React from "react";

// Type definition for metrics
export interface MetricData {
  id: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

// Default metrics data
export const getDefaultMetrics = (): MetricData[] => [
  { 
    id: "visits", 
    name: "Site Visits", 
    value: "1,278", 
    change: "+12.3%", 
    isPositive: true,
    icon: <TrendingUp className="w-5 h-5 text-green-500" />
  },
  { 
    id: "followers", 
    name: "Social Followers", 
    value: "856", 
    change: "+24.8%", 
    isPositive: true,
    icon: <Users className="w-5 h-5 text-blue-500" />
  },
  { 
    id: "revenue", 
    name: "Stripe Revenue", 
    value: "$5,204", 
    change: "-2.1%", 
    isPositive: false,
    icon: <TrendingDown className="w-5 h-5 text-red-500" />
  }
];
