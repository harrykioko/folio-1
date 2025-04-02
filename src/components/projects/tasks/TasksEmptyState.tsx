
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface TasksEmptyStateProps {
  onAddTask: () => void;
}

const TasksEmptyState: React.FC<TasksEmptyStateProps> = ({ onAddTask }) => {
  return (
    <CardContent>
      <div className="text-center py-10 text-muted-foreground">
        <p>No tasks have been added to this project yet.</p>
        <Button variant="outline" className="mt-4" onClick={onAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </CardContent>
  );
};

export default TasksEmptyState;
