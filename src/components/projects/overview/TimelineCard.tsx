
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface TimelineCardProps {
  startDate: string;
  dueDate: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ startDate, dueDate }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Start Date:</span>
            </div>
            <span className="font-medium">{startDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Due Date:</span>
            </div>
            <span className="font-medium">{dueDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;
