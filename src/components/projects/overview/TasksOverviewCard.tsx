
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Plus } from "lucide-react";

interface TasksOverviewCardProps {
  progress: number;
}

const TasksOverviewCard: React.FC<TasksOverviewCardProps> = ({ progress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tasks Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Completed</span>
            <Badge variant="outline" className="flex gap-1 items-center">
              <Check className="h-3 w-3" />
              {Math.round(progress / 20)} / 5
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">In Progress</span>
            <Badge variant="outline" className="flex gap-1 items-center">
              <Clock className="h-3 w-3" />
              {5 - Math.round(progress / 20)}
            </Badge>
          </div>
          <Separator />
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksOverviewCard;
