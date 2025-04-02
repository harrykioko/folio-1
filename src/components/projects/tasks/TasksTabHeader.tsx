
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface TasksTabHeaderProps {
  projectId: number;
}

const TasksTabHeader: React.FC<TasksTabHeaderProps> = ({ projectId }) => {
  const navigate = useNavigate();
  
  const handleAddTask = () => {
    navigate(`/tasks/new?projectId=${projectId}`);
  };

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </CardHeader>
  );
};

export default TasksTabHeader;
