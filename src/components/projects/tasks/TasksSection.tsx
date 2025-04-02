
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectKanban from "../kanban/ProjectKanban";

interface TasksSectionProps {
  projectId: number;
}

const TasksSection: React.FC<TasksSectionProps> = ({ projectId }) => {
  return (
    <Card className="backdrop-blur-md bg-white/5 p-6 border border-white/10 shadow-lg rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Button variant="outline" size="sm" className="text-xs">
          View All
        </Button>
      </div>
      <ProjectKanban projectId={projectId} />
    </Card>
  );
};

export default TasksSection;
