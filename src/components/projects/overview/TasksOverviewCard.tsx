
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Plus, Loader2 } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";

interface TasksOverviewCardProps {
  projectId: number;
  progress?: number; // Keeping for backward compatibility
}

const TasksOverviewCard: React.FC<TasksOverviewCardProps> = ({ projectId, progress = 0 }) => {
  const navigate = useNavigate();
  const { tasks, isLoading, error } = useTasks(projectId);
  const [taskStats, setTaskStats] = useState({ completed: 0, inProgress: 0 });
  
  useEffect(() => {
    if (tasks) {
      const completed = tasks.filter(task => task.status === "completed").length;
      const inProgress = tasks.filter(task => task.status === "in_progress").length;
      
      setTaskStats({
        completed,
        inProgress
      });
    }
  }, [tasks]);
  
  const handleAddTask = () => {
    navigate(`/tasks/new?projectId=${projectId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tasks Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tasks Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive text-center">Failed to load tasks</p>
        </CardContent>
      </Card>
    );
  }

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
              {taskStats.completed}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">In Progress</span>
            <Badge variant="outline" className="flex gap-1 items-center">
              <Clock className="h-3 w-3" />
              {taskStats.inProgress}
            </Badge>
          </div>
          <Separator />
          <Button variant="outline" className="w-full" onClick={handleAddTask}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksOverviewCard;
